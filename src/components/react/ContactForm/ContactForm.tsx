import { useState, useEffect, useRef } from "react";
import { useForm, useWatch, type FieldValues, type Field } from "react-hook-form";
import styles from "./ContactForm.module.css";
import type { ContactRes, CommonRes } from "@i18n/locales/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface ContactFormProps {
    resources: ContactRes;
    commonResources: CommonRes;
}

const ACCESS_KEY = "7d81d4b3-a54e-4341-9544-2553a5aa4daf";
const HCAPTCHA_KEY = import.meta.env.DEV ? "10000000-ffff-ffff-ffff-000000000001" : "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
const API_URL = "https://api.web3forms.com/submit";

export default function ContactForm(props: ContactFormProps) {
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
                setMessage("Could not get captcha: " + e);
                return undefined;
            });

        if (token === undefined) {
            //setMessage("Could not get captcha token.");
            return;
        }

        const data = { ...formData, "h-captcha-response": token };
        console.log(data);

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
                    setMessage(json.message);
                    //e.target.reset();
                    resetForm();
                } else {
                    setIsSuccess(false);
                    setMessage(json.message);
                }
            })
            .catch((error) => {
                setIsSuccess(false);
                setMessage("Client Error. Please check the console.log for more info");
                console.log(error);
            });
    };

    const resetForm = (preserveValues: boolean = false) => {
        reset(undefined, { keepDirtyValues: preserveValues }); // reset other form state but keep defaultValues and form values
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
                            <label htmlFor="full_name">Full Name</label>
                            <input
                                id="full_name"
                                type="text"
                                placeholder="Full Name"
                                autoComplete="false"
                                className={errors.name && styles["input-error"]}
                                {...register("name", {
                                    required: "Full name is required",
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
                            <label htmlFor="email_address">Email Address</label>
                            <input
                                id="email_address"
                                type="email"
                                placeholder="Email Address"
                                autoComplete="false"
                                className={errors.email && styles["input-error"]}
                                {...register("email", {
                                    required: "Enter your email",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email",
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
                            <label htmlFor="message">Email Address</label>
                            <textarea rows={8} id="message" placeholder="Your Message" className={errors.message && styles["input-error"]} {...register("message", { required: "Enter your Message" })} />
                            {errors.message && (
                                <div className={styles.error}>
                                    {" "}
                                    <small>{String(errors.message.message)}</small>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="button">
                            {isSubmitting ? <div className="dot-flashing"></div> : "Send Message"}
                        </button>
                    </form>
                )}
                {isSubmitSuccessful && isSuccess && (
                    <>
                        <div>
                            <svg width="100" height="100" className="" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M26.6666 50L46.6666 66.6667L73.3333 33.3333M50 96.6667C43.8716 96.6667 37.8033 95.4596 32.1414 93.1144C26.4796 90.7692 21.3351 87.3317 17.0017 82.9983C12.6683 78.6649 9.23082 73.5204 6.8856 67.8586C4.54038 62.1967 3.33331 56.1283 3.33331 50C3.33331 43.8716 4.54038 37.8033 6.8856 32.1414C9.23082 26.4796 12.6683 21.3351 17.0017 17.0017C21.3351 12.6683 26.4796 9.23084 32.1414 6.88562C37.8033 4.5404 43.8716 3.33333 50 3.33333C62.3767 3.33333 74.2466 8.24998 82.9983 17.0017C91.75 25.7534 96.6666 37.6232 96.6666 50C96.6666 62.3768 91.75 74.2466 82.9983 82.9983C74.2466 91.75 62.3767 96.6667 50 96.6667Z"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                            </svg>
                            <h3>Success</h3>
                            <p>{Message}</p>
                            <button className="button" onClick={() => resetForm()}>
                                Go back
                            </button>
                        </div>
                    </>
                )}

                {isSubmitSuccessful && !isSuccess && (
                    <div>
                        <svg width="97" height="97" viewBox="0 0 97 97" className="" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.9995 69C43.6205 53.379 52.3786 44.621 67.9995 29M26.8077 29L67.9995 69M48.2189 95C42.0906 95 36.0222 93.7929 30.3604 91.4477C24.6985 89.1025 19.554 85.6651 15.2206 81.3316C10.8872 76.9982 7.44975 71.8538 5.10454 66.1919C2.75932 60.53 1.55225 54.4617 1.55225 48.3333C1.55225 42.205 2.75932 36.1366 5.10454 30.4748C7.44975 24.8129 10.8872 19.6684 15.2206 15.335C19.554 11.0016 24.6985 7.56418 30.3604 5.21896C36.0222 2.87374 42.0906 1.66667 48.2189 1.66667C60.5957 1.66667 72.4655 6.58333 81.2172 15.335C89.9689 24.0867 94.8856 35.9566 94.8856 48.3333C94.8856 60.7101 89.9689 72.58 81.2172 81.3316C72.4655 90.0833 60.5957 95 48.2189 95Z"
                                stroke="CurrentColor"
                                strokeWidth="3"
                            />
                        </svg>
                        <h3>Oops, Something went wrong!</h3>
                        <p>{Message}</p>
                        <button onClick={() => resetForm(true)}>Try Again</button>
                    </div>
                )}
            </div>
        </>
    );
}
