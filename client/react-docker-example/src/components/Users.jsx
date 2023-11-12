import { useState, useEffect } from "react";
import api from "./../config/axiosRefreshToken";
import Cookies from "js-cookie";

import send from "./../images/send.png";
import add from "./../images/add.png";

const Users = () => {
  const [friendsArr, setFriendsArr] = useState([]);
  const [usersArr, setusersArr] = useState([]);

  const myId = Cookies.get("userId");

  const getAllMessages = (e) => {
    const chat = document.querySelector(".chat-center");
    chat.innerHTML = "";
    const chatWith = document.querySelector(".chat-top");
    let toUserId;
    let toUserName;
    if (e.target.parentElement.tagName === "BUTTON") {
      toUserId =
        e.target.parentElement.parentElement.getAttribute("data-userid");
      toUserName =
        e.target.parentElement.parentElement.firstElementChild.firstElementChild
          .textContent;
    } else {
      toUserId = e.target.parentElement.getAttribute("data-userid");
      toUserName =
        e.target.parentElement.firstElementChild.firstElementChild.textContent;
    }
    chatWith.textContent = toUserName;

    localStorage.setItem("toUserSocketId", toUserId);

    api({
      method: "post",
      url: "http://localhost:4001/getAllMessages",
      data: {
        fromUser: myId,
        toUser: toUserId,
        hello: "hedhjada",
        fromUserFirstName: Cookies.get("firstName"),
        toUserFirstName: toUserName,
      },
    }).then((res) => {
      if (!res.data.ok) {
        console.log("error in getting all messages");
      }
    });
  };
  const getAllFriends = () => {
    api({
      method: "get",
      url: "http://localhost:4000/getAllFriends",
      data: {},
    }).then((res) => {
      console.log(res);
      if (!res.data.ok) {
        console.log("error in getting all friend");
      }

      const arrOfFriends = res.data.body.friends;
      setFriendsArr(arrOfFriends);
    });
  };

  const getAllUsers = () => {
    console.log(Cookies.get("accesToken"));

    api({
      method: "get",
      url: "http://localhost:4000/getAllUsers",
      data: {},
    }).then((res) => {
      console.log(res);
      if (!res.data.ok) {
        console.log("error in getting all friend");
      }

      const onlineUsers = res.data.body.onlineUsers;
      setusersArr(onlineUsers);
    });
  };

  const addToFriendHandler = (friendId) => {
    api({
      method: "post",
      url: "http://localhost:4000/addFriend",
      data: {
        friendId,
      },
    }).then((res) => {
      console.log(res);
      if (!res.data.ok) {
        console.log("error in adding friend");
      }
    });
  };

  useEffect(() => {
    getAllFriends();
    getAllUsers();
  }, []);

  return (
    <div className="users">
      <div className="users__friends">
        <h1>Friends</h1>
        {friendsArr.map((friend) => {
          return (
            <div
              key={friend.friend.id}
              data-userid={friend.friend.id}
              className="friend__item"
            >
              <div className="friend__item-info">
                <div>{friend.friend.firstName}</div>
                <div>{friend.friend.username}</div>
              </div>
              <button
                className="friend__btn"
                onClick={(e) => {
                  getAllMessages(e);
                }}
              >
                <img src={send} alt="" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="users__online">
        <h1>Users</h1>
        {usersArr.map((user) => {
          console.log(user);
          return (
            <div className="user__block" key={user.id} data-userid={user.id}>
              <div className="user__info">
                <div className="user__name">
                  {user.firstName} {user.id === myId ? "(you)" : ""}
                </div>
                <div className="user__status">
                  {user.isOnline ? "online" : "offline"}
                </div>
              </div>
              <button
                onClick={(e) => {
                  let userId;
                  if (e.target.parentElement.tagName === "BUTTON") {
                    userId =
                      e.target.parentElement.parentElement.getAttribute(
                        "data-userid"
                      );
                  } else {
                    userId = e.target.parentElement.getAttribute("data-userid");
                  }

                  if (userId === myId) {
                    alert("Can't add to friend yourself");
                    return;
                  }
                  Cookies.set("toUser", userId);
                  addToFriendHandler(userId);
                }}
              >
                <img src={add} alt="" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
