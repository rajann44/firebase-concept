import { addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { usersTable } from "../firebase/firebaseConfigApp";

const Register = () => {
  const [registerFormData, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async () => {
    console.log(registerFormData);
    try {
      await addDoc(usersTable, registerFormData);
      console.log("User Registered");
    } catch (error) {
      console.log("Error while Registration " + error);
    }
  };

  return (
    <div className="container w-50 p-3">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput0" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput0"
          placeholder="your name here"
          value={registerFormData.name}
          onChange={(e) =>
            setRegisterForm({ ...registerFormData, name: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={registerFormData.email}
          onChange={(e) =>
            setRegisterForm({ ...registerFormData, email: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput2"
          placeholder="secret password here"
          value={registerFormData.password}
          onChange={(e) =>
            setRegisterForm({ ...registerFormData, password: e.target.value })
          }
        />
      </div>
      <button onClick={registerUser} type="button" className="btn btn-success">
        Register
      </button>
    </div>
  );
};

export default Register;
