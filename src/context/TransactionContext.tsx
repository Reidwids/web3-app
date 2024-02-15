import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { setAccount } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";

export const TransactionContext = React.createContext({
	connectWallet: async () => {},
	isConnecting: true,
});

export const defaultToastOptions: ToastOptions = {
	position: "bottom-center",
	pauseOnHover: true,
	hideProgressBar: true,
	autoClose: 2000,
	className: "text-black",
};

export const TransactionProvider = ({ children }: { children: any }) => {
	const { account } = useSelector((state: RootState) => state.user);
	const [isConnecting, setIsConnecting] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const autoConnect = async () => {
		if (window.ethereum == null) {
			console.log("MetaMask not installed. Please install MetaMask.");
		} else if (!(await window.ethereum._metamask.isUnlocked())) {
			console.log("MetaMask is locked. Please unlock MetaMask.");
		} else {
			const newProvider = new ethers.BrowserProvider(window.ethereum);
			const existingAccounts = await newProvider.listAccounts();
			if (existingAccounts.length) {
				const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
				dispatch(setAccount(accounts[0]));
				toast.success("Welcome Back!", defaultToastOptions);
			}
		}
		setIsConnecting(false);
	};

	const connectWallet = async () => {
		setIsConnecting(true);
		if (window.ethereum == null) {
			toast.warning("MetaMask not installed. Please install MetaMask.", defaultToastOptions);
		} else if (!(await window.ethereum._metamask.isUnlocked())) {
			toast.warning("MetaMask is locked. Please unlock MetaMask.", defaultToastOptions);
		} else {
			try {
				const newProvider = new ethers.BrowserProvider(window.ethereum);
				const newSigner = await newProvider.getSigner();
				const account = await newSigner.getAddress();
				dispatch(setAccount(account));
			} catch (error) {
				console.error(error);
				toast.error("Failed to connect to MetaMask.", defaultToastOptions);
			}
		}
		setIsConnecting(false);
	};

	useEffect(() => {
		autoConnect();
	}, []);

	useEffect(() => {
		if (!account) {
			navigate("/");
		}
	}, [account]);

	return <TransactionContext.Provider value={{ connectWallet, isConnecting }}>{children}</TransactionContext.Provider>;
};
