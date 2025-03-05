import Giscus from "@giscus/react";
import { m } from "@paraglide/messages";
import type { Locale } from "@paraglide/runtime";
import { useEffect, useRef, useState } from "react";
import styles from "./Comments.module.css";

type Props = {
	locale: Locale;
};

export default function Comments({ locale }: Props) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState("light");
	const [iframeLoaded, setIframeLoaded] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Set initial theme
		setTheme(document.documentElement.dataset.theme ?? "light");
	}, []);

	useEffect(() => {
		const handleThemeChanged = () => {
			setTheme(document.documentElement.dataset.theme ?? "light");
		};
		window.addEventListener("theme-changed", handleThemeChanged);
		setMounted(true);

		const wrapperObserver = new MutationObserver(() => {
			const widgetEl = wrapperRef.current?.querySelector("giscus-widget");
			const shadowRoot = widgetEl?.shadowRoot;
			if (shadowRoot) {
				wrapperObserver.disconnect();

				const iframe = shadowRoot.querySelector("iframe");
				if (iframe && !iframe.classList.contains("loading")) {
					setIframeLoaded(true);
				} else {
					// If not, observe the shadow root for changes.
					const shadowObserver = new MutationObserver(() => {
						const iframe = shadowRoot.querySelector("iframe");
						if (iframe && !iframe.classList.contains("loading")) {
							setIframeLoaded(true);
							shadowObserver.disconnect();
						}
					});
					shadowObserver.observe(shadowRoot, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["class"],
					});
				}
			}
		});

		wrapperObserver.observe(wrapperRef.current!, {
			childList: true,
			subtree: true,
			attributes: true,
		});

		return () => {
			wrapperObserver.disconnect();
			window.removeEventListener("theme-changed", handleThemeChanged);
		};
	}, []);

	function showCommentsCallback() {
		const wrapper = wrapperRef.current!;
		buttonRef.current!.style.display = "none";
		wrapper.classList.remove(styles.fade);
		wrapper.classList.remove("pointer-events-none");
		wrapper.style.height = "auto";
	}

	return (
		<div className="relative overflow-hidden">
			<button
				id="show-comments"
				className="btn btn-primary absolute bottom-0 left-[50%] z-[5] translate-x-[-50%] cursor-pointer active:!translate-y-[0]"
				disabled={!iframeLoaded}
				ref={buttonRef}
				onClick={showCommentsCallback}
			>
				{!iframeLoaded && <span className="loading loading-spinner loading-sm"></span>}
				{m.comments__show_comments()}
			</button>
			<div id="comments-wrapper" className={`${styles.fade} bg-base-100 pointer-events-none h-[160px] p-4 text-white`} ref={wrapperRef}>
				<div id="giscuss-container" data-locale={locale} ref={containerRef}>
					{mounted ? (
						<Giscus
							repo="dallyh/daliborhon.dev"
							repoId="R_kgDOH42J2g"
							category="Comments"
							categoryId="DIC_kwDOH42J2s4Cl4Zg"
							mapping="pathname"
							strict="0"
							reactionsEnabled="0"
							emitMetadata="0"
							inputPosition="bottom"
							theme={theme}
							lang={locale}
							loading="lazy"
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}
