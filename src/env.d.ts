import { toast } from "bulma-toast";

declare module "@pagefind/default-ui";

declare global {
	interface ToastOptions {
		message: string;
		type?: "info" | "success" | "warning" | "error";
		duration?: number; // in ms; 0 or negative to keep open
		dismissible?: boolean; // show close button or not
	}

	interface Window {
		showToast: (options: ToastOptions) => void;
	  }

	namespace App {
		interface Locals {
			isPrint: boolean | undefined;
		}
	}
	
	type DateRange = "all-time" | "past-day" | "past-week" | "past-month" | "past-year";
}
