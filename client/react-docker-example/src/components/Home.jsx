// import React from 'react';
import "./main.css";
import Users from "./Users";
import Cookies from "js-cookie";
import Chat from "./Chat";
import PostList from "./PostList";

const username = Cookies.get("username");

if (!username) {
  window.history.pushState(null, "", "/login");
}

const userSockets = {};

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
    >
      <div className="main">
        <Users />
        <Chat userSockets={userSockets} />
        <PostList />
      </div>
    </div>
  );
};

export default Home;
