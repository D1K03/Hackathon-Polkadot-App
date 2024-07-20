// contracts/Chat.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
    mapping(address => string) public users;
    mapping(address => bool) public registeredUsers;
    mapping(address => string[]) public userMessages;

    event UserRegistered(address user, string username);
    event MessageSent(address from, string message);

    function registerUser(string memory username) public {
        require(!registeredUsers[msg.sender], "User already registered");
        users[msg.sender] = username;
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender, username);
    }

    function sendMessage(string memory message) public {
        require(registeredUsers[msg.sender], "User not registered");
        userMessages[msg.sender].push(message);
        emit MessageSent(msg.sender, message);
    }

    function getMessages() public view returns (string[] memory) {
        return userMessages[msg.sender];
    }
}
