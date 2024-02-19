import { useState, useEffect, useRef } from "react";
import { useForm, useWatch, type FieldValues, type Field } from "react-hook-form";
import styles from "./ContactForm.module.css";
import type { ContactRes, CommonRes } from "@i18n/locales/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { interpolate } from "@i18n/i18n";

interface ContactFormProps {
    resources: ContactRes;
    commonResources: CommonRes;
}

const ACCESS_KEY = "7d81d4b3-a54e-4341-9544-2553a5aa4daf";
const HCAPTCHA_KEY = import.meta.env.DEV ? "10000000-ffff-ffff-ffff-000000000001" : "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
const API_URL = "https://api.web3forms.com/submit";

export default function ContactForm({ resources, commonResources }: ContactFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm({
        mode: "onTouched",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [Message, setMessage] = useState("");
    const [animate] = useAutoAnimate();
    const captchaRef = useRef<HCaptcha>(null);

    const userName = useWatch({
        control,
        name: "full_name",
        defaultValue: "Someone",
    });

    useEffect(() => {
        setValue("subject", `${userName} sent a message from Website`);
    }, []);

    const onSubmit = async (formData: FieldValues, e: any) => {
        const token = await captchaRef.current
            ?.execute({ async: true })
            .then((res) => res.response)
            .catch((e) => {
                setMessage(interpolate(resources.submit_error_formatted, { message: `captcha: ${e}` }));
                return undefined;
            });

        if (token === undefined) {
            return;
        }

        const data = { ...formData, "h-captcha-response": token };

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data, null, 2),
        })
            .then(async (response) => {
                let json = await response.json();
                if (json.success) {
                    setIsSuccess(true);
                    setMessage(resources.submit_success);
                    resetForm();
                } else {
                    setIsSuccess(false);
                    setMessage(interpolate(resources.submit_error_formatted, { message: json.message }));
                }
            })
            .catch((error) => {
                setIsSuccess(false);
                setMessage(resources.submit_error);
                console.log(error);
            });
    };

    const resetForm = (preserveValues: boolean = false) => {
        // reset other form state but keep defaultValues and form values
        reset(undefined, { keepDirtyValues: preserveValues });
        captchaRef.current?.resetCaptcha();
    };

    return (
        <>
            <div className={styles["contact-form-wrapper"]} ref={animate}>
                {!isSubmitSuccessful && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" value={ACCESS_KEY} {...register("access_key")} />
                        <input type="hidden" {...register("subject")} />
                        <input type="hidden" value="Website submission" {...register("from_name")} />
                        <input type="checkbox" style={{ display: "none" }} {...register("botcheck")}></input>
                        <HCaptcha sitekey={HCAPTCHA_KEY} size="invisible" ref={captchaRef} />

                        <div ref={animate}>
                            <label htmlFor="full_name">{resources.full_name_title}</label>
                            <input
                                id="full_name"
                                type="text"
                                placeholder={resources.full_name_placeholder}
                                autoComplete="false"
                                className={errors.name && styles["input-error"]}
                                {...register("name", {
                                    required: resources.error_empty_field,
                                    maxLength: 80,
                                })}
                            />

                            {errors.name && (
                                <div className={styles.error}>
                                    <small>{String(errors.name.message)}</small>
                                </div>
                            )}
                        </div>

                        <div ref={animate}>
                            <label htmlFor="email_address">{resources.email_title}</label>
                            <input
                                id="email_address"
                                type="email"
                                placeholder={resources.email_placeholder}
                                autoComplete="false"
                                className={errors.email && styles["input-error"]}
                                {...register("email", {
                                    required: resources.error_empty_field,
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: resources.error_format_email,
                                    },
                                })}
                            />
                            {errors.email && (
                                <div className={styles.error}>
                                    <small>{String(errors.email.message)}</small>
                                </div>
                            )}
                        </div>

                        <div ref={animate} className={styles["textarea-container"]}>
                            <label htmlFor="message">{resources.msg_title}</label>
                            <textarea
                                rows={8}
                                id="message"
                                placeholder={resources.msg_placeholder}
                                className={errors.message && styles["input-error"]}
                                {...register("message", { required: resources.error_empty_field })}
                            />
                            {errors.message && (
                                <div className={styles.error}>
                                    <small>{String(errors.message.message)}</small>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="button">
                            {isSubmitting ? <div className="dot-flashing"></div> : commonResources.submit_btn}
                        </button>
                    </form>
                )}
                {isSubmitSuccessful && isSuccess && (
                    <>
                        <div className={styles["submit-status"]}>
                            <i className={styles.success}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                            </i>
                            <h3>{resources.success}</h3>
                            <p>{Message}</p>
                            <button className="button" onClick={() => resetForm()}>
                                {resources.go_back}
                            </button>
                        </div>
                    </>
                )}

                {isSubmitSuccessful && !isSuccess && (
                    <>
                        <div className={styles["submit-status"]}>
                            <i className={styles.error}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </i>
                            <h3>{resources.error}</h3>
                            <p>{Message}</p>
                            <p>{resources.submit_error_try_again}</p>
                            <button className="button" onClick={() => resetForm(true)}>
                                {resources.try_again}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
