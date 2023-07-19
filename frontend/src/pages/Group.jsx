import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@material-ui/core";
import { BASE_API_URL } from "../config/api";
import { faculty, token } from "../config/user";
import Navbar from "../components/Navbar";
import "../styles/navbar.css";
import "../styles/group.css";
import { useSearchParams } from "react-router-dom";

const Group = () => {
  // State variables
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventReminders, setEventReminders] = useState([]);
  const [formReminders, setFormReminders] = useState([]);
  const [toggle, setToggle] = useState(false);

  // Fetch event reminders from backend API
  const fetchEventReminders = async () => {
    try {
      const response = await axios.get(
        BASE_API_URL + "reminder/get-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body:{
            groupId: searchParams.get("id"),
            facultyEmail: faculty.email
          }
        }
      );
      setEventReminders(response.data.eventReminders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEventReminders();
  }, []);

  // Fetch form reminders from backend API
  const fetchFormReminders = async () => {
    try {
      const response = await axios.get(BASE_API_URL + "formReminders/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormReminders(response.data.formReminders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFormReminders();
  }, []);
  const onToggleHandler = () => {
    setToggle(!toggle);
  };
  return (
    <div className="group-container">
      <div className="nav">
        <Navbar />
      </div>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider" onClick={onToggleHandler}></span>
        </label>
        {/* If toggle is false, display text */}
        {!toggle && (
          <div className="toggle-text">Toggle to view Form Reminders</div>
        )}
        {/* If toggle is true, display text */}
        {toggle && (
          <div className="toggle-text">Toggle to view Event Reminders</div>
        )}
      </div>
      <div className="content-container">
        {/* If toggle is true, display form reminders */}
        {toggle && (
          <div className="formRemindersContainer">
            {/*  Map through form reminders and display them in cards */}
            {formReminders.map((formReminder) => (
              <Card className="formReminderCard">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Name : {formReminder.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Description : {formReminder.description}
                  </Typography>
                  <Typography color="textSecondary">
                    Form Link : {formReminder.formLink}
                  </Typography>
                  <Typography color="textSecondary">
                    Response Sheet Link : {formReminder.formType}
                  </Typography>
                  <Typography color="textSecondary">
                    Deadline : {formReminder.deadline}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {!toggle && (
          <div className="eventRemindersContainer">
            {eventReminders.map((eventReminder) => (
              <Card className="eventReminderCard">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Name : {eventReminder.name}
                  </Typography>
                  <Typography color="textSecondary">
                    Description : {eventReminder.description}
                  </Typography>
                  <Typography color="textSecondary">
                    Deadline : {eventReminder.deadline}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
