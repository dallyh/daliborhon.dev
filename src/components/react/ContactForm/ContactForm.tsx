import { HCAPTCHA_KEY } from "astro:env/client";
import * as m from "$messages";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import type { AllowedLocales } from "@i18n-config";
import { useEffect, useRef, useState } from "react";
import { type FieldValues, useForm, useWatch } from "react-hook-form";
import styles from "./ContactForm.module.css";

const API_URL = "/api/contact";

export default function ContactForm({ locale }: { locale: AllowedLocales }) {
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
	const [message, setMessage] = useState("");
	const [animate] = useAutoAnimate();
	const captchaRef = useRef<HCaptcha>(null);
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		setisLoading(false);
	});

	const userName = useWatch({
		control,
		name: "name",
		defaultValue: "Someone",
		exact: true,
	});

	useEffect(() => {
		setValue("subject", `${userName} sent a message from daliborhon.dev`);
	}, [userName]);

	const onSubmit = async (formData: FieldValues, e: any) => {
		const token = await captchaRef.current
			?.execute({ async: true })
			.then((res) => res.response)
			.catch((e) => {
				setMessage(m.contact__submit_error_formatted({ message: e }));
				return undefined;
			});

		if (token === undefined) {
			setIsSuccess(false);
			setMessage(m.contact__submit_error());
			return;
		}

		const postData = { ...formData, "h-captcha-response": token };
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(postData),
		});

		if (!res.ok) {
			setIsSuccess(false);
			setMessage(`${m.contact__submit_error()} (${res.status})`);
			return;
		}

		const json = await res.json();

		if ("success" in json) {
			setIsSuccess(true);
			setMessage(m.contact__submit_success());
			resetForm();
		}

		if ("error" in json) {
			setIsSuccess(false);
			setMessage(`[${json.error}]: ${json.message}`);
		}
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
						<input type="hidden" value={locale} {...register("language")} />
						<input type="hidden" {...register("subject")} />
						<input type="hidden" value="Website submission" {...register("from_name")} />
						<input type="checkbox" style={{ display: "none" }} {...register("botcheck")}></input>
						{/*@ts-ignore types are broken*/}
						<HCaptcha sitekey={HCAPTCHA_KEY} size="invisible" ref={captchaRef} />

						<div ref={animate}>
							<div className="field">
								<label className="label" htmlFor="full_name">
									{m.contact__full_name_title()}
								</label>
								<div className="control has-icons-left has-icons-right">
									<input
										className={`input ${errors.name && "is-danger"} ${isLoading && "is-skeleton"}`}
										id="full_name"
										type="text"
										placeholder={m.contact__full_name_placeholder()}
										autoComplete="false"
										{...register("name", {
											required: m.contact__error_empty_field(),
											maxLength: 80,
										})}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-user"></i>
									</span>
								</div>
								<div className="control"></div>
							</div>
							{errors.name && (
								<div className="help is-danger">
									<small>{String(errors.name.message)}</small>
								</div>
							)}
						</div>

						<div ref={animate}>
							<div className="field">
								<label className="label" htmlFor="email_address">
									{m.contact__email_title()}
								</label>
								<div className="control has-icons-left has-icons-right">
									<input
										id="email_address"
										type="email"
										placeholder={m.contact__email_placeholder()}
										autoComplete="false"
										className={`input ${errors.email && "is-danger"} ${isLoading && "is-skeleton"}`}
										{...register("email", {
											required: m.contact__error_empty_field(),
											pattern: {
												value: /^\S+@\S+$/i,
												message: m.contact__error_format_email(),
											},
										})}
									/>
									<span className="icon is-small is-left">
										<i className="fas fa-envelope"></i>
									</span>
								</div>
								<div className="control"></div>
							</div>

							{errors.email && (
								<div className="help is-danger">
									<small>{String(errors.email.message)}</small>
								</div>
							)}
						</div>

						<div ref={animate}>
							<div className="field">
								<label className="label" htmlFor="message">
									{m.contact__msg_title()}
								</label>
								<div className="control">
									<textarea
										className={`textarea ${errors.message && "is-danger"} ${isLoading && "is-skeleton"}`}
										rows={8}
										id="message"
										placeholder={m.contact__msg_placeholder()}
										{...register("message", { required: m.contact__error_empty_field() })}
									/>
								</div>
							</div>

							{errors.message && (
								<div className="help is-danger">
									<small>{String(errors.message.message)}</small>
								</div>
							)}
						</div>

						<div className="field is-grouped is-grouped-right mt-4">
							<div className="field-label"></div>
							<p className="control">
								<button type="submit" className={`button is-primary ${isSubmitting && "is-loading"} ${isLoading && "is-skeleton"}`}>
									{m.common__submit_btn()}
								</button>
							</p>
						</div>
					</form>
				)}
				{isSubmitSuccessful && isSuccess && (
					<>
						<div className={styles["submit-status"]}>
							<i className={["has-text-success", styles.success].join(" ")}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
									<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
								</svg>
							</i>
							<div>
								<p className="title is-4">{m.contact__success()}</p>
								<p className="subtitle">{message}</p>
							</div>

							<button className="button is-primary" onClick={() => resetForm()}>
								{m.contact__go_back()}
							</button>
						</div>
					</>
				)}

				{isSubmitSuccessful && !isSuccess && (
					<>
						<div className={styles["submit-status"]}>
							<i className={["has-text-danger", styles.error].join(" ")}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
								</svg>
							</i>
							<div>
								<p className="title is-4">{m.contact__error()}</p>
								<p className="subtitle">{message}</p>
							</div>

							<p>{m.contact__submit_error_try_again()}</p>
							<button className="button is-primary" onClick={() => resetForm(true)}>
								{m.contact__try_again()}
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}
