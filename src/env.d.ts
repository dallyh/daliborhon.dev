import { toast } from "bulma-toast";

declare module "@pagefind/default-ui";

declare global {
	interface Window {
		toast: typeof toast;
	}
}
