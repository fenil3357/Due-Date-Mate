import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "../styles/grid.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 700,
  color: theme.palette.text.primary,
}));

export default function AutoGridNoWrap() {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: "auto",
          p: 2,
        }}
        className="bx"
      >
        <Grid container wrap="nowrap" spacing={2} className="grd">
          <Grid item>
            <Avatar>BE</Avatar>
          </Grid>
          <Grid item xs>
            <Typography className="tpy">
              <h4>BE SEM 6 IT</h4>
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
}
