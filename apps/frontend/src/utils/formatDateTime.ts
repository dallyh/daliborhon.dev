export function formatDateTime(date: Date, locale: string) {
	const formattedDate = date.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return {
		iso: date.toISOString(),
		date: formattedDate,
	};
}
