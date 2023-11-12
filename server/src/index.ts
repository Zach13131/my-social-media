import { AppDataSource } from "./data-source";

import * as express from "express";

import { verify } from "./../helpers/verify";

import { loginHandler } from "../controllers/auth/loginHandler";
import { refreshHandler } from "../controllers/auth/refreshHandler";
import { registerHandler } from "../controllers/auth/registerHandler";
import { addPost } from "../controllers/posts/addPost";
import { getAllPosts } from "../controllers/posts/getAllPosts";
import { addFriend } from "../controllers/friends/addFriend";
import { deleteFriend } from "../controllers/friends/deleteFriend";
import { getAllFriends } from "../controllers/friends/getAllFriends";
import { updateUser } from "../controllers/updateUser";
import { getAllUsers } from "../controllers/getAllOnlineUsers";

const cors = require("cors");
AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());

    app.use(cors());

    app.post("/register", registerHandler);
    app.post("/login", loginHandler);
    app.post("/refresh", refreshHandler);

    app.post("/addPost", verify, addPost);
    app.get("/getAllPosts", getAllPosts);

    app.post("/addFriend", verify, addFriend);
    app.get("/getAllFriends", verify, getAllFriends);
    app.delete("/deleteFriend", verify, deleteFriend);

    app.post("/updateUser", updateUser);
    app.get("/getAllUsers", getAllUsers);

    app.listen(3001);
    console.log("listening on http://localhost:4000");
  })
  .catch((error) => console.log(error));
