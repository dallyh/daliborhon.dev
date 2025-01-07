import { QueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import UrlChart from "./UrlChart";
import ViewChart from "./ViewChart";
import * as m from "$messages";
import type { AllowedLocales } from "@i18n-config";

const type = ["page-views", "per-url"] as const;
type Mode = (typeof type)[number];
const isValidMode = (x: any): x is Mode => type.includes(x);

const queryClient = new QueryClient();

export default function PageViews({ locale }: { locale: AllowedLocales }) {
	const [mode, setModeState] = useState<Mode>("page-views");
	const [searchLocalState, setSearchLocalState] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [dateRange, setDateRange] = useState<DateRange>("all-time");
	const [isLoading, setIsLoading] = useState(true);

	const { data, isPending } = useQuery(
		{
			queryKey: ["pageViews", search, mode, page, dateRange],
			placeholderData: keepPreviousData,
			queryFn: async () => {
				const response = await fetch(`/api/page-views?mode=${mode}&search=${search}&page=${page}&date-range=${dateRange}`);
				const data = await response.json();
				return data;
			},
		},
		queryClient,
	);
	const pageSize = 10;
	const offset = (page - 1) * pageSize;

	const setMode = (mode: Mode) => {
		var searchParams = new URLSearchParams(window.location.search);
		searchParams.set("mode", mode);
		window.history.replaceState(null, "", "?" + searchParams.toString());
		setModeState(mode);
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const mode = searchParams.get("mode");
		if (mode && isValidMode(mode)) {
			setMode(mode as Mode);
		}
	}, []);

	// This is here to prevent client-side hydration errors, useQuery runs on the server.
	useEffect(() => {
		setIsLoading(isPending);
	}, [isPending]);

	return (
		<>
			<Fragment>
				<p className="mb-2">
					{m.analytics__total_views()}:{" "}
					<b>
						{isLoading && <span className="is-skeleton">0</span>}
						{!isLoading && <span>{data.totalViews}</span>}
					</b>
				</p>
				<div>
					<button
						className={`button mr-2 ${isLoading ? "is-skeleton" : mode === "page-views" ? "is-active" : ""}`}
						onClick={() => {
							setMode("page-views");
							setSearch("");
						}}
					>
						{m.common__page_views()}
					</button>
					<button className={`button ${isLoading ? "is-skeleton" : mode === "per-url" ? "is-active" : ""}`} onClick={() => setMode("per-url")}>
						{m.common__per_url()}
					</button>
				</div>
				<form
					id="date-range-form"
					onSubmit={(e) => {
						e.preventDefault();
						setSearch(searchLocalState);
					}}
				>
					{mode === "per-url" && (
						<div className="field has-addons mt-2">
							<div className="control">
								<input
									type="search"
									id="search"
									name="search"
									className={`input ${isLoading && "is-skeleton"}`}
									placeholder={m.analytics__search_url()}
									value={searchLocalState}
									onChange={(e) => setSearchLocalState(e.currentTarget.value)}
								/>
							</div>
							<div className="control">
								<button className={`button is-info ${isLoading && "is-skeleton"}`} type="submit">
									{m.common__submit_btn()}
								</button>
							</div>
						</div>
					)}

					<div className="field mb-2 mt-2">
						<label className="label">{m.analytics__period()}</label>
						<div className="control">
							<div className="select">
								<select name="date-range" id="date-range" value={dateRange} onChange={(e) => setDateRange(e.currentTarget.value as DateRange)}>
									<option value="all-time">{m.common__all_time()}</option>
									<option value="past-day">{m.common__past_day()}</option>
									<option value="past-week">{m.common__past_week()}</option>
									<option value="past-month">{m.common__past_month()}</option>
									<option value="past-year">{m.common__past_year()}</option>
								</select>
							</div>
						</div>
					</div>
				</form>

				{isLoading && <div className="skeleton-block" style={{ height: 400 }}></div>}

				{!isLoading && data?.viewsPerUrl && <UrlChart data={data.viewsPerUrl} />}
				{!isLoading && data?.pageViews && <ViewChart data={data.pageViews.rows} locale={locale} />}

				{data?.totalPages && data?.totalPages > 1 && (
					<div className="field is-grouped is-grouped-multiline mt-2 buttons are-small">
						{offset === 0 ? (
							<>
								<p className="control">
									<span className={`button is-static`}>{m.common__first()}</span>
								</p>
								<p className="control">
									<span className={`button is-static`}>{m.common__prev_page()}</span>
								</p>
							</>
						) : (
							<>
								<p className="control">
									<button className={`button`} onClick={() => setPage(1)}>
										First
									</button>
								</p>
								<p className="control">
									<button className={`button`} onClick={() => setPage(page - 1)}>
										{m.common__prev_page()}
									</button>
								</p>
							</>
						)}

						<p className="control has-text-centered">{page}</p>

						{page === data.totalPages ? (
							<>
								<p className="control">
									<span className={`button is-static`}>{m.common__next_page()}</span>
								</p>
								<p className="control">
									<span className={`button is-static`}>{m.common__last()}</span>
								</p>
							</>
						) : (
							<>
								<p className="control">
									<button className={`button`} onClick={() => setPage(page + 1)}>
										{m.common__next_page()}
									</button>
								</p>
								<p className="control">
									<a className={`button`} onClick={() => setPage(data.totalPages)}>
										{m.common__last()}
									</a>
								</p>
							</>
						)}
					</div>
				)}
			</Fragment>
		</>
	);
}
