import Giscus from "@giscus/react";
import type { AllowedLocales } from "@i18n-config";
import { useEffect, useState } from "react";

type Props = {
	lang: AllowedLocales;
};

const id = "giscusComments";

export default function Comments({ lang }: Props) {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const theme = document.documentElement.dataset.theme ?? "light";
		setTheme(theme);

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
					lang={lang}
					loading="lazy"
				/>
			) : null}
		</div>
	);
}
