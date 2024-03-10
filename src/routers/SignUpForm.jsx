import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./SignUpForm.css";

import axios from "axios";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (input) => {
    // Username must contain both alphabets and numbers
    const alphabetRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;

    const hasAlphabet = alphabetRegex.test(input);
    const hasNumber = numberRegex.test(input);

    return hasAlphabet && hasNumber;
  };

  const validatePhoneNumber = (input) => {
    const regex = /^\d{10}$/;
    return regex.test(input);
  };

  const validatePassword = (input) => {
    const alphabetRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[^a-zA-Z0-9]/g;

    const hasAlphabet = alphabetRegex.test(input);
    const hasNumber = numberRegex.test(input);
    const specialCharacters = input.match(specialCharacterRegex);

    return hasAlphabet && hasNumber && specialCharacters && specialCharacters.length >= 3;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameError("");
    setPhoneNumberError("");
    setPasswordError("");

    if (!validateUsername(username)) {
      setUsernameError("Username must contain both alphabets and numbers.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError("Phone number should be 10 digits.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password should contain alphabets, numbers, and at least 3 special characters.");
      return;
    }

    const formData = {
      username,
      email,
      phoneNumber,
      password,
    };

    axios
      .post("http://localhost:6969/SignUpForm", formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage(`Account created successfully for ${username}!`);
        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/"); // Navigate to the home page
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSwitchForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="signup-form-container">
      {showLoginForm ? (
        <LoginForm />
      ) : (
        <>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <div className="error-message">{usernameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number: </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneNumberError && <div className="error-message">{phoneNumberError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <button type="submit">Submit</button>
          </form>
          <br />
        </>
      )}
      <div>
        {showLoginForm ? (
          <p>
            Don't have an account?{" "}
            <Link to="#" onClick={handleSwitchForm}>
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Have an account?{" "}
            <Link to="#" onClick={handleSwitchForm}>
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
