import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TransactionContext } from "../../context/TransactionContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Lander() {
	const { account } = useSelector((state: RootState) => state.user);
	const { connectWallet, disconnectWallet } = useContext(TransactionContext);

	useEffect(() => {
		document.title = "Web3 App";
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800">
			<div className="w-full flex flex-col items-center max-w-4xl mx-10 p-10 shadow-2xl rounded-xl bg-neutral-700">
				<h2 className="text-4xl text-white mb-12 ">Welcome to my Web3 App</h2>
				<AnimatePresence>
					{account ? (
						<motion.div
							className="flex flex-col items-center justify-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<p className="text-2xl text-white">Connected Account: {account}</p>
							<button className="px-5 py-3 mt-5 w-fit bg-blue-500 rounded-md text-white" onClick={disconnectWallet}>
								Disconnect Wallet
							</button>
						</motion.div>
					) : (
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="px-5 py-3 w-fit bg-blue-500 rounded-md text-white"
							onClick={connectWallet}
						>
							Connect Wallet
						</motion.button>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
