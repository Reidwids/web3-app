import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Lander from "./lander/Lander";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Details from "./details/Details";
import Transfer from "./transfer/Transfer";

export default function Base() {
	const { account } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (account && window.ethereum) {
			window.ethereum.on("chainChanged", () => window.location.reload());
			window.ethereum.on("accountsChanged", () => window.location.reload());
		}
	}, [account]);

	return (
		<BrowserRouter>
			<div className="w-full min-h-screen flex flex-col items-center">
				<Navbar />
				<div className="min-w-full min-h-[calc(100vh-72px)] flex justify-center ">
					<Routes>
						<Route path="/" element={<Lander />} />
						<Route path="/details" element={<Details />} />
						<Route path="/transfer" element={<Transfer />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}
