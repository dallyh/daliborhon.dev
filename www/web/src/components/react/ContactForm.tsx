import { HCAPTCHA_KEY } from "astro:env/client";
import type { AllowedLocales } from "@daliborhon.dev/integrations/i18n";
import * as m from "@daliborhon.dev/integrations/i18n/messages";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
import { type FieldValues, useForm, useWatch } from "react-hook-form";

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

	const onSubmit = async (formData: FieldValues) => {
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
			<div ref={animate}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="hidden" value={locale} {...register("language")} />
					<input type="hidden" {...register("subject")} />
					<input type="hidden" value="Website submission" {...register("from_name")} />
					<input type="checkbox" className="hidden" {...register("botcheck")} />
					{/*@ts-ignore types are broken*/}
					<HCaptcha sitekey={HCAPTCHA_KEY} size="invisible" ref={captchaRef} />

					<fieldset className="fieldset" ref={animate}>
						{/* FULL NAME FIELD */}
						<label htmlFor="full_name" className="fieldset-label">
							{m.contact__full_name_title()}
						</label>
						<label className={`input w-full ${isLoading ? "skeleton" : ""} ${errors?.name ? "input-error" : ""}`}>
							<span>
								<i className="fas fa-user"></i>
							</span>
							<input
								id="full_name"
								type="text"
								placeholder={m.contact__full_name_placeholder()}
								autoComplete="false"
								required
								{...register("name", {
									required: m.contact__error_empty_field(),
									maxLength: 80,
								})}
							/>
						</label>
						{errors.name && <p className="validator-hint text-error">{String(errors.name.message)}</p>}

						{/* EMAIL FIELD */}
						<label htmlFor="email_address" className="fieldset-label">
							{m.contact__email_title()}
						</label>
						<label className={`input w-full ${isLoading ? "skeleton" : ""} ${errors?.email ? "input-error" : ""}`}>
							<span>
								<i className="fas fa-envelope"></i>
							</span>
							<input
								id="email_address"
								type="email"
								placeholder={m.contact__email_placeholder()}
								autoComplete="false"
								className={`max-w-none`}
								required
								{...register("email", {
									required: m.contact__error_empty_field(),
									pattern: {
										value: /^\S+@\S+$/i,
										message: m.contact__error_format_email(),
									},
								})}
							/>
						</label>
						{errors.email && <p className="validator-hint text-error">{String(errors.email.message)}</p>}

						{/* MESSAGE FIELD */}
						<label htmlFor="message" className="fieldset-label">
							{m.contact__msg_title()}
						</label>
						<div className={`${isLoading ? "skeleton" : ""}`}>
							<textarea
								id="message"
								rows={8}
								placeholder={m.contact__msg_placeholder()}
								className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
								required
								{...register("message", {
									required: m.contact__error_empty_field(),
								})}
							/>
						</div>
						{errors.message && <p className="validator-hint text-error">{String(errors.message.message)}</p>}
					</fieldset>

					{/* SUBMIT BUTTON */}
					<div className={`mt-4 flex justify-end`}>
						<button disabled={isSubmitting} type="submit" className={`btn btn-primary btn-outline self-end ${isLoading ? "skeleton" : ""}`}>
							{isSubmitting && <span className="loading loading-spinner"></span>}
							{!isSubmitting && m.common__submit_btn()}
						</button>
					</div>
				</form>

				{/* SUCCESSFUL SUBMISSION */}
				{isSubmitSuccessful && isSuccess && (
					<div className="bg-base-100 absolute left-[-5px] top-[-5px] flex h-[calc(100%+5px+10px)] w-[calc(100%+5px+10px)] flex-col items-center justify-center gap-2">
						<div className="text-success mb-3 flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="mr-2 h-6 w-6">
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
							</svg>
							<p className="font-bold">{m.contact__success()}</p>
						</div>
						<p className="mb-4 text-sm">{message}</p>
						<button className="btn btn-primary btn-outline" onClick={() => resetForm()}>
							{m.contact__go_back()}
						</button>
					</div>
				)}

				{/* FAILED SUBMISSION */}
				{isSubmitSuccessful && !isSuccess && (
					<div className="bg-base-100 absolute left-[-5px] top-[-5px] flex h-[calc(100%+5px+10px)] w-[calc(100%+5px+10px)] flex-col items-center justify-center gap-2">
						<div className="text-error flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="mr-2 h-6 w-6">
								<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
							</svg>
							<p className="font-bold">{m.contact__error()}</p>
						</div>
						<p className="mb-2 text-sm">{message}</p>
						<p className="mb-4 text-sm">{m.contact__submit_error_try_again()}</p>

						<button className="btn btn-primary btn-outline" onClick={() => resetForm(true)}>
							{m.contact__try_again()}
						</button>
					</div>
				)}
			</div>
		</>
	);
}
