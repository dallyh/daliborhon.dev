//
// Handler for dropdown menus
//

import { createPopper } from "@popperjs/core/lib/popper-lite";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import offsetModifier from "@popperjs/core/lib/modifiers/offset";
import type { Placement } from "@popperjs/core";
import type { Rect } from "@popperjs/core/lib/popper-lite";

class DropdownHandler {
    init() {
        this.handleDropdowns();
        console.debug("Dropdown handler initialized.");
    }

    private handleDropdowns(): void {
        const DROPDOWN_BUTTONS = document.querySelectorAll("[data-dropdown-target]");

        DROPDOWN_BUTTONS.forEach((e) => {
            var button = e as HTMLButtonElement;
            var target = e.getAttribute("data-dropdown-target") as string;
            var dropdown = document.querySelector(target) as HTMLElement;
            var placement = button.dataset.dropdownPlacement === undefined ? "bottom" : button.dataset.dropdownPlacement;

            if (!dropdown) {
                console.log("Dropdown for target: " + target + " was not found.");
                return;
            }
            console.log("Found dropdown target" + target);

            var popperInstance = createPopper(button, dropdown, {
                placement: placement as Placement,
                strategy: "fixed",
                modifiers: [
                    offsetModifier,
                    preventOverflow,
                    {
                        name: "offset",
                        options: {
                            offset: ({ reference, popper }: { reference: Rect; popper: Rect }) => {
                                return [(popper.width - reference.width) / 2 - 2, 2];
                            },
                        },
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            padding: 5,
                            boundary: document.body,
                            rootBoundary: "document",
                        },
                    },
                ],
            });

            e.addEventListener("click", () => {
                dropdown.classList.toggle("active");
                popperInstance.update();
            });

            // Closes active dropdowns on button click, which is not this button
            // and also closes active dropdowns on click outside or on it's children
            document.addEventListener("click", function (click) {
                if (click.target instanceof HTMLElement) {
                    if (click.target == button) return;
                    if (dropdown.classList.contains("active")) dropdown.classList.remove("active");
                }
            });
        });
    }
}

export default new DropdownHandler();
