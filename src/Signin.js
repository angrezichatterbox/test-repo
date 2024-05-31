import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const callAPI = async (email, password) => {
    const statusDisplay = document.getElementById("status-display");
    const response = await fetch("http://localhost:9000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 200) {
      statusDisplay.textContent = "Login Successful!";
      alert("You are logged in");
      navigate("/home"); 
    } else if (response.status === 403) {
      statusDisplay.textContent = "Invalid Credentials!";
    } else {
      statusDisplay.textContent = `Server Error: ${await response.text()}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    callAPI(email, password);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <form onSubmit={handleSubmit} style={{ padding: "20px", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "grey" }}>
        <h2 style={{ marginBottom: "20px" }}>Login</h2>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email_input" style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            required
            id="email_input"
            name="email"
            type="email"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password_input" style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input
            required
            id="password_input"
            name="password"
            type="password"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px" }}>Log in</button>
        <div id="status-display" style={{ marginTop: "15px", color: "red" }}></div>
      </form>
    </div>
  );
};

export default Login;