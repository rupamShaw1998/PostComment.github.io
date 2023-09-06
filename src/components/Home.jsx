import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Input } from "antd";
import PostModal from "./PostModal";
import axios from "axios";
import Comments from "./Comments";
import "../styles/Home.css";

const { Meta } = Card;

const Home = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4OTU5ZWIzMmRmZGUxMmQxNzAwNWEiLCJlbWFpbCI6InN0ZXZlQGFiYy5jb20iLCJuYW1lIjoiQ2FwdGFpbiBBbWVyaWNhIiwiaWF0IjoxNjkzOTMwMzI1fQ.-RZUJOYEGN-nJjtFVK3kkDcm5KPT08SeaS_QRx7V3dM";

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [signedUser, setSignedUser] = useState({});
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  const updatePostsUI = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const getPosts = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get("http://localhost:5000/post/get-posts", {
        headers,
      });
      setSignedUser(response.data.user);
      setPosts(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/get-users`);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (postId) => {
    try {
      const body = {
        authorId: signedUser._id,
        postId: postId,
        text: commentText,
      };
      const response = await axios.post(
        "http://localhost:5000/comment/add",
        body
      );
      setCommentText("");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserName = (id) => {
    const user = users?.find((user) => id === user._id);
    return user?.name;
  };

  return (
    <div style={{ width: 450 }}>
      <h2>Welcome {signedUser.name}</h2>
      <PostModal signedUser={signedUser} updateUI={updatePostsUI} />

      {posts.map((post) => (
        <Card key={post._id} style={{ margin: "20px 0" }}>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
            }
            title={getUserName(post.authorId)}
            description={post.content}
          />
          <Comments postId={post._id} commentText={commentText} />
          <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
            <Input
              placeholder="Enter a comment :)"
              // value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button 
              type="dashed" 
              disabled={commentText? false : true}
              onClick={() => addComment(post._id)}
            >
              Comment
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
