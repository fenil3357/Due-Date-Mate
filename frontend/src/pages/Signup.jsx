import React from "react";
import { TextField, Button } from "@material-ui/core";
import "../styles/login.css";

const Signup = () => {
  return (
    <div className="container">
      <h2>Sign Up</h2>
      <TextField
        id="outlined-basic"
        label="Full Name"
        variant="outlined"
        className="inp"
        type="text"
      />
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
          Signup
        </Button>
        <a href="/login">
          <Button variant="outlined" className="btn">
            Login
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Signup;
