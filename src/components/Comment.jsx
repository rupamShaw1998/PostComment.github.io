import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Input, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateCommentModal from "./UpdateCommentModal";

const { Meta } = Card;
const { Text } = Typography;

const Comment = ({ postId, authToken, signedUser }) => {
  
  const [comments, setComments] = useState([]);
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
      setComments(response.data);
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
      {comments.map((comment, id) => {
        let SRC_URL = `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`;

        return (
          <Card
            key={comment._id}
            style={{
              margin: "16px 0",
            }}
            type="inner"
            actions={[
              comment.authorId === signedUser._id? 
                <DeleteOutlined key="delete" onClick={() => deleteComment(comment._id)} />
                : null,
              comment.authorId === signedUser._id?
                <UpdateCommentModal commentId={comment._id} defaultValue={comment.text} />
                : null
            ]}
          >
            <Meta
              avatar={<Avatar src={SRC_URL} />}
              title={getUserName(comment.authorId)}
              description={<Text color="#200533">{comment.text}</Text>}
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
