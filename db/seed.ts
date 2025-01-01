import { db, PageView } from "astro:db";

export default async function () {
	const urls = [
		"/",
		"/cs/blog",
		"/cs/projects",
		"/cs/about",
		"/cs/resume",
		"/en/blog",
		"/en/projects",
		"/en/about",
		"/en/resume",
		"/cs/blog/posts/",
		"/en/blog/posts/",
		"/cs/blog/tags/",
		"/en/blog/posts/",
		"/cs/blog/posts/2024-01-01-priklad-typografie/",
		"/en/blog/posts/2024-01-01-typography-example/",
	];

	const endDate = new Date();
	const startDate = new Date();
	startDate.setMonth(endDate.getMonth() - 5);

	const entries = [];

	for (let i = 0; i < 100; i++) {
		const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
		const randomUrl = urls[Math.floor(Math.random() * urls.length)];
		entries.push({ date: randomDate, url: randomUrl });
	}

	await db.insert(PageView).values(entries);
	await db.insert(PageView).values([{ date: new Date(new Date().getTime() - 1000), url: "test/this-is-a-really-long-url/with-more-text/and-lorem-ipsum" }]);
}
