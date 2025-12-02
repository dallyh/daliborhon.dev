declare global {
	namespace App {
		interface Locals {
			isPrint: boolean;
		}
	}

	interface Window {
		themeStorageKey: string;
		swup: import("swup").default;
	}
	type DateRange = "all-time" | "past-day" | "past-week" | "past-month" | "past-year";
}

export {};
