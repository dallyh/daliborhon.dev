//
// Handler for dropdown menus
//

import { computePosition, offset, shift, type Placement } from "@floating-ui/dom";

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
            var placement = (button.dataset.dropdownPlacement === undefined ? "bottom" : button.dataset.dropdownPlacement) as Placement;

            if (!dropdown) {
                console.log("Dropdown for target: " + target + " was not found.");
                return;
            }
            console.log("Found dropdown target" + target);

            const showDropdown = () => {
                computePosition(button, dropdown, {
                    placement: placement,
                    middleware: [
                        offset(15),
                        shift({
                            padding: 5,
                            rootBoundary: "viewport",
                            boundary: document.body,
                        }),
                    ],
                    strategy: "fixed",
                }).then(({ x, y }) => {
                    Object.assign(dropdown.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                });
            };

            e.addEventListener("click", () => {
                dropdown.classList.toggle("active");
                showDropdown();
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
