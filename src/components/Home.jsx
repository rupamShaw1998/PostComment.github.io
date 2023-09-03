import React from "react";
import { Avatar, Card, Input } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import "../styles/Home.css";
import PostModal from "./PostModal";

const { Meta } = Card;

const Home = () => {
  const posts = [
    {
      id: 1,
      name: "Iron Man",
      content: "this is first post",
    },
    {
      id: 2,
      name: "Captain America",
      content: "this is second post",
    },
  ];

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

  return (
    <div style={{ width: 450 }}>
      <PostModal />
      <Card>
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
          }
          title="Iron Man"
          description="My name is Tony Stark. This is my first post Avengers. Let's save the universe."
        />
        {comments1.map((comment) => {
          let SRC_URL = `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${comment.id}`;
          return (
            <Card
              style={{
                margin: "16px 0",
              }}
              type="inner"
              actions={[<DeleteOutlined key="delete" />]}
            >
              <Meta
                avatar={<Avatar src={SRC_URL} />}
                title={comment.name}
                description={comment.content}
              />
            </Card>
          );
        })}
        <Input placeholder="Enter a comment :)" />
      </Card>
    </div>
  );
};

export default Home;
