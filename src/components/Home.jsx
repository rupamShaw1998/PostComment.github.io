import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Spin, Typography } from "antd";
import PostModal from "./PostModal";
import axios from "axios";
import Comment from "./Comment";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text, Title } = Typography;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [signedUser, setSignedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);
  
  const updatePostsUI = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const signOutHandler = () => {
    navigate("/signIn");
    localStorage.removeItem("AccessToken");
  };

  const getPosts = async () => {
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(
        "https://rupam-social-media.onrender.com/post/get-posts",
        {
          headers,
        }
      );
      setIsLoading(false);
      setSignedUser(response.data.user);
      setPosts(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `https://rupam-social-media.onrender.com/user/get-users`
      );
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
      <div style={{ display: "flex" }}>
        <Title level={4} italic style={{ color: "teal" }}>
          Welcome, <span style={{ color: "aqua" }}>{signedUser.name}</span>
        </Title>
        <Button 
          onClick={signOutHandler} 
          style={{ margin: "25px" }}
        >
          Sign Out
        </Button>
      </div>
      <PostModal signedUser={signedUser} updateUI={updatePostsUI} />
      <br />

      {isLoading ? <Spin size="large" /> : null}

      {posts.map((post, id) => (
        <Card key={post._id} style={{ margin: "20px 0" }}>
          <Meta
            avatar={
              <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`} />
            }
            title={getUserName(post.authorId)}
            description={<Text color="#200533">{post.content}</Text>}
          />
          <Comment
            postId={post._id}
            authToken={authToken}
            signedUser={signedUser}
          />
        </Card>
      ))}
    </div>
  );
};

export default Home;
