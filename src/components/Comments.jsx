import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Comments = ({ postId, commentText }) => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4OTU5ZWIzMmRmZGUxMmQxNzAwNWEiLCJlbWFpbCI6InN0ZXZlQGFiYy5jb20iLCJuYW1lIjoiQ2FwdGFpbiBBbWVyaWNhIiwiaWF0IjoxNjkzOTMwMzI1fQ.-RZUJOYEGN-nJjtFVK3kkDcm5KPT08SeaS_QRx7V3dM";

    const [postComments, setPostComments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
      getCommentsByPost(postId);
    }, [commentText]);
      
    useEffect(() => {
      getUsers();
    }, []);

    const getCommentsByPost = async (postId) => {
        try {
            const headers = {"Authorization": `Bearer ${token}`};
            const response = await axios.get(`http://localhost:5000/comment/get-comments/${postId}`, { headers });
            setPostComments(response.data);
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
      const user = users?.find((user) => id===user._id);
      return user?.name;
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
              actions={[<DeleteOutlined key="delete" />]}
            >
              <Meta
                avatar={<Avatar src={SRC_URL} />}
                title={getUserName(comment.authorId)}
                description={comment.text}
              />
            </Card>
          );
        })}
    </>
  );
};

export default Comments;
