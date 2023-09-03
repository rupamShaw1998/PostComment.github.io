import React, { useState } from "react";
import { Button, Modal } from "antd";

const PostModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
      >
        <p>{}</p>
      </Modal>
    </>
  );
};

export default PostModal;
