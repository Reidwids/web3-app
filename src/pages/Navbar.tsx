import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { TransactionContext } from "../context/TransactionContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
	const { account } = useSelector((state: RootState) => state.user);
	const { connectWallet } = useContext(TransactionContext);
	return (
		<div className="w-full bg-blue-950 text-white font-bold py-5 px-10 text-xl flex items-center justify-between font-jura">
			<Link to={"/"} className="flex flex-row space-x-3 items-center">
				<img src="/img/rocketShip.png" alt="rocketShip" className="w-12 h-12" />
				<div className="">Web3 App</div>
			</Link>
			<div className="flex items-center space-x-6 ">
				<Link to="/">Home</Link>
				<Link to="/Details">Details</Link>
				<Link to="/Transfer">Transfer</Link>
				<AnimatePresence>
					{account ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							className="w-20 text-sm flex flex-col items-center justify-center"
						>
							<div>Account:</div>
							<div> {account.slice(0, 3) + "..." + account.slice(-3)}</div>
						</motion.div>
					) : (
						<motion.button
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							className="w-20 px-3 py-1 bg-blue-500 rounded-md text-white text-sm"
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
