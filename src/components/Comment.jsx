import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar,Button, Card, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Comment = ({ postId, authToken, signedUser }) => {
  
  const [postComments, setPostComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    getCommentsByPost(postId);
  }, [commentText]);

  useEffect(() => {
    getUsers();
  }, []);

  const getCommentsByPost = async (postId) => {
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(
        `https://rupam-social-media.onrender.com/comment/get-comments/${postId}`,
        { headers }
      );
      console.log("called");
      setPostComments(response.data);
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
      await axios.post(
        "https://rupam-social-media.onrender.com/comment/add",
        body
      );
      setCommentText("");
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

  const deleteComment = async (id) => {
    try {
      await axios.delete(`https://rupam-social-media.onrender.com/comment/remove/${id}`);
      getCommentsByPost(postId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {postComments.map((comment, id) => {
        let SRC_URL = `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`;

        return (
          <Card
            key={comment._id}
            style={{
              margin: "16px 0",
            }}
            type="inner"
            actions={[<DeleteOutlined key="delete" onClick={() => deleteComment(comment._id)} />]}
          >
            <Meta
              avatar={<Avatar src={SRC_URL} />}
              title={getUserName(comment.authorId)}
              description={comment.text}
            />
          </Card>
        );
      })}
      <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
        <Input
          placeholder="Enter a comment 😃"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          type="dashed"
          disabled={!commentText}
          onClick={() => addComment(postId)}
        >
          Comment
        </Button>
      </div>
    </>
  );
};

export default Comment;
