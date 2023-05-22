import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import "../styles/EventReminder.css"

const EventReminder = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleDeadlineChange = (dateTime) => {
    setDeadline(dateTime);
  };

  const now = dayjs();

  const onCreateHandler = async (event) => {
    event.preventDefault();

    const reminderData = {
      name,
      description,
      deadline,
    };

    try {
      const response = await axios.post("/event-reminder", reminderData);
      console.log("Reminder created successfully:", response.data);
    } catch (error) {
      console.error("Error in creating reminder:", error);
    }
  };

  return (
    <div className="eventDiv">
      <div className="formContainer">
      <form onSubmit={onCreateHandler}>
        <TextField
          type="text"
          className="inp1"
          variant="outlined"
          label="Reminder name"
          name="remname"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          type="text"
          className="inp1"
          variant="outlined"
          label="Reminder description"
          name="remdes"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Deadline"
            inputFormat="dd/MM/yyyy HH:mm"
            fullWidth
            autoOk
            value={deadline}
            onChange={handleDeadlineChange}
            minDate={now}
          />
        </LocalizationProvider>
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={onCreateHandler}
        >
          Create
        </Button>
      </form>
      </div>
    </div>
  );
};

export default EventReminder;
