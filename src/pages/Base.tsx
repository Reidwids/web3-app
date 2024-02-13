import React from "react";
import Navbar from "./Navbar";
import Lander from "./lander/Lander";

export default function Base() {
	return (
		<div className="w-full min-h-screen flex flex-col items-center">
			<Navbar />
			<Lander />
		</div>
	);
}
