import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Lander from "./lander/Lander";

export default function Base() {
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
