import React, { type ReactElement, type ReactNode } from "react";
import { TagIcon } from "@sanity/icons";
import { renderToString } from "react-dom/server";

interface Props {
	color: any;
}
export default ({ color }: Props) => {
	const style = {
		color: color ? color.hex : "",
	};
	return (
		<>
			<TagIcon style={style} />
		</>
	);
};
