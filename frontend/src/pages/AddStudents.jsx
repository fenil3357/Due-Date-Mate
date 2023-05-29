import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import "../styles/add_students.css";
import Navbar from "../components/Navbar";
import "../styles/navbar.css";

const AddStudents = () => {
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
      <div className="nav">
        <Navbar />
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
export default AddStudents;
