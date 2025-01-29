declare module "@pagefind/default-ui";
declare module "@microflash/rehype-figure";

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
			isPrint: boolean;
		}
	}

	type DateRange = "all-time" | "past-day" | "past-week" | "past-month" | "past-year";
}

export {};
