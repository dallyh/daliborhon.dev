import type { Placement } from "tippy.js";
import tippy from "tippy.js";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/dist/tippy.css";

export const initializeTooltips = () => {
	console.info("Initializing tooltips.");
	// Get all data selectors
	const tooltips = document.querySelectorAll("[data-tooltip]");

	if (tooltips.length === 0) {
		console.info(`No tooltips found`);
		return;
	}
	console.log(`Found ${tooltips.length} of tooltips.`);

	const InitializeTooltip = (tooltip: Element) => {
		// Get content
		let content = tooltip.attributes.getNamedItem("data-tooltip-text")?.value;
		// Get placement
		let placement = tooltip.attributes.getNamedItem("data-tooltip")?.value as Placement;
		// Show tooltip on page load
		let showOnLoadDelay = Number(tooltip.attributes.getNamedItem("data-tooltip-pageload")?.value);

		//console.info(`Content ${content}, placement: ${placement}`);
		let tippyInstance = tippy(tooltip, {
			content: content,
			placement: placement,
			animation: "shift-away-subtle",
			maxWidth: "250px",
		});

		if (showOnLoadDelay > 0) {
			tippyInstance.show();
			setTimeout(() => {
				tippyInstance.hide();
			}, showOnLoadDelay);
		}
	};

	tooltips.forEach((e) => {
		//console.info(`Tooltip found.`);
		InitializeTooltip(e);
	});
};
