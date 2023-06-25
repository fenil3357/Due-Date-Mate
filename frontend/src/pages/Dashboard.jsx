import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { styled } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../config/api";
import {token, faculty} from "../config/user"

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 700,
  color: theme.palette.text.primary,
}));

const Dashboard = () => {
  document.title = "Dashboard";
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  const loadGroups = async () => {

    const reqData = {
      facultyEmail: faculty.email,
    };

    await axios
      .post(
        BASE_API_URL + "group/get-all",
        reqData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === false) {
          console.log(res.data.Error)
        } else {
          setGroups(res.data.groups);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect((e) => {
    if (localStorage.getItem("accessToken") === null || localStorage.getItem("faculty") === null) {
      navigate("/login");
    }
    else {
      loadGroups();
    }
  }, [navigate]);

  return (
    <div className="dash">
      <div className="nav">
        <Navbar />
      </div>
      <div className="content">
        <div className="tab">
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            {groups.map((group) => {
              return (<StyledPaper
                key={group.id}
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
                className="bx"
              >
                <Grid container wrap="nowrap" spacing={2} className="grd">
                  <Grid item>
                    <Avatar>{(group.name[0] + group.name[1]).toUpperCase()}</Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography className="tpy" component={'span'}>
                      <h4>{group.name}</h4>
                    </Typography>
                  </Grid>
                </Grid>
              </StyledPaper>)
            })}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
