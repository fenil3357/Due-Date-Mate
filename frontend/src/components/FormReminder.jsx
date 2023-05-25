import React, { useState, useEffect} from "react";
import { TextField, Button } from "@material-ui/core";
import dayjs from "dayjs";
import axios from "axios";
import "../styles/form_reminder.css";
import { useNavigate } from "react-router-dom";
import { token, faculty } from "../config/user";
import { BASE_API_URL } from "../config/api";

const FormReminder = () => {
  const navigate = useNavigate();
  const now = dayjs();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formLink, setFormLink] = useState("");
  const [ResponseSheetLink, setResponseSheetLink] = useState("");
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
      formLink,
      facultyEmail : faculty.email,
      responseLink : ResponseSheetLink,
      deadline : datetime,
    };

    if (name === "" || description === "" || reqData.deadline === "" || formLink === "" || ResponseSheetLink==="") {
      setError("Please provide all fields!");
      setLoading(false);
      return;
    }

    await axios
      .post(BASE_API_URL + "reminder/create-form", reqData, {
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
          alert(JSON.stringify(res.data.form));
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
    <div className="formDiv">
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
          <TextField
            type="text"
            className="inp1"
            variant="outlined"
            label="Form Link"
            name="formlink"
            value={formLink}
            onChange={(event) => setFormLink(event.target.value)}
            disabled={loading}
          />
          <TextField
            type="text"
            className="inp1"
            variant="outlined"
            label="Response Sheet Link"
            name="responsesheet"
            value={ResponseSheetLink}
            onChange={(event) => setResponseSheetLink(event.target.value)}
            disabled={loading}
          />

          <input
            type="datetime-local"
            value={(datetime || "").toString().substring(0, 16)}
            onChange={handleChange}
            minDate={now}
            disabled={loading}
          />

          
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={onCreateHandler}
            disabled={loading}
          >
            Create
          </Button>
          {error === "" ? <></> : <p className="err">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default FormReminder;
