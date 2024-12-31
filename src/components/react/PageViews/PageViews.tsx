import { QueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import UrlChart from "./UrlChart";
import ViewChart from "./ViewChart";

const queryClient = new QueryClient();

const PageViews = () => {
	const [mode, setMode] = useState("page-views");
	const [searchLocalState, setSearchLocalState] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [dateRange, setDateRange] = useState("all-time");
	const { data, isLoading } = useQuery(
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

	return isLoading ? (
		"Loading..."
	) : (
		<Fragment>
			<p className="mb-2">
				Total views on all pages: <b>{data.totalViews}</b>
			</p>
			<div className="flex mb-4">
				<button
					className={`button mr-2 ${mode === "page-views" ? "is-active" : ""}`}
					onClick={() => {
						setMode("page-views");
						setSearch("");
					}}
				>
					Page views
				</button>
				<button className={`button ${mode === "per-url" ? "is-active" : ""}`} onClick={() => setMode("per-url")}>
					Per URL
				</button>
			</div>
			<form
				id="date-range-form"
				onSubmit={(e) => {
					e.preventDefault();
					setSearch(searchLocalState);
				}}
			>
				{mode === "per-url" ? (
					<>
						<div className="field has-addons">
							<div className="control">
								<input
									type="search"
									id="search"
									name="search"
									className="input"
									placeholder="Search for a URL"
									value={searchLocalState}
									onChange={(e) => setSearchLocalState(e.currentTarget.value)}
								/>
							</div>
							<div className="control">
								<button className="button is-info" type="submit">
									Submit
								</button>
							</div>
						</div>
					</>
				) : null}
				<div className="field mb-2">
					<label className="label">Period</label>
					<div className="control">
						<div className="select">
							<select name="date-range" id="date-range" value={dateRange} onChange={(e) => setDateRange(e.currentTarget.value)}>
								<option value="all-time">All time</option>
								<option value="past-day">Past day</option>
								<option value="past-week">Past week</option>
								<option value="past-month">Past month</option>
								<option value="past-year">Past year</option>
							</select>
						</div>
					</div>
				</div>
			</form>
			{data.viewsPerUrl ? <UrlChart data={data.viewsPerUrl} /> : data.pageViews ? <ViewChart data={data.pageViews.rows} /> : null}
			{data.totalPages && data.totalPages > 1 ? (
				<div className="field is-grouped is-grouped-multiline mt-2 buttons are-small">
					{offset === 0 ? (
						<>
							<p className="control">
								<span className={`button is-static`}>First</span>
							</p>
							<p className="control">
								<span className={`button is-static`}>Previous</span>
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
									Previous
								</button>
							</p>
						</>
					)}
					<p className="control has-text-centered">{page}</p>
					{page === data.totalPages ? (
						<>
							<p className="control">
								<span className={`button is-static`}>Next</span>
							</p>
							<p className="control">
								<span className={`button is-static`}>Last</span>
							</p>
						</>
					) : (
						<>
							<p className="control">
								<button className={`button`} onClick={() => setPage(page + 1)}>
									Next
								</button>
							</p>
							<p className="control">
								<a className={`button`} onClick={() => setPage(data.totalPages)}>
									Last
								</a>
							</p>
						</>
					)}
				</div>
			) : null}
		</Fragment>
	);
};

export default PageViews;
