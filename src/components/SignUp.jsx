import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Item } = Form;
const { Text } = Typography;

const SignUp = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { name, email, password } = values;
      console.log(values);
      const authToken = await axios.post("https://rupam-social-media.onrender.com/user/register",  { name, email, password });
      navigate("/signIn");
    } catch (err) {
      console.log(err);
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
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Item>

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
        <Text type="secondary">Already have a account?</Text>
        <Link to={"/signIn"}>
          <Button type="link">Sign In</Button>
        </Link>
      </Item>

      <Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Item>
    </Form>
  );
};

export default SignUp;
