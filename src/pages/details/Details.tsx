import React, { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export default function Details() {
	const { account } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		document.title = "Web3 App - Details";
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800">
			<div className="w-full flex items-center justify-center max-w-4xl min-h-80 shadow-2xl rounded-xl">
				<div className="flex items-center justify-center">
					<p className="text-2xl text-white">Connected Account: {account}</p>
				</div>
			</div>
		</div>
	);
}
