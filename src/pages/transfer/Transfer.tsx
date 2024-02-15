import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../../utils/erc20.json";

export default function Transfer() {
	const [amount, setAmount] = useState<string>("");
	const [toAddress, setToAddress] = useState<string>("");
	const [tokenAddress, setTokenAddress] = useState<string>("");
	const [tokenType, setTokenType] = useState<"eth" | "token">("eth");
	const [transactionData, setTransactionData] = useState<any>({});

	const sendTransaction = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!toAddress || !amount) {
			console.log("Please fill in all fields");
			return;
		}
		const provider = new ethers.BrowserProvider(window.ethereum!);
		const signer = await provider.getSigner();
		if (tokenType === "eth") {
			console.log("Sending Eth");
			try {
				const tx = {
					to: toAddress,
					value: ethers.parseEther(amount),
				};
				const txResponse = await signer.sendTransaction(tx);
				setTransactionData(txResponse);
			} catch (e) {
				console.log(e);
			}
		} else {
			if (!tokenAddress) {
				console.log("Please fill in all fields");
				return;
			}
			const contract = new ethers.Contract(tokenAddress, abi, signer);
			const txResponse = await contract.transfer(toAddress, ethers.parseUnits(amount, "ether"));
			setTransactionData(txResponse);
		}
	};

	useEffect(() => {
		document.title = "Web3 App - Transfer";
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800 text-white">
			<div className="w-full flex flex-col items-center justify-center max-w-4xl min-h-80 shadow-2xl rounded-xl">
				<div className="flex justify-center w-full text-3xl">
					<div
						className="bg-blue-950 w-1/2 p-2 py-2 text-center cursor-pointer"
						style={{
							backgroundColor: tokenType === "eth" ? "rgb(30 64 175)" : "rgb(23 37 84)",
						}}
						onClick={() => setTokenType("eth")}
					>
						Eth
					</div>
					<div
						className="bg-blue-950 w-1/2 p-2 py-2 text-center cursor-pointer"
						style={{
							backgroundColor: tokenType === "token" ? "rgb(30 64 175)" : "rgb(23 37 84)",
						}}
						onClick={() => setTokenType("token")}
					>
						Token
					</div>
				</div>
				<form className="flex flex-col items-start my-10">
					{tokenType === "token" && (
						<>
							<label>Token Address:</label>
							<input
								className="w-80 p-2 m-2 text-black rounded-md"
								type="text"
								placeholder="0x"
								onChange={(e) => setTokenAddress(e.target.value)}
							/>
						</>
					)}
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
					<button className="w-80 p-2 m-2 bg-blue-950 hover:bg-blue-800 transition-all rounded-md" onClick={sendTransaction}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
