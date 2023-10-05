import axios from "axios";
import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const UpdateCommentModal = ({ commentId, defaultValue }) => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [updateText, setUpdateText] = useState("");

  const handleEditComment = (commentId) => {
    setConfirmLoading(true);
    editComment(commentId);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("cancelled...");
    setOpen(false);
  };

  const editComment = async (commentId) => {
    try {
      await axios.patch(`https://rupam-social-media.onrender.com/comment/update/${commentId}`, {text: updateText});
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <EditOutlined key="edit" onClick={() => setOpen(true)} />
      <Modal
        title="Edit your comment :)"
        open={open}
        onOk={() => handleEditComment(commentId)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!updateText}
            loading={confirmLoading}
            onClick={() => handleEditComment(commentId)}
          >
            Update
          </Button>,
        ]}
      >
        <TextArea
          rows={5}
          placeholder="your updated comment...✍️"
          allowClear
          defaultValue={defaultValue}
          onChange={(e) => setUpdateText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default UpdateCommentModal;
