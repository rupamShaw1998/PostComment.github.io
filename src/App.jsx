import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {

  return (
    <BrowserRouter>
      <h1>Post Comment Application</h1>
      <Routes>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<p>hi</p>}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
