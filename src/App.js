import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import Customers from "./components/Customers";
import User from "./components/User";
import EditUser from "./components/EditUser";
import CustomerSignup from "./components/CustomerSignup";
import { createContext, useState } from "react";
import CustomerLogin from "./components/CustomerLogin";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  return (
    <Appstate.Provider value={{ login, setLogin }}>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/signup"
            element={<CustomerSignup></CustomerSignup>}
          ></Route>
          {!login && (
            <Route
              path="/login"
              element={<CustomerLogin></CustomerLogin>}
            ></Route>
          )}
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/user" element={<User></User>}></Route>
          <Route path="/customers" element={<Customers></Customers>}></Route>
          <Route path="/user/edit/:id" element={<EditUser></EditUser>}></Route>
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
