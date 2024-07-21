// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Chat {
    struct Message {
        address sender;
        string content;
    }

    struct User {
        string username;
        bool isRegistered;
    }

    mapping(address => User) private users;
    mapping(string => address) private usernameToAddress;

    Message[] private messages;

    event MessageSent(address sender, string content);
    event UserRegistered(address userAddress, string username);

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }

    function sendMessage(string memory _content) public onlyRegistered {
        messages.push(Message({sender: msg.sender, content: _content}));
        emit MessageSent(msg.sender, _content);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    function register(string memory _username) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(usernameToAddress[_username] == address(0), "Username already taken");

        users[msg.sender] = User(_username, true);
        usernameToAddress[_username] = msg.sender;

        emit UserRegistered(msg.sender, _username);
    }

    function getUser(address _userAddress) public view returns (string memory username, bool isRegistered) {
        User memory user = users[_userAddress];
        return (user.username, user.isRegistered);
    }

    function getUserAddress(string memory _username) public view returns (address) {
        return usernameToAddress[_username];
    }
}
