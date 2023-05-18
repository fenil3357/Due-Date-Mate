import React from "react";
import "../styles/dashboard.css";
import Navbar from "../components/Navbar";
import Tab from "../components/Tab";
import Grid from "../components/Grid"

const Dashboard = () => {
  return (
    <div className="dash">
    <div className="nav">
      <Navbar />
    </div>
      <div className="content">
        <div className="tab">
          {/* <Tab /> */}
          <Grid className="grid"/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
