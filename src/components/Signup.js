import React, { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../firebase/firebaseConfigApp";
import { customersTable } from "../firebase/firebaseConfigApp";
import { addDoc } from "firebase/firestore";

const auth = getAuth(app);
const Signup = () => {
  const [signupdata, setSignupdata] = useState({
    email: "",
    password: "",
    mobile: "",
  });

  const [OTP, setOTP] = useState();
  const [OTPStatus, setOTPStatus] = useState(false);

  const handleSignup = async () => {
    console.log(signupdata);
  };

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      auth
    );
  };

  const requestOtp = () => {
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${signupdata.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP Sent");
        setOTPStatus(true);
      })
      .catch((error) => {
        console.log("OTP Not Sent" + error);
      });
  };

  const uploadCustomerToDB = async () => {
    await addDoc(customersTable, { signupdata });
  };

  const verifyOTP = () => {
    try {
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadCustomerToDB();
        console.log("User uploaded, registration successful!");
        //navigate('/login')
      });
    } catch (error) {
      console.log("Error while registration " + error);
    }
  };

  return (
    <div className="container w-25 p-3 padding-x-lg bg-dark text-light ">
      {OTPStatus ? (
        <div>
          <label className="form-label">OTP</label>
          <input
            type="number"
            className="form-control"
            id="number"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-success my-3"
            onClick={verifyOTP}
          >
            Confirm OTP
          </button>
        </div>
      ) : (
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) =>
              setSignupdata({ ...signupdata, email: e.target.value })
            }
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) =>
              setSignupdata({ ...signupdata, password: e.target.value })
            }
          />
          <label className="form-label">Mobile Number</label>
          <input
            type="number"
            className="form-control"
            id="mobile"
            onChange={(e) =>
              setSignupdata({ ...signupdata, mobile: e.target.value })
            }
          />
          <button
            type="button"
            className="btn btn-success my-3"
            onClick={requestOtp}
          >
            Request OTP / Signup
          </button>
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
