import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
