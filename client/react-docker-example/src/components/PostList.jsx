import "./main.css";
import { useEffect, useState } from "react";

import api from "../config/axiosRefreshToken";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api({
      method: "get",
      url: "http://localhost:4000/getAllPosts",
    }).then((res) => {
      console.log(res);
      if (!res.data.ok) {
        console.log("error in getting all posts");
      }
      const postsArr = res.data.body.postsWithUserInfo;

      if (!postsArr) {
        setPosts([]);
        return;
      }
      setPosts(postsArr);
    });
  }, []);

  return (
    <div className="posts">
      <Link to="/addPost" className="btn btn-secondary">
        Add Post
      </Link>
      <div
        className="posts-list"
        style={{
          paddingTop: "80px",
        }}
      >
        {posts.length === 0
          ? "No posts yet"
          : posts.map((post) => {
              return <PostItem post={post} key={post.post_id}></PostItem>;
            })}
      </div>
    </div>
  );
};

export default PostList;
