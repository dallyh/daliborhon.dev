import Giscus from "@giscus/react";
import type { Locale } from "@paraglide/runtime";
import { useEffect, useState } from "react";

type Props = {
	locale: Locale;
};

const id = "giscusComments";

export default function Comments({ locale }: Props) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const theme = document.documentElement.dataset.theme ?? "light";
		setTheme(theme);
	}, []);

	useEffect(() => {
		window.addEventListener("theme-changed", () => {
			setTheme(document.documentElement.dataset.theme ?? "light");
		});
		setMounted(true);
	}, []);

	return (
		<div id={id}>
			{mounted ? (
				<Giscus
					id={id}
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
			) : (
				<div className="flex min-h-[240px] justify-center">
					<span className="loading loading-dots loading-xl"></span>
				</div>
			)}
		</div>
	);
}
