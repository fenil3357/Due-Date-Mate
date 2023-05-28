import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import "../styles/form_reminder.css";
import { useNavigate } from "react-router-dom";
import { token, faculty } from "../config/user";
import { BASE_API_URL } from "../config/api";

const ForwardReminder = ({ onClose }) => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      const reqData = {
        facultyEmail: faculty.email,
      };

      await axios
        .post(BASE_API_URL + "group/get-all", reqData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.status === false) {
            console.log(res.data.Error);
          } else {
            setGroups(res.data.groups);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadGroups();
  }, []);

  const handleCheckboxChange = (event, group) => {
    if (event.target.checked) {
      setSelectedGroups([...selectedGroups, group]);
    } else {
      setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
    }
  };

  const handleSendButtonClick = () => {
    console.log("Selected groups:", selectedGroups);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="forwardReminderContainer">
      <div className="forward-message ">
        <span class="forward-icon">&#10140;</span>
        <span class="forward-text">Send Reminder to Groups</span>
        <Button className="cross-button" onClick={onClose}>
          &#10005;
        </Button>
      </div>
      <div className="searchBarContainer">
        <TextField
          fullWidth
          variant="outlined"
          label="Search Groups"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="groupContainer">
        {filteredGroups.map((group) => (
          <Grid item xs={12} key={group.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedGroups.some((g) => g.id === group.id)}
                  onChange={(event) => handleCheckboxChange(event, group)}
                />
              }
              label={group.name}
            />
          </Grid>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendButtonClick}
          disabled={selectedGroups.length === 0}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

const FormReminder = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formLink, setFormLink] = useState("");
  const [ResponseSheetLink, setResponseSheetLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [datetime, setDatetime] = useState("");
  const [showForwardReminder, setShowForwardReminder] = useState(false);

  function handleChange(ev) {
    if (!ev.target["validity"].valid) return;
    const dt = ev.target["value"] + ":00Z";
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
      facultyEmail: faculty.email,
      responseLink: ResponseSheetLink,
      deadline: datetime,
    };

    if (
      name === "" ||
      description === "" ||
      reqData.deadline === "" ||
      formLink === "" ||
      ResponseSheetLink === ""
    ) {
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
          setLoading(false);
          setShowForwardReminder(true);
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

  const handleCrossButtonClick = () => {
    setShowForwardReminder(false);
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const minute = String(currentDate.getMinutes()).padStart(2, "0");
  const currentDateTime = `${year}-${month}-${day}T${hour}:${minute}`;

  return (
    <div className="formReminderContainer">
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
              disabled={loading || showForwardReminder}
            />
            <TextField
              type="text"
              className="inp1"
              variant="outlined"
              label="Reminder description"
              name="remdes"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={loading || showForwardReminder}
            />
            <TextField
              type="text"
              className="inp1"
              variant="outlined"
              label="Form Link"
              name="formlink"
              value={formLink}
              onChange={(event) => setFormLink(event.target.value)}
              disabled={loading || showForwardReminder}
            />
            <TextField
              type="text"
              className="inp1"
              variant="outlined"
              label="Response Sheet Link"
              name="responsesheet"
              value={ResponseSheetLink}
              onChange={(event) => setResponseSheetLink(event.target.value)}
              disabled={loading || showForwardReminder}
            />

            <input
              type="datetime-local"
              className="formDate"
              value={(datetime || "").toString().substring(0, 16)}
              onChange={handleChange}
              min={currentDateTime}
              disabled={loading || showForwardReminder}
            />

            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={onCreateHandler}
              disabled={loading || showForwardReminder}
            >
              Create
            </Button>
            {error === "" ? null : <p className="err">{error}</p>}
          </form>
        </div>
      </div>
      <div>
        {showForwardReminder && (
          <ForwardReminder onClose={handleCrossButtonClick} />
        )}
      </div>
    </div>
  );
};

const FormReminderPage = () => {
  return (
    <div>
      <FormReminder />
    </div>
  );
};

export default FormReminderPage;
