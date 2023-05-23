import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import "../styles/form_reminder.css"
const FormReminder = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formLink, setFormLink] = useState("");
  const [ResponseSheetLink, setResponseSheetLink] = useState("");
  const [deadline, setDeadline] = useState("");

  const now = dayjs();
  const handleDeadlineChange = (dateTime) => {
    setDeadline(dateTime);
  };
  const onCreateHandler = async(event) => {
    event.preventDefault();

    const reminderData = {
      name,
      description,
      formLink,
      ResponseSheetLink,
      deadline,
    };

    try {
      const response = await axios.post("/form-reminder", reminderData);
      console.log("Reminder created successfully:", response.data);
    } catch (error) {
      console.error("Error in creating reminder:", error);
    }
  };
  return (
    <div className="formDiv">
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
        <TextField
          type="text"
          className="inp1"
          variant="outlined"
          label="Form Link"
          name="formlink"
          value={formLink}
          onChange={(event) => setFormLink(event.target.value)}
        />
        <TextField
          type="text"
          className="inp1"
          variant="outlined"
          label="Response Sheet Link"
          name="responsesheet"
          value={ResponseSheetLink}
          onChange={(event) => setResponseSheetLink(event.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Deadline"
            inputFormat="dd/MM/yyyy HH:mm"
            fullWidth
            autoOk
            minDate={now}
            value={deadline}
            onChange={handleDeadlineChange}
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
export default FormReminder;
