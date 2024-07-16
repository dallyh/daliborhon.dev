export function getBlogPostDate(locale: string, pubDate: string | Date, modDate: string | Date | undefined) {
	const myDatetime = wasPostUpdated(pubDate, modDate) ? new Date(modDate!) : new Date(pubDate);

	const date = myDatetime.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	/*
	const time = myDatetime.toLocaleTimeString(locale, {
		hour: "2-digit",
		minute: "2-digit",
	});
	*/

	return {
		iso: myDatetime.toISOString(),
		date: date,
		//time: time,
	};
}

export function wasPostUpdated(pubDate: string | Date, modDate: string | Date | undefined) {
	if (modDate && pubDate) {
		const updated = !(new Date(pubDate).getTime() === new Date(modDate).getTime());
		return updated;
	}

	return false;
}
