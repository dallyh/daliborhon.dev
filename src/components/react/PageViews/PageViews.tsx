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
		<Fragment>
			<p className="mb-2">
				{m.analytics__total_views()}:{" "}
				<b>
					{isLoading && <span className="skeleton">0</span>}
					{!isLoading && <span>{data.totalViews}</span>}
				</b>
			</p>

			<div className="mb-2 join ">
				<button
					className={`join-item btn btn-outline btn-primary ${isLoading ? "skeleton" : mode === "page-views" ? "btn-active" : ""}`}
					onClick={() => {
						setMode("page-views");
						setSearch("");
					}}
				>
					{m.common__page_views()}
				</button>
				<button className={`join-item btn btn-outline btn-primary ${isLoading ? "skeleton" : mode === "per-url" ? "btn-active" : ""}`} onClick={() => setMode("per-url")}>
					{m.common__per_url()}
				</button>
			</div>

			<form
				className="flex flex-row flex-wrap gap-4 items-end mt-2 mb-2"
				id="date-range-form"
				onSubmit={(e) => {
					e.preventDefault();
					setSearch(searchLocalState);
				}}
			>
				<div className={`form-control max-w-max ${isLoading ? "skeleton" : ""}`}>
					<label className="label">{m.analytics__period()}</label>
					<select name="date-range" id="date-range" value={dateRange} onChange={(e) => setDateRange(e.currentTarget.value as DateRange)} className="select select-bordered">
						<option value="all-time">{m.common__all_time()}</option>
						<option value="past-day">{m.common__past_day()}</option>
						<option value="past-week">{m.common__past_week()}</option>
						<option value="past-month">{m.common__past_month()}</option>
						<option value="past-year">{m.common__past_year()}</option>
					</select>
				</div>
				{mode === "per-url" && (
					<div className="join max-w-max">
						<input
							type="search"
							id="search"
							name="search"
							className={`input input-bordered join-item w-full ${isLoading ? "skeleton" : ""}`}
							placeholder={m.analytics__search_url()}
							value={searchLocalState}
							onChange={(e) => setSearchLocalState(e.currentTarget.value)}
						/>
						<button className={`btn btn-primary btn-outline join-item ${isLoading ? "skeleton" : ""}`} type="submit">
							{m.common__submit_btn()}
						</button>
					</div>
				)}
			</form>

			{isLoading && (
				// DaisyUI has a skeleton class, but you might also do your own styling
				<div className="skeleton h-96"></div>
			)}

			{!isLoading && data?.viewsPerUrl && <UrlChart data={data.viewsPerUrl} />}
			{!isLoading && data?.pageViews && <ViewChart data={data.pageViews.rows} locale={locale} />}

			{data?.totalPages !== null && data?.totalPages > 0 && (
				<div className="flex flex-wrap items-center join mt-4">
					{offset === 0 ? (
						<>
							<button className="join-item btn btn-sm btn-outline btn-primary" disabled title={m.common__last()} aria-label={m.common__last()}>
								<i className="fa-solid fa-backward"></i>
							</button>
							<button className="join-item btn btn-sm btn-outline btn-primary" disabled title={m.common__prev_page()} aria-label={m.common__prev_page()}>
								<i className="fa-solid fa-arrow-left" />
							</button>
						</>
					) : (
						<>
							<button className="join-item btn btn-sm btn-outline btn-primary" onClick={() => setPage(1)} title={m.common__last()} aria-label={m.common__last()}>
								<i className="fa-solid fa-backward"></i>
							</button>
							<button className="join-item btn btn-sm btn-outline btn-primary" onClick={() => setPage(page - 1)} title={m.common__prev_page()} aria-label={m.common__prev_page()}>
								<i className="fa-solid fa-arrow-left" />
							</button>
						</>
					)}

					<p className="join-item btn no-animation btn-sm btn-outline btn-primary btn-disabled">{page}</p>

					{page === data.totalPages ? (
						<>
							<button className="join-item btn btn-sm btn-outline btn-primary" disabled title={m.common__next_page()} aria-label={m.common__next_page()}>
								<i className="fa-solid fa-arrow-right" />
							</button>
							<button className="join-item btn btn-sm btn-outline btn-primary" disabled title={m.common__last()} aria-label={m.common__last()}>
								<i className="fa-solid fa-forward"></i>
							</button>
						</>
					) : (
						<>
							<button className="join-item btn btn-sm btn-outline btn-primary" onClick={() => setPage(page + 1)} title={m.common__next_page()} aria-label={m.common__next_page()}>
								<i className="fa-solid fa-arrow-right" />
							</button>
							<button className="join-item btn btn-sm btn-outline btn-primary" onClick={() => setPage(data.totalPages)} title={m.common__last()} aria-label={m.common__last()}>
								<i className="fa-solid fa-forward"></i>
							</button>
						</>
					)}
				</div>
			)}
		</Fragment>
	);
}
