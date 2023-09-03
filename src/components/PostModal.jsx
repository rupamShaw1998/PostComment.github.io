import React, { useState } from "react";
import { Button, Input, Modal } from "antd";

const { TextArea } = Input;

const PostModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [text, setText] = useState("");

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
        onOk={handleOk}
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
            onClick={handleOk}
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
