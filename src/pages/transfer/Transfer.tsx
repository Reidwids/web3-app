import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../utils/erc20.json";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { defaultToastOptions } from "../../context/TransactionContext";

export default function Transfer() {
	const [amount, setAmount] = useState<string>("");
	const [toAddress, setToAddress] = useState<string>("");
	const [tokenAddress, setTokenAddress] = useState<string>("");
	const [tokenType, setTokenType] = useState<"eth" | "token">("eth");

	const sendTransaction = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!toAddress || !amount) {
			toast.error("Please fill in all fields", defaultToastOptions);
			return;
		}
		const provider = new ethers.BrowserProvider(window.ethereum!);
		const signer = await provider.getSigner();
		if (tokenType === "eth") {
			try {
				const tx = {
					to: toAddress,
					value: ethers.parseEther(amount),
				};
				await signer.sendTransaction(tx);
				toast.success("Transaction sent", defaultToastOptions);
			} catch (e) {
				console.log("Error completing transaction", e);
				toast.error("Error completing transaction", defaultToastOptions);
			}
		} else {
			if (!tokenAddress) {
				toast.error("Please fill in all fields", defaultToastOptions);
				return;
			}

			try {
				const contract = new ethers.Contract(tokenAddress, abi, signer);
				await contract.transfer(toAddress, ethers.parseUnits(amount, "ether"));
				toast.success("Transaction sent", defaultToastOptions);
			} catch (e) {
				console.log("Error completing transaction", e);
				toast.error("Error completing transaction", defaultToastOptions);
			}
		}
	};

	useEffect(() => {
		document.title = "Web3 App - Transfer";
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800 text-white">
			<div className="w-full flex flex-col items-center justify-center max-w-4xl mx-10 p-10 shadow-2xl rounded-xl bg-neutral-700">
				<h2 className="text-4xl text-white mb-10 w-full text-center">Transfer Tokens</h2>
				<div className="flex justify-center w-full text-lg rounded-xl overflow-hidden max-w-60 ">
					<motion.div
						animate={{
							backgroundColor: tokenType === "eth" ? "rgb(30 64 175)" : "rgb(23 37 84)",
							transition: { duration: 0.3 },
						}}
						className="bg-blue-950 w-1/2 p-2 py-2 text-center cursor-pointer"
						onClick={() => setTokenType("eth")}
					>
						ETH
					</motion.div>
					<motion.div
						className="bg-blue-950 w-1/2 p-2 text-center cursor-pointer"
						animate={{
							backgroundColor: tokenType !== "eth" ? "rgb(30 64 175)" : "rgb(23 37 84)",
							transition: { duration: 0.3 },
						}}
						onClick={() => setTokenType("token")}
					>
						TOKEN
					</motion.div>
				</div>
				<form className="flex flex-col items-start mt-4">
					<label>To Address:</label>
					<input
						className="w-80 p-2 m-2 text-black rounded-md"
						type="text"
						placeholder="0x"
						onChange={(e) => setToAddress(e.target.value)}
					/>
					<label>Amount:</label>
					<input
						className="w-80 p-2 m-2 text-black rounded-md"
						type="text"
						placeholder="0.0"
						onChange={(e) => setAmount(e.target.value)}
					/>
					{tokenType === "token" ? (
						<motion.div
							className="flex flex-col"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<label>Token Address:</label>
							<input
								className="w-80 p-2 m-2 text-black rounded-md"
								type="text"
								placeholder="0x"
								onChange={(e) => setTokenAddress(e.target.value)}
							/>
						</motion.div>
					) : (
						<div className="h-20"></div>
					)}
					<button className="w-80 p-2 m-2 bg-blue-950 hover:bg-blue-800 transition-all rounded-md" onClick={sendTransaction}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
