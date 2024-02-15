import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TransactionContext } from "../../context/TransactionContext";

export default function Lander() {
	const { account } = useSelector((state: RootState) => state.user);
	const { connectWallet } = useContext(TransactionContext);

	useEffect(() => {
		document.title = "Web3 App";
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800">
			<div className="w-full flex items-center justify-center max-w-4xl min-h-80 shadow-2xl rounded-xl">
				{account ? (
					<div className="flex items-center justify-center">
						<p className="text-2xl text-white">Connected Account: {account}</p>
					</div>
				) : (
					<button className="px-5 py-3 w-fit bg-blue-500 rounded-md text-white" onClick={connectWallet}>
						Connect Wallet
					</button>
				)}
			</div>
		</div>
	);
}
