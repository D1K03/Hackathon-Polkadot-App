import { useState, useEffect } from "react";
import Web3 from "web3";
import chatContract from "../client"; // Ensure this is your contract instance
import "../styles/Chat.css"; // Import your CSS file
import { Link } from "react-router-dom";
export default function Chat() {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);

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
    fetchMessages();
  }, []);

  const handleMessageContentChange = (e) => {
    setMessageContent(e.target.value);
  };

  const sendMessage = async () => {
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
      await chatContractWithSigner.methods
        .sendMessage(messageContent)
        .send({ from: accounts[0] });

      setMessageContent(""); // Clear input field
      fetchMessages(); // Refresh messages after sending
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    if (!web3Instance) {
      console.error("Web3 is not initialized.");
      return;
    }

    try {
      const chatContractWithSigner = new web3Instance.eth.Contract(
        chatContract.options.jsonInterface,
        chatContract.options.address
      );

      const fetchedMessages = await chatContractWithSigner.methods
        .getMessages()
        .call();
      console.log(accounts);
      console.log(fetchedMessages);
      const filtered = fetchedMessages.filter(
        (message) => message.sender === accounts[0]
      );
      setMessages(fetchedMessages);
      // console.log(filtered);
      // console.log(fetchMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (web3Instance) {
      const intervalId = setInterval(fetchMessages, 1000);
      return () => clearInterval(intervalId);
    }
  }, [web3Instance]);

  return (
    <div className="chat-container">
      <Link to="/">
        <h1>Chat</h1>
      </Link>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
      </div>
      <div className="chat-form">
        <input
          type="text"
          value={messageContent}
          onChange={handleMessageContentChange}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
