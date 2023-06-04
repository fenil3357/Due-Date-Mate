import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import "../styles/create_group.css";
import Navbar from "../components/Navbar";
import "../styles/add_students.css";
import { token, faculty } from "../config/user";
import { BASE_API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

const AddStudents = ({ groupId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    {
      name: "",
      enNumber: 0,
      email: "",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    for (let i = 0; i < students.length; i++) {
      if (
        students[i].name === "" ||
        students[i].enNumber === "0" ||
        students[i].enNumber === 0 ||
        students[i].email === ""
      ) {
        setError("Please provide all fields!");
        setLoading(false);
        return;
      }
    }

    const reqData = {
      groupId: groupId,
      facultyEmail: faculty.email,
      students: students,
    };

    await axios
      .post(BASE_API_URL + "group/add-students", reqData, {
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
          alert(JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(err);
      });
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
    let newInputfields = {
      name: "",
      enNumber: 0,
      email: "",
    };
    setStudents([...students, newInputfields]);
  };

  useEffect(
    (e) => {
      if (localStorage.getItem("accessToken") === null) {
        navigate("/login");
      }
    },
    [loading, error, navigate]
  );

  return (
    <div>
      <div className="forward-message">
        <span className="forward-icon">&#10140;</span>
        <span className="forward-text">Add Students to Groups</span>
      </div>
      {/* <h1 className="heading">Add Students</h1> */}
      <form onSubmit={handleSubmit}>
        {students.map((student, index) => {
          return (
            <div key={index} className="inputFieldsContainer">
              <center>
                <h3>Add student details</h3>
              </center>
              <TextField
                type="text"
                className="inp1"
                variant="outlined"
                name="name"
                label="Student name"
                value={student.name}
                onChange={(event) => handleChange(index, event)}
                disabled={loading}
              />
              <TextField
                type="number"
                className="inp1"
                variant="outlined"
                label="Enrollment number"
                name="enNumber"
                value={student.enNumber}
                onChange={(event) => handleChange(index, event)}
                disabled={loading}
              />
              <TextField
                type="email"
                className="inp1"
                variant="outlined"
                label="Email Id"
                name="email"
                value={student.email}
                onChange={(event) => handleChange(index, event)}
                disabled={loading}
              />
            </div>
          );
        })}

        <Button
          className="AddBtn"
          variant="contained"
          color="primary"
          onClick={addButtonHandler}
          disabled={loading}
        >
          Add
        </Button>
        {error === "" ? <></> : <p className="err">{error}</p>}
        <Button
          className="SubBtn"
          variant="contained"
          color="Primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groupId, setGroupId] = useState("");
  const navigate = useNavigate();

  // const handleCrossButtonClick = () => {
  //   setShowAddStudents(false);
  //   setIsButtonDisabled(false);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const reqData = {
      name: name,
      facultyEmail: faculty.email,
    };

    if (name === "" || reqData.facultyEmail === undefined) {
      setError("Please provide a group name");
      setLoading(false);
      return;
    }

    await axios
      .post(BASE_API_URL + "group/create-group", reqData, {
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
          setShowAddStudents(true);
          setIsButtonDisabled(true);
          setGroupId(res.data.group.id);
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
    [loading, error, navigate]
  );

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
        onChange={(e) => setName(e.target.value)}
        disabled={loading || setIsButtonDisabled}
      />
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading || isButtonDisabled || name === ""}
      >
        Create
      </Button>
      {error === "" ? <></> : <p className="err">{error}</p>}
      <div>{showAddStudents && <AddStudents groupId={groupId} />}</div>
    </div>
  );
};

const createGroupStudents = () => {
  return <CreateGroup />;
};
export default createGroupStudents;
