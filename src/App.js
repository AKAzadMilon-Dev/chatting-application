import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Home from "./pages/home";
import Message from "./pages/message";
import ForgotPassword from "./pages/forgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
