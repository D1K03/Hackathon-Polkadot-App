import { Link } from "react-router-dom";
import React, { useState } from "react";
import Web3 from "web3";
import "../styles/Auth.css";

const providerRPC = {
  moonbase: "https://rpc.api.moonbase.moonbeam.network",
};

const web3 = new Web3(providerRPC.moonbase);

export default function Auth() {
  const [username, setUsername] = useState("");
  const [walletToken, setWalletToken] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleWalletTokenChange = (e) => {
    setWalletToken(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to handle the form submission,
    // such as sending the username and wallet token to your server.
    console.log("Username:", username);
    console.log("Wallet Token:", walletToken);
  };

  return (
    <div className="auth-page">
      <Link to="/">
        <h1
          className="auth-header"
          style={{
            textDecoration: "None",
            outline: "None",
          }}
        >
          Auth
        </h1>
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
