import React, { useEffect, useState } from "react";
import { Avatar, Card, Input } from "antd";
import PostModal from "./PostModal";
import axios from "axios";
import Comments from "./Comments";
import "../styles/Home.css";

const { Meta } = Card;

const Home = () => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4OTU5ZWIzMmRmZGUxMmQxNzAwNWEiLCJlbWFpbCI6InN0ZXZlQGFiYy5jb20iLCJuYW1lIjoiQ2FwdGFpbiBBbWVyaWNhIiwiaWF0IjoxNjkzOTMwMzI1fQ.-RZUJOYEGN-nJjtFVK3kkDcm5KPT08SeaS_QRx7V3dM";

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [signedUser, setSignedUser] = useState({});

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  const updatePostsUI = (newPost) => {
    setPosts([...posts, newPost]);
  }

  const getPosts = async () => {
    try {
      const headers = { "Authorization": `Bearer ${token}` };
      const response = await axios.get("http://localhost:5000/post/get-posts", { headers });
      console.log(response.data)
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

  const getUserName = (id) => {
    const user = users?.find((user) => id === user._id);
    return user?.name;
  };

  return (
    <div style={{ width: 450 }}>
      <PostModal signedUser={signedUser} updateUI={updatePostsUI} />

      {posts.map((post) => (
        <Card key={post._id} style={{margin: "20px 0"}} >
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
            }
            title={getUserName(post.authorId)}
            description={post.content}
          />
          <Comments postId={post._id} />
          <Input placeholder="Enter a comment :)" />
        </Card>
      ))}

    </div>
  );
};

export default Home;
