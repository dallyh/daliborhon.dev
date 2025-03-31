import { contactFormAction } from "./contact";
import { pageViewAction } from "./page-view";

export const server = {
	pageView: pageViewAction,
	contactForm: contactFormAction,
};
