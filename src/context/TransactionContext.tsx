import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { setAccount, setNetworkID } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

export const TransactionContext = React.createContext({
	connectWallet: async () => {},
	isConnecting: true,
});

export const TransactionProvider = ({ children }: { children: any }) => {
	const [isConnecting, setIsConnecting] = useState(true);
	const { account } = useSelector((state: RootState) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const autoConnect = async () => {
		if (window.ethereum == null) {
			console.log("MetaMask not installed. Please install MetaMask.");
		} else if (!(await window.ethereum._metamask.isUnlocked())) {
			console.log("MetaMask is locked. Please unlock MetaMask.");
		} else {
			const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
			const networkID = (await window.ethereum.request({ method: "eth_chainId" })) as string;
			if (accounts && accounts[0] && networkID) {
				dispatch(setAccount(accounts[0]));
				dispatch(setNetworkID(parseInt(networkID, 16)));
			}
		}
		setIsConnecting(false);
	};

	const connectWallet = async () => {
		setIsConnecting(true);
		if (window.ethereum == null) {
			console.log("MetaMask not installed. Please install MetaMask.");
		} else if (!(await window.ethereum._metamask.isUnlocked())) {
			console.log("MetaMask is locked. Please unlock MetaMask.");
		} else {
			const newProvider = new ethers.BrowserProvider(window.ethereum);
			const newSigner = await newProvider.getSigner();
			const account = await newSigner.getAddress();
			const network = await newProvider.getNetwork();
			dispatch(setAccount(account));
			dispatch(setNetworkID(network.chainId));
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
