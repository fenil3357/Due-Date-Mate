import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import FormReminder from "../components/EventReminder";
import EventReminder from "../components/FormReminder";
import "../styles/set_reminder.css";

const SetReminder = () => {
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(true);
  };

  const handleButton1Click = () => {
    setSelectedButton("form");
    setOpen(false);
  };

  const handleButton2Click = () => {
    setSelectedButton("event");
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen(); // Call handleClickOpen on component mount
  }, []);

  return (
    <div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <p>Which Type of reminder you want to create?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleButton1Click} color="primary">
              Event Reminder (forall)
            </Button>
            <Button onClick={handleButton2Click} color="primary">
              Form Reminder
            </Button>
          </DialogActions>
        </Dialog>
        {selectedButton === "form" && <FormReminder />}
        {selectedButton === "event" && <EventReminder />}
      </div>
    </div>
  );
};

export default SetReminder;
