import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import "../styles/signin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Convert username and password to JSON
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        console.log("Login successful:", data);
        // Handle successful login here (e.g., redirect, store tokens, etc.)
      } else {
        console.error("Login failed:", data.detail);
        // Handle login failure here (e.g., show an error message)
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors here
    }
  };
  const handleGoogleLogin = () => {
    // Redirect the user to your backend endpoint that handles Google OAuth
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };
  return (
    <div className="container">
      <div className="form-container">
        <div className="image-container">
          <img
            src="/gamebg.jpg" // Make sure this is the correct path
            alt="Your Image Description"
            className="logo-image"
          />
          <div className="image-overlay">
            <p className="image-text">Welcome to GamerXpo</p>
            <Button onClick={handleGoogleLogin} className="image-button">
              Sign Up
            </Button>
          </div>
        </div>
        <p className="sub-heading">Sign In or Create an account</p>
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
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
          />
          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleSubmit}
              type="submit"
              className="btn-primary"
            >
              Login
            </Button>
            <Button onClick={handleGoogleLogin} className="btn-secondary">
              <FontAwesomeIcon icon={faGoogle} className="mr-2 fa-icon " />
              Login with Google
            </Button>
          </div>
          <div className="last-div">
            <a href="/forgot-password" className="text-2">
              Forgot your username or password?
            </a>
            <a href="/signup" className="text-2">
              New to GamerXpo? Sign Up Now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
