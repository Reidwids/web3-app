import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

export default function Navbar() {
	const { account } = useSelector((state: RootState) => state.user);
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
				{account && (
					<div className="text-sm flex flex-col items-center justify-center">
						<div>Account:</div>
						<div> {account.slice(0, 3) + "..." + account.slice(-3)}</div>
					</div>
				)}
			</div>
		</div>
	);
}
