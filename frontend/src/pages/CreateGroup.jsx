import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import "../styles/create_group.css";
import "../styles/navbar.css";
import Navbar from "../components/Navbar";
import "../styles/add_students.css"
const AddStudents = ({ onClose }) => {
  const [students, setStudents] = useState([
    {
      name: "",
      enroll: "",
      mobile: "",
      email: "",
    },
  ]);
  const handleSubmit = async () => {
    try {
      const studentData = students.map((student) => ({
        name: student.name,
        enroll: student.enroll,
        mobile: student.mobile,
        email: student.email,
      }));
      const response = await axios.post("/add-students", studentData);
      console.log("API response:", response.data);
      setStudents([
        {
          name: "",
          enroll: "",
          mobile: "",
          email: "",
        },
      ]);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleChange = (index, event) => {
    const updatedStudents = [...students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [event.target.name]: event.target.value,
    };
    setStudents(updatedStudents);
  };
  const addButtonHandler = () => {
    let newInputfields = { name: "", enroll: "", mobile: "", email: "" };
    setStudents([...students, newInputfields]);
  };

  return (
    <div>
      <div className="forward-message">
        <span className="forward-icon">&#10140;</span>
        <span className="forward-text">Add Students to Groups</span>
        <Button className="cross-button" onClick={onClose}>
          &#10005;
        </Button>
      </div>
      {/* <h1 className="heading">Add Students</h1> */}
      <form onSubmit={handleSubmit}>
        {students.map((student, index) => {
          return (
            <div key={index} className="inputFieldsContainer">
              <TextField
                type="text"
                className="inp1"
                variant="outlined"
                name="name"
                label="Student name"
                value={student.name}
                onChange={(event) => handleChange(index, event)}
              />
              <TextField
                type="number"
                className="inp1"
                variant="outlined"
                label="Enrollment number"
                name="enroll"
                value={student.enroll}
                onChange={(event) => handleChange(index, event)}
              />
              <TextField
                type="number"
                className="inp1"
                variant="outlined"
                label="Mobile number"
                name="mobile"
                value={student.mobile}
                onChange={(event) => handleChange(index, event)}
              />
              <TextField
                type="email"
                className="inp1"
                variant="outlined"
                label="Email Id"
                name="email"
                value={student.email}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          );
        })}

        <Button
          className="AddBtn"
          variant="contained"
          color="primary"
          onClick={addButtonHandler}
        >
          Add
        </Button>
        <Button
          className="SubBtn"
          variant="contained"
          color="Primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

const CreateGroup = () => {
  const [text, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const handleCrossButtonClick = () => {
    setShowAddStudents(false);
    setIsButtonDisabled(false);
  };
  const handleSubmit = async () => {
    try {
    
      setIsButtonDisabled(true);
      setShowAddStudents(true);
      const response = await axios.post("/create-group", { text });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="root">
      <div className="nav">
        <Navbar />
      </div>
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
        disabled={isButtonDisabled || text===""}
      >
        Create
      </Button>
      <div>
        { showAddStudents && (
          <AddStudents onClose={handleCrossButtonClick} />
        )}
      </div>
    </div>
  );
};

const createGroupStudents = () => {
  return <CreateGroup />;
};
export default createGroupStudents;
