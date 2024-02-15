import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Transfer() {
	const { account, networkID } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		document.title = "Web3 App - Transfer";
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800">
			<div className="w-full flex items-center justify-center max-w-4xl min-h-80 shadow-2xl rounded-xl">
				<div className="flex ">
					<p className="text-2xl text-white">Connected Account: {account}</p>
				</div>
			</div>
		</div>
	);
}
