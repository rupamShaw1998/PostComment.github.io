import React, { useEffect, useState } from "react";
import { Avatar, Card, Input } from "antd";
import PostModal from "./PostModal";
import axios from "axios";
import Comments from "./Comments";
import "../styles/Home.css";

const { Meta } = Card;

const Home = () => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4OTU5ZWIzMmRmZGUxMmQxNzAwNWEiLCJlbWFpbCI6InN0ZXZlQGFiYy5jb20iLCJpYXQiOjE2OTMwNzc1MzB9.KuXvF1KrWIL1ItdYKLqFh5yv80JcQsZcEjXmzLeZ94k";
  // const posts = [
  //   {
  //     id: 1,
  //     name: "Iron Man",
  //     content: "this is first post",
  //   },
  //   {
  //     id: 2,
  //     name: "Captain America",
  //     content: "this is second post",
  //   },
  // ];

  const comments1 = [
    {
      id: 22,
      name: "Captain America",
      content: "nice post",
    },
    {
      id: 33,
      name: "Thor Odinson",
      content: "cool post",
    },
  ];

  const comments2 = [
    {
      id: 11,
      name: "Iron Man",
      content: "nice post",
    },
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const headers = {"Authorization": `Bearer ${token}`};
      const response = await axios.get("http://localhost:5000/post/get-posts",{ headers })
      // console.log(response.data);
      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ width: 450 }}>
      <PostModal />

      {posts.map((post) => (
        <Card key={post._id}>
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
            }
            title={post._id.toString()}
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
