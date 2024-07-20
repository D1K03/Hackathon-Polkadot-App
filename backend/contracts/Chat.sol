// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
    // Event to notify when a new message is sent
    event MessageSent(address indexed from, string message);

    // Function to send a message
    function sendMessage(string calldata message) public {
        emit MessageSent(msg.sender, message);
    }

    // Function to get the latest messages
    function getMessages()
        public
        view
        returns (address[] memory, string[] memory)
    {
        return (users, messages);
    }

    // Internal variables to store messages and user addresses
    address[] private users;
    string[] private messages;

    // Internal function to record a new message
    function _recordMessage(string memory message) internal {
        users.push(msg.sender);
        messages.push(message);
    }
}
