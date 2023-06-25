import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "../styles/login.css";
import axios from "axios";

const Login = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      formData.email === "" ||
      formData.password === ""
    ) {
      setError("Please provide all fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be atleast 6 characters long");
      setLoading(false);
      return;
    }

    await axios
      .post(BASE_API_URL + "auth/login", formData)
      .then((res) => {
        if (res.data.status === false) {
          setError(res.data.Error);
          setLoading(false);
        } else {
          localStorage.clear();
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("faculty", JSON.stringify(res.data.Faculty));
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect((e) => {
    if (localStorage.getItem("accessToken") !== null) {
      navigate("/dashboard");
    }
  }, [loading, error, navigate]);

  return (
    <div className="bodyContainer">
      <div className="container">
        <h2>Login</h2>
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          className="inp"
          type="email"
          name="email"
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className="inp"
          type="password"
          name="password"
          onChange={handleChange}
          disabled={loading}
        />

        <div>
          <Button variant="outlined" className="btn" onClick={handleSubmit} disabled={loading}>
            Login
          </Button>
          <a href="/signup">
            <Button variant="outlined" className="btn">
              Signup
            </Button>
          </a>
        </div>

        {error === "" ? <></> : <p className="err">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
