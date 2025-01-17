import { useState, useEffect } from "react";
import Web3 from "web3";
import chatContract from "../client"; // Ensure this is your contract instance
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import "../styles/Auth.css"; // Import your CSS file

const providerRPC = "https://rpc.api.moonbase.moonbeam.network";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [walletToken, setWalletToken] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({
    username: "",
    isRegistered: false,
  });
  const [userAddress, setUserAddress] = useState("");
  const [accounts, setAccounts] = useState<string[]>([]);
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const initializeWeb3 = async () => {
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

    initializeWeb3();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleWalletTokenChange = (e) => {
    setWalletToken(e.target.value);
  };

  const handleMessageContentChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Wallet Token:", walletToken);
    await registerUser();
  };

  const registerUser = async () => {
    if (!web3Instance || accounts.length === 0) {
      console.error("Web3 is not initialized or no accounts found.");
      return;
    }

    try {
      const chatContractWithSigner = new web3Instance.eth.Contract(
        chatContract.options.jsonInterface,
        chatContract.options.address
      );
      console.log(accounts);

      const gottenUSer = await chatContractWithSigner.methods
        .getUser(accounts[0])
        .call();
      console.log(gottenUSer);
      if (gottenUSer[1] === true) {
        console.log("User already registered");
        const roomId = uuidv4();
        navigate(`/${roomId}/chat`);
        return;
      }

      await chatContractWithSigner.methods
        .register(username)
        .send({ from: accounts[0] });
      const roomId = uuidv4();
      navigate(`/${roomId}/chat`);
      console.log(chatContractWithSigner.methods);
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/">
        <h1 className="auth-header">Auth</h1>
      </Link>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="walletToken">Wallet Token:</label>
          <input
            type="text"
            id="walletToken"
            value={walletToken}
            onChange={handleWalletTokenChange}
            required
            className="form-control"
          />
        </div>
        <br />
        <button type="submit" className="submit-button">
          Join Chat
        </button>
      </form>
    </div>
  );
}
