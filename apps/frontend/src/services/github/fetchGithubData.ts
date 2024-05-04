const headers = {
	Authorization: `Bearer ${import.meta.env.GH_AUTH_TOKEN}`,
};

export async function fetchGithubData(url: string) {
	return fetch(url, { headers })
		.then((res) => res.json())
		.catch((err) => console.log(err));
}
