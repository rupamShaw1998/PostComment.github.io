import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";

const { TextArea } = Input;

const PostModal = ({ signedUser, updateUI }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [text, setText] = useState("");

  const handleCreatePost = () => {
    setConfirmLoading(true);
    createPost();
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const createPost = async () => {
    try {
      const body = { authorId: signedUser._id, content: text };
      const response = await axios.post("http://localhost:5000/post/add", body);
      updateUI(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{ margin: "10px" }}
      >
        Create
      </Button>
      <Modal
        title="Create a new post :)"
        open={open}
        onOk={handleCreatePost}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={text? false : true}
            loading={confirmLoading}
            onClick={handleCreatePost}
          >
            Post
          </Button>,
        ]}
      >
        <TextArea
          rows={5}
          placeholder="Write something..."
          allowClear
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default PostModal;
