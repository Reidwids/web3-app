import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Lander from "./lander/Lander";
import Details from "./details/Details";
import Transfer from "./transfer/Transfer";
import { TransactionProvider } from "../context/TransactionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Base() {
	return (
		<BrowserRouter>
			<TransactionProvider>
				<div className="w-full min-h-screen flex flex-col items-center">
					<Navbar />
					<div className="min-w-full min-h-[calc(100vh-88px)] flex justify-center ">
						<ToastContainer />
						<Routes>
							<Route path="/" element={<Lander />} />
							<Route path="/details" element={<Details />} />
							<Route path="/transfer" element={<Transfer />} />
						</Routes>
					</div>
				</div>
			</TransactionProvider>
		</BrowserRouter>
	);
}
