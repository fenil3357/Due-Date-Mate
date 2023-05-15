import React from "react";
import { TextField, Button } from "@material-ui/core";
import "../styles/login.css";
// import { useEffect } from "react";

const Login = () => {
  // useEffect(() => {}, );
  return (
    <div className="container">
      <h2>Login</h2>
      <TextField
        id="outlined-basic"
        label="Email Address"
        variant="outlined"
        className="inp"
        type="email"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        className="inp"
        type="password"
      />

      <div>
        <Button variant="outlined" className="btn">
          Login
        </Button>
        <a href="/signup">
          <Button variant="outlined" className="btn">
            Signup
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Login;
