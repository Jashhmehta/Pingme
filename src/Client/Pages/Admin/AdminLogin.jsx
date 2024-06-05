import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { Navigate } from "react-router-dom";

const isAdmin=true;
const AdminLogin = () => {
  const secretKey = useInputValidation("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit");
  };
  if(isAdmin) return <Navigate to="/admin/dashboard"/>;
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom right, navy, purple)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "30px",
          }}
        >
          
            <Typography variant="h3">Admin Login</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={submitHandler}
            >
              <TextField
                required
                fullWidth
                label="Secret Key"
                margin="normal"
                type="password"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
              ></TextField>

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </form>
          
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
