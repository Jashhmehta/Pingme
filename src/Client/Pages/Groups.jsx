import { Grid } from "@mui/material";
import React from "react";

const Groups = () => {
  return (
    <Grid container height={"100vh"}>
      <Grid item sm={4} bgcolor={"bisque"}>
        Groups List
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 3rem",
          position: "relative",
        }}
      >
        {" "}
        Group Details
      </Grid>
    </Grid>
  );
};

export default Groups;
