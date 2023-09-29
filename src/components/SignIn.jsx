import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Item } = Form;
const { Text } = Typography;

const SignIn = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post("https://rupam-social-media.onrender.com/user/login",  { email, password });
      localStorage.setItem("AccessToken", response.data.accessToken);
      alert("✅ You're successfully logged in :)");
      navigate("/home");
    } catch (err) {
      if(err.response.data === "user doesn't exists") {
        alert("Oops! this email address doesn't exist. 😢 \nPlease enter correct email address or Register by clicking the Sign Up button.");
      }
      if(err.response.data === "wrong password!") {
        alert("Oops! Password incorrect. 😢 \nPlease enter correct password.");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Item>

      <Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
        <br /><br />
        <Text type="secondary">Don't have a account?</Text>
        <Link to={"/signUp"}>
            <Button type="link">Sign Up</Button>
        </Link>
      </Item>

      <Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Item>
    </Form>
  );
};

export default SignIn;
