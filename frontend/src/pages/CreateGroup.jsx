import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import "../styles/CreateGroup.css";

const CreateGroup = () => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/create-group", { text });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="root">
      <h3>Create New Group</h3>
      <TextField
        className="inputField"
        label="Enter group name"
        variant="outlined"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Create
      </Button>
    </div>
  );
};

export default CreateGroup;
