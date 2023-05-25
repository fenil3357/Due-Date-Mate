import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import dayjs from "dayjs";
import axios from "axios";
import "../styles/event_reminder.css";
import { token, faculty } from "../config/user";
import { BASE_API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

const EventReminder = () => {
  const now = dayjs();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [datetime, setDatetime] = useState("")

  function handleChange(ev) {
    if (!ev.target['validity'].valid) return;
    const dt= ev.target['value'] + ':00Z';
    setDatetime(dt);
  }

  const onCreateHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const reqData = {
      name,
      description,
      deadline : datetime,
      facultyEmail: faculty.email,
    };

    if (name === "" || description === "" || reqData.deadline === "") {
      setError("Please provide all fields!");
      setLoading(false);
      return;
    }

    await axios
      .post(BASE_API_URL + "reminder/create-event", reqData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === false) {
          console.log(res.data.Error);
          setError(res.data.Error);
          setLoading(false);
        } else {
          alert(JSON.stringify(res.data.event));
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err);
      });
  };

  useEffect(
    (e) => {
      if (localStorage.getItem("accessToken") === null) {
        navigate("/login");
      }
    },
    [loading, navigate, error]
  );

  return (
    <div className="eventDiv">
      <div className="formContainer">
        <form>
          <TextField
            type="text"
            className="inp1"
            variant="outlined"
            label="Reminder name"
            name="remname"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={loading}
          />
          <TextField
            type="text"
            className="inp1"
            variant="outlined"
            label="Reminder description"
            name="remdes"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={loading}
          />

          <input
            type="datetime-local"
            value={(datetime || "").toString().substring(0, 16)}
            onChange={handleChange}
            minDate={now}
          />

          {error === "" ? <></> : <p className="err">{error}</p>}

          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={onCreateHandler}
            disabled={loading}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EventReminder;
