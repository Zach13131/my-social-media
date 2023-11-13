import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import React from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4001", {
  autoConnect: false,
  query: {
    userId: Cookies.get("userId"),
    accesToken: Cookies.get("accesToken"),
  },
});

const username = Cookies.get("username");

if (!username) {
  window.history.pushState(null, "", "/login");
} else {
  socket.open();
}

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.open();

    socket.on("renderMessage", (data) => {
      const receivedMessage = data.message; // Assuming the message is in JSON format
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    socket.on("userConnect", function (body) {});
  }, []);

  const sendMessage = () => {
    const toUserSocketId = localStorage.getItem("toUserSocketId");

    if (!toUserSocketId) {
      alert("Plese select friend to whom you want to send message");
      return;
    }

    socket.emit("sendMessage", {
      message: inputValue,
      fromUser: Cookies.get("userId"),
      toUser: toUserSocketId,
      fromUserFirstName: Cookies.get("firstName"),
    });
  };
  const onEnterPress = (e) => {
    if (+e.keyCode === 13) {
      e.preventDefault();
      e.target.value = "";
      sendMessage();
    }
  };

  return (
    <div className="chat">
      <div className="chat-top">Select with whom u want to talk</div>
      <div className="chat-center">
        {messages.map((message) => {
          return (
            <div className="message-block">
              <div className="message-text">{message}</div>
            </div>
          );
        })}
      </div>
      <div className="chat-bottom">
        <form
          action=""
          style={{
            width: "100%",
          }}
        >
          <textarea
            onKeyDown={onEnterPress}
            className="chat__textarea"
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
        </form>
      </div>
    </div>
  );
};

export default Chat;
