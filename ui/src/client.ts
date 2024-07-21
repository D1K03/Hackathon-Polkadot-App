import Web3 from "web3";

const providerRPC = {
	moonbase: "https://rpc.api.moonbase.moonbeam.network",
};

export const web3 = new Web3(providerRPC.moonbase);
const CHAT_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "content",
				type: "string",
			},
		],
		name: "MessageSent",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "userAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "username",
				type: "string",
			},
		],
		name: "UserRegistered",
		type: "event",
	},
	{
		inputs: [],
		name: "getMessages",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "string",
						name: "content",
						type: "string",
					},
				],
				internalType: "struct Chat.Message[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_userAddress",
				type: "address",
			},
		],
		name: "getUser",
		outputs: [
			{
				internalType: "string",
				name: "username",
				type: "string",
			},
			{
				internalType: "bool",
				name: "isRegistered",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_username",
				type: "string",
			},
		],
		name: "getUserAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_username",
				type: "string",
			},
		],
		name: "register",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_content",
				type: "string",
			},
		],
		name: "sendMessage",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
const CHAT_ADDRESS = "0x2a501Aa74b1e22DC3A5c6855fF794e11140761d2"; // Replace with your deployed contract address
const chatContract = new web3.eth.Contract(CHAT_ABI, CHAT_ADDRESS);
export default chatContract