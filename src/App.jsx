import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import { useState } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function App() {

  const [authToken, setAuthToken] = useState("");

  return (
    <BrowserRouter>
      <Title level={2} style={{ color: "brown" }}>Post Comment Application</Title>
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn setAuthToken={setAuthToken} />}></Route>
        <Route path="/Home" element={<Home authToken={authToken} setAuthToken={setAuthToken} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
