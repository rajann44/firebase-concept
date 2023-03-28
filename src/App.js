import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import User from "./components/User";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/user" element={<User></User>}></Route>
        <Route path="/user/edit/:id" element={<EditUser></EditUser>}></Route>
      </Routes>
    </div>
  );
}

export default App;
