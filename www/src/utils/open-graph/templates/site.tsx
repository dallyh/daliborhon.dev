import { m } from "@paraglide/messages";

export default () => {
	// Template adapted from: https://github.com/pelleknaap
	return (
		<div
			style={{
				background: "#000000",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					bottom: "10px",
					right: "15px",
					border: "2px solid #1bff67",
					opacity: "0.6",
					borderRadius: "4px",
					display: "flex",
					justifyContent: "center",
					margin: "2.5rem",
					width: "88%",
					height: "80%",
					backgroundImage: "linear-gradient(45deg, #191e24 33.33%, #1bff67 33.33%, #1bff67 50%, #191e24 50%, #191e24 83.33%, #1bff67 83.33%, #1bff67 100%)",
					backgroundSize: "12.73px 12.73px",
				}}
			/>
			<div
				style={{
					border: "2px solid #1bff67",
					background: "#292929",
					borderRadius: "4px",
					display: "flex",
					justifyContent: "center",
					margin: "2rem",
					width: "88%",
					height: "80%",
					boxShadow: "1px 1px 8px 1px #000000",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						margin: "20px",
						width: "90%",
						height: "90%",
					}}
				>
					<p
						style={{
							fontSize: 72,
							fontWeight: "bold",
							maxHeight: "84%",
							overflow: "hidden",
						}}
					>
						Dalibor Hon
					</p>
					<div style={{ display: "flex", width: 24, height: 24, position: "absolute", right: 8 }}>
						<svg viewBox="0 0 725.431 723.51" width={64} xmlns="http://www.w3.org/2000/svg">
							<g fill="#1bff67">
								<path d="M119.487 205.14c-3.513-1.102-5.652.188-7.738 3.274-20.528 30.375-33.253 63.89-40.224 99.686-7.787 39.983-6.282 79.835 2.35 119.525.805 3.701 1.418 7.445 2.167 11.416h-46.83c-8.317-33.34-10.052-67.069-8.044-101.121 1.852-31.412 8.771-61.789 19.863-91.076 25.582-67.546 68.13-122.124 127.452-163.432 44.711-31.134 93.886-50.982 148.073-58.194 80.591-10.727 155.187 6.568 223.327 49.889 69.467 44.165 117.48 105.856 143.64 184.217 14.124 42.308 18.978 85.671 15.29 130.06-4.11 49.489-17.871 96.082-43.002 138.963-46.386 79.15-113.981 131.901-201.81 157.694-80.905 23.76-160.017 17.022-236.375-18.945-49.429-23.282-91.786-55.814-125.572-98.937-9.631-12.293-17.992-25.584-26.887-38.45-1.092-1.58-1.887-3.365-3.062-5.493 4.031 0 7.457-.002 10.883 0 47.164.03 94.328.116 141.492.06 19.528-.022 37.142-5.654 51.512-19.337 16.212-15.437 24.485-34.535 24.531-56.929.114-55.997.184-111.994-.007-167.99-.14-40.68-32.073-73.746-72.682-74.718-32.143-.77-64.314-.409-97.134-.47-.845.156-1.029.232-1.213.308m442.715 368.126c1.49-1.607 2.982-3.214 5.108-5.019 28.361-29.176 50.8-62.26 65.717-100.228 23.27-59.229 28.032-119.788 10.809-181.265-19.96-71.24-62.006-127.188-122.207-169.39-41.596-29.16-88.297-45.485-138.946-49.66-34.866-2.873-69.133 1.327-102.556 11.703-48.05 14.916-90.346 39.522-125.853 75.412-1.54 1.557-2.98 3.214-5.056 5.461 2.24 0 3.232-.011 4.223.002 25.646.33 51.459-1.084 76.905 1.34 64.78 6.17 106.357 61.594 107.921 113.919 1.712 57.273.804 114.633.491 171.952-.057 10.354-1.591 21.028-4.44 30.983-11.88 41.513-37.881 70.328-79.118 84.517-17.601 6.057-35.955 6.184-54.307 6.067-15.427-.097-30.856-.02-47.067-.02 1.312 1.464 2.061 2.48 2.983 3.302 21.08 18.81 43.757 35.336 68.913 48.35 38.22 19.77 78.612 31.809 121.735 33.573 49.532 2.026 96.552-8.276 141.06-30.045 26.935-13.174 51.21-30.208 73.685-50.954z" />
								<path d="m372.583 564.25-.001-142.792h49.523V568.33c-1.739.134-3.496.385-5.253.387-13.317.014-26.635-.085-39.952.01-2.97.021-4.956-.402-4.317-4.477zm139.203-398.944.784-4.662h48.682v145.585h-49.307c0-8.35 0-16.622-.024-25.799-.093-4.964-.16-9.024-.229-13.084.099-16.335.197-32.67.262-49.905a3711.27 3711.27 0 0 1-.273-11.09c.092-8.672.183-17.343.25-26.92-.064-5.313-.104-9.719-.145-14.125z" />
								<path d="m190.607 483.389-.468 4.723h-49.272V240.779c8.227 0 16.5-.01 24.774.002 7.159.011 14.317.059 21.476.062 1.91.001 3.84-.124 3.351 3.618-.01 59.594-.053 118.325-.048 177.056.002 20.624.121 41.248.187 61.872zm371.117 81.59c.322 4.805-2.938 3.581-5.744 3.864-1.197.034-1.96-.014-3.53-.064-13.744-.002-26.681-.002-40.132-.002V387.215H499.47c-.981-.112-1.963-.323-2.945-.322-37.349.037-74.697.094-112.882.16a659.153 659.153 0 0 1-11.125-.649c.01-53.83.017-107.659.03-161.488.004-19.5.02-39 .03-58.499v-5.753h49.686V341.86c3.608 0 6.704.003 9.8 0 60.498-.062 120.996-.134 181.494-.147 2.34 0 4.681.569 7.053 1.738.03 14.981.03 29.097.03 43.535H561.69v5.195c.001 30.117-.009 60.234.007 90.352.013 25.619.055 51.238.084 76.857-.05 1.723-.1 3.445-.056 5.59z" />
							</g>
						</svg>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							marginBottom: "8px",
							fontSize: 28,
						}}
					>
						<span style={{ overflow: "hidden", marginLeft: 4 }}>https://daliborhon.dev</span>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							marginTop: "auto",
							marginBottom: "8px",
							fontSize: 28,
						}}
					>
						<span style={{ overflow: "hidden" }}>{m.common__site_description()}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
