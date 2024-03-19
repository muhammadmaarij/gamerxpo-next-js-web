import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password1: password1,
          password2: password2,
        }),
      });

      if (response.ok) {
        console.log("Signup successful");
        // Redirect to login or other appropriate action
      } else {
        const errorResponse = await response.json();
        console.log("Signup failed:", errorResponse);
        alert("Username already exists");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      // Show network error to user
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="image-container">
          <img
            src="/gamebg.jpg"
            alt="GamerXpo Sign Up"
            className="logo-image"
          />
          <div className="image-overlay">
            <p className="image-text">Join GamerXpo</p>
            <Button onClick={handleGoogleLogin} className="image-button">
              Log In
            </Button>
          </div>
        </div>
        <div className="parent-div">
          <p className="sub-heading">Create your account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="input-field"
            />
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
            />
            <InputField
              type="password"
              id="password1"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
            <InputField
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
              className="input-field"
            />
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="btn-primary">
                Sign Up
              </Button>
              <Button onClick={handleGoogleLogin} className="btn-secondary">
                <FontAwesomeIcon icon={faGoogle} className="mr-2 fa-icon" />
                Sign Up with Google
              </Button>
            </div>
            <div className="last-div">
              <a href="/login" className="text-2">
                Already have an account? Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default Signup;
