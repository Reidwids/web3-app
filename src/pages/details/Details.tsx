import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import abi from "../../utils/erc20.json";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../context/TransactionContext";

export default function Details() {
	const { account } = useSelector((state: RootState) => state.user);
	const [balance, setBalance] = useState<string>("");
	const [tokenBalance, setTokenBalance] = useState<string>("");

	// Default is Goerli Weth
	const [tokenAddress, setTokenAddress] = useState<string>("0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6");

	async function getEthBalance() {
		try {
			const balance = (await window.ethereum!.request({
				method: "eth_getBalance",
				params: [account, "latest"],
			})) as ethers.BigNumberish;

			const balanceInEther = ethers.formatEther(balance);
			setBalance(balanceInEther);
		} catch (err) {
			console.log("Error getting ETH balance: ", err);
			toast.error("Error getting ETH balance", defaultToastOptions);
		}
	}

	async function getTokenBalance(address: string) {
		try {
			if (account && tokenAddress) {
				const newProvider = new ethers.BrowserProvider(window.ethereum!);
				const tokenContract = new ethers.Contract(address, abi, newProvider);
				const balance = await tokenContract.balanceOf(account);
				const decimals = await tokenContract.decimals();
				const convertedBalance = ethers.formatUnits(balance, decimals);
				setTokenBalance(convertedBalance.toString());
			}
		} catch (err) {
			console.log("Error getting token balance", err);
			toast.error("Error getting token balance", defaultToastOptions);
		}
	}

	useEffect(() => {
		document.title = "Web3 App - Details";
	}, []);

	useEffect(() => {
		if (tokenAddress) {
			getTokenBalance(tokenAddress);
		}
	}, [tokenAddress]);

	useEffect(() => {
		if (account) {
			getEthBalance();
			getTokenBalance(tokenAddress);
		}
	}, [account]);

	return (
		<div className="w-full flex items-center justify-center bg-neutral-800 text-white text-2xl">
			<div className="w-full flex flex-col py-5 px-10 justify-center max-w-4xl min-h-80 shadow-2xl rounded-xl">
				<p>Connected Account: {account}</p>
				<p>ETH Balance: {balance ? balance : "..."}</p>
				<div className="flex text-md items-center">
					<p>Enter a token address :</p>
					<input
						className="text-black ml-3 py-1 px-2 rounded-md"
						style={{ fontSize: "18px" }}
						defaultValue={"0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"}
						onChange={(e) => setTokenAddress(e.target.value)}
					/>
				</div>
				<p>Token Balance: {tokenBalance ? tokenBalance : "..."}</p>
			</div>
		</div>
	);
}
