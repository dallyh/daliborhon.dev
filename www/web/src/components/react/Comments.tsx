import type { Locale } from "@paraglide/runtime";
import Giscus from "@giscus/react";
import { useEffect, useRef, useState } from "react";

type Props = {
	locale: Locale;
};

const id = "giscuss-container";

export default function Comments({ locale }: Props) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState("light");
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const theme = document.documentElement.dataset.theme ?? "light";
		setTheme(theme);
	}, []);

	useEffect(() => {
		window.addEventListener("theme-changed", () => {
			setTheme(document.documentElement.dataset.theme ?? "light");
		});
		setMounted(true);
		buttonRef.current!.disabled = false;
	}, []);

	return (
		<div className="relative">
			<button id="show-comments" className="btn btn-primary absolute bottom-0 left-[50%] z-[5] translate-y-[-50%] cursor-pointer active:!translate-y-[-50%]" disabled ref={buttonRef}>
				Show comments
			</button>
			<div id="comments-wrapper" className="fade bg-base-100 pointer-events-none h-[180px] p-4 text-white">
				<div id="giscuss-container" data-locale={locale}>
					{mounted ? (
						<Giscus
							repo="dallyh/daliborhon.dev"
							repoId="R_kgDOH42J2g"
							category="Comments"
							categoryId="DIC_kwDOH42J2s4Cl4Zg"
							mapping="pathname"
							strict="0"
							reactions-enabled="1"
							emit-metadata="0"
							input-position="top"
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
