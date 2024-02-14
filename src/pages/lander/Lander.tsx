import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setAccount } from "../../redux/user";

export default function Lander() {
	const { account } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const connectWallet = async () => {
		if (window.ethereum == null) {
			console.log("MetaMask not installed. Please install MetaMask.");
		} else if (!(await window.ethereum._metamask.isUnlocked())) {
			console.log("MetaMask is locked. Please unlock MetaMask.");
		} else {
			const newProvider = new ethers.BrowserProvider(window.ethereum);
			const newSigner = await newProvider.getSigner();
			const account = await newSigner.getAddress();
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			console.log("Accounts: ", accounts);
			dispatch(setAccount(account));
		}
	};

	const autoConnect = async () => {
		if (window.ethereum == null) {
			console.log("MetaMask not installed. Please install MetaMask.");
		} else if (!(await window.ethereum._metamask.isUnlocked())) {
			console.log("MetaMask is locked. Please unlock MetaMask.");
		} else {
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			if (accounts && accounts[0]) {
				dispatch(setAccount(accounts[0]));
			}
		}
	};

	useEffect(() => {
		autoConnect();
	}, []);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800">
			<div className="w-full flex items-center justify-center max-w-4xl min-h-80 shadow-2xl rounded-xl">
				{account ? (
					<div className="flex items-center justify-center">
						<p className="text-2xl text-white">Connected Account: {account}</p>
					</div>
				) : (
					<button className="px-5 py-3 w-fit bg-blue-500 rounded-md text-white" onClick={connectWallet}>
						Connect Wallet
					</button>
				)}
			</div>
		</div>
	);
}
