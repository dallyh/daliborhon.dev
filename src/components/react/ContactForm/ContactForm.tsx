import { useState, useEffect, useRef, type FocusEvent } from "react";
import { useForm } from "@formspree/react";
import "./ContactForm.css";
import type { ContactForm as ContactFromRes } from "@i18n/locales/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface ContactFormProps {
    resources: ContactFromRes;
    showCloseButton?: boolean;
    isDialog?: boolean;
}

const ContactForm = (props: ContactFormProps) => {
    const [state, handleSubmit] = useForm("mayzkojd");
    const [errorState, setErrorMessage] = useState([{ type: "", message: "" }]);
    const isFirstRender = useRef(true);
    const [formRef] = useAutoAnimate();
    const [formWrapperRef] = useAutoAnimate();

    // Validate form submission errors
    const validateError = (errorCode: string, errorMessage: string) => {
        switch (errorCode) {
            case "TYPE_EMAIL":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "EMAIL",
                        message: props.resources.ERROR_TYPE_EMAIL,
                    },
                ]);
                break;
            case "TYPE_TEXT":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "TEXT",
                        message: props.resources.ERROR_TYPE_TEXT,
                    },
                ]);
                break;
            default:
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: errorCode ?? "UNDEFINED",
                        message: errorMessage,
                    },
                ]);
                break;
        }
    };

    // Handle submit and errors
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        var formErrors = state.errors?.getAllFieldErrors();

        if (formErrors === undefined) {
            console.debug("No errors returned from form.");
            setErrorMessage((prevState) => [
                ...prevState,
                {
                    type: "UNDEFINED",
                    message: props.resources.SubmitError,
                },
            ]);
            return;
        }

        formErrors.map((x) => {
            x[1].map((e) => {
                validateError(e.code, e.message);
            });
        });

        setErrorMessage((prevState) => [
            ...prevState,
            {
                type: "CORRECT_FIELDS",
                message: props.resources.ERROR_CORRECT_FIELDS,
            },
        ]);
    }, [state.errors]);

    const selectText = (event: FocusEvent<HTMLElement>) => {
        if (event.target instanceof HTMLTextAreaElement) {
            let elem = event.target as HTMLTextAreaElement;
            elem.select();
        }

        if (event.target instanceof HTMLInputElement) {
            let elem = event.target as HTMLInputElement;
            elem.select();
        }
    };

    return (
        <div ref={formWrapperRef}>
            {state.succeeded && (
                <div id="submit-success">
                    <p>{props.resources.SubmitSuccess}</p>
                </div>
            )}
            {!state.succeeded && (
                <form id="fs-frm" ref={formRef} name="simple-contact-form" onSubmit={handleSubmit}>
                    <fieldset id="fs-frm-inputs" disabled={state.submitting}>
                        <input type="hidden" name="_language" value="cs" />
                        <div className="contact-info-container">
                            <label htmlFor="full-name">{props.resources.FullName}</label>
                            <input type="text" autoComplete="name" name="name" id="full-name" placeholder={props.resources.NameAndSurname} required onFocus={selectText} />
                            <label htmlFor="email">{props.resources.EmailAddress}</label>
                            {errorState.some((key) => key.type === "EMAIL") && <p className="error">{errorState.find((item) => item.type === "EMAIL")?.message}</p>}
                            <input id="email" autoComplete="email" type="email" name="email" placeholder="@" required onFocus={selectText} />
                            <label htmlFor="email-subject">{props.resources.Subject}</label>
                            <input type="text" name="_subject" id="email-subject" placeholder={props.resources.Subject} required onFocus={selectText} />
                        </div>
                        <div className="message-container">
                            <label htmlFor="message">{props.resources.Message}</label>
                            <div className="textarea-container">
                                <textarea name="message" id="message" placeholder={props.resources.MessagePlaceholder} required onFocus={selectText} />
                            </div>
                            {errorState.some((key) => key.type === "TEXT") && <p className="error">{errorState.find((item) => item.type === "TEXT")?.message}</p>}
                        </div>
                        {errorState.some((key) => key.type === "CORRECT_FIELDS") && <p className="error">{errorState.find((item) => item.type === "CORRECT_FIELDS")?.message}</p>}
                        {errorState.some((key) => key.type === "UNDEFINED") && <p className="error">{errorState.find((item) => item.type === "UNDEFINED")?.message}</p>}
                    </fieldset>
                    <div className="buttons-container">
                        {props.showCloseButton && (
                            <button type="button" id="fs-frm-close-button" className="button" disabled={state.submitting}>
                                {props.resources.CloseButton}
                            </button>
                        )}
                        <button type="submit" id="fs-frm-submit-button" className="button" disabled={state.submitting}>
                            {!state.submitting && props.resources.Submit}
                            {state.submitting && <div className="dot-flashing"></div>}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
