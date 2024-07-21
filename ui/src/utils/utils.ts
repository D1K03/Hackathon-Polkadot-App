import Web3 from "web3";



export const initializeWeb3 = async (setAccounts = null, setWeb3Instance = null) => {
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		setWeb3Instance(web3);

		try {
			// Request accounts from MetaMask
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setAccounts(accounts);
		} catch (error) {
			console.error("Error requesting accounts:", error.message);
		}
	} else {
		console.error("MetaMask is not installed.");
	}
};