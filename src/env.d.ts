import { toast } from "bulma-toast";

declare module "@pagefind/default-ui";

declare global {
	interface Window {
		toast: typeof toast;
	}

	namespace App {
		interface Locals {
			isPrint: boolean | undefined;
		}
	}
	
	type DateRange = "all-time" | "past-day" | "past-week" | "past-month" | "past-year";
}
