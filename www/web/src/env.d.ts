declare global {
	namespace App {
		interface Locals {
			isPrint: boolean;
		}
	}

	type DateRange = "all-time" | "past-day" | "past-week" | "past-month" | "past-year";
}

export {};
