import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFeedback("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let responseData;
    setSubmitting(true);
    await fetch("https://backend-ovfj.onrender.com/login", {
      method: "POST",
      headers: {
        accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      setFeedback(responseData.errors || "Unable to log you in right now.");
      setFeedbackType("error");
    }
    setSubmitting(false);
  };

  const signup = async () => {
    let responseData;
    setSubmitting(true);
    await fetch("https://backend-ovfj.onrender.com/signup", {
      method: "POST",
      headers: {
        accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      setFeedback(responseData.errors || "Unable to create your account right now.");
      setFeedbackType("error");
    }
    setSubmitting(false);
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="loginsignup-aside">
          <span className="loginsignup-kicker">Shopper account</span>
          <h2>{state === "Login" ? "Welcome back to a cleaner shopping flow." : "Create your account and shop with confidence."}</h2>
          <p>
            Save your cart, manage checkout faster, and keep your favorites synced across devices.
          </p>
          <div className="loginsignup-highlights">
            <div>
              <strong>Fast checkout</strong>
              <span>Persist your cart and continue without losing selected items.</span>
            </div>
            <div>
              <strong>Protected actions</strong>
              <span>Clearer confirmation, cleaner account access, and better shopping continuity.</span>
            </div>
          </div>
        </div>
        <div className="loginsignup-panel">
          <div className="loginsignup-panel-top">
            <span className="loginsignup-panel-label">{state}</span>
            <h3>{state === "Login" ? "Access your account" : "Start your account"}</h3>
          </div>
          <div className="loginsignup-fields">
            {state === "Sign Up" ? (
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Full name"
              />
            ) : null}
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email address"
            />
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder="Password"
            />
          </div>
          {feedback ? (
            <div className={`loginsignup-feedback ${feedbackType}`}>
              {feedback}
            </div>
          ) : null}
          <button
            disabled={submitting}
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
          >
            {submitting ? "Please wait..." : state === "Login" ? "Continue to account" : "Create account"}
          </button>
          {state === "Sign Up" ? (
            <p className="loginsignup-login">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("Login");
                  setFeedback("");
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="loginsignup-login">
              New to Shopper?{" "}
              <span
                onClick={() => {
                  setState("Sign Up");
                  setFeedback("");
                }}
              >
                Create an account
              </span>
            </p>
          )}
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use and privacy policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
