import React from "react";
import { Avatar, Card, Input } from "antd";

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
    <div>
      <Card title="Iron Man">
        <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />}
            title="Iron Man"
            description="dfjkdj djlf jkl ldfjkdfjk dlfjskldfjkdj kljr krj kl"
        />
        <Card
          type="inner"
          extra={<a href="#">More</a>}
        >
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
            title="Captain America"
            description="nice post"
          />
        </Card>
        <Card
          style={{
            marginTop: 16,
            marginBottom: 16
          }}
          type="inner"
          title="Thor Odinson"
          extra={<a href="#">More</a>}
        >
           <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
            title="Thor odinson"
            description="cool post"
          />
        </Card>
        <Input />
      </Card>
    </div>
  );
};

export default Home;
