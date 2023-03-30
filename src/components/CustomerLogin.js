import React, { useContext, useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { customersTable } from "../firebase/firebaseConfigApp";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(loginForm.email);
    console.log(loginForm.password);
  }, [loginForm]);

  const performLogin = async () => {
    try {
      const queryOutput = query(
        customersTable,
        where("email", "==", loginForm.email)
      );
      const rowResult = await getDocs(queryOutput);
      rowResult.forEach((dataFromTable) => {
        const data = dataFromTable.data();
        //if (loginForm.password == data.password) {
        if (bcrypt.compareSync(loginForm.password, data.password)) {
          useAppstate.setLogin(true); //Passed this state to App.js
          console.log("Login successful!!");
          navigate("/customers");
        } else {
          console.log("Invalid Creds!!");
        }
      });
    } catch (error) {
      console.log("Error while login: " + error);
    }
  };

  return (
    <div className="container w-25 p-3 padding-x-lg bg-dark text-light ">
      <div className="mb-3">
        <label className="form-label">
          Email address (Applicable to Customers)
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
        />
        <button
          type="button"
          className="btn btn-success my-3"
          onClick={performLogin}
        >
          Login
        </button>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default CustomerLogin;
