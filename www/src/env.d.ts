declare global {
	namespace App {
		interface Locals {
			isPrint: boolean;
		}
	}

	interface Window {
		themeStorageKey: string;
	}
	type DateRange = "all-time" | "past-day" | "past-week" | "past-month" | "past-year";
}

export {};
