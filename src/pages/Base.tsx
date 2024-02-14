import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Lander from "./lander/Lander";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ethers } from "ethers";

export default function Base() {
	const { account } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (account && window.ethereum) {
			window.ethereum.on("chainChanged", () => window.location.reload());
		}
	}, [account]);

	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<Navbar />
			<div className="min-w-full min-h-[calc(100vh-72px)] flex justify-center ">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Lander />} />
						{/* <Route path="/Details" element={<Lander />} />
						<Route path="/Transfer" element={<Lander />} /> */}
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}