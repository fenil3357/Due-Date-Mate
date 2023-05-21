import React, { useEffect } from "react";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import Grid from "../components/Grid"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect((e) => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login")
    }
  })
  return (
    <div className="dash">
      <div className="nav">
        <Navbar />
      </div>
      <div className="content">
        <div className="tab">
          <Grid className="grid" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
