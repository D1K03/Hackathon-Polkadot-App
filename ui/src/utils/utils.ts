import web3 from "web3";

export const registerUser = async (chatContract, username) => {
	const accounts = await web3.eth.getAccounts();
	await chatContract.methods.register(username).send({ from: accounts[0] });
};

export const sendMessage = async () => {
	const accounts = await web3.eth.getAccounts();
	await chatContract.methods.sendMessage(messageContent).send({ from: accounts[0] });
};

export const fetchMessages = async () => {
	const messages = await chatContract.methods.getMessages().call();
	setMessages(messages);
};