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
import { VisuallyHiddenInput } from "../Components/Styles/StyledComponents";
import { useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../Utils/validators";


export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name=useInputValidation("")
  const username=useInputValidation("", usernameValidator)
  const password=useStrongPassword()
  return (
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
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h3">Login</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              ></TextField>

              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
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
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button
                variant="text"
                fullWidth
                color="primary"
                type="submit"
                onClick={toggleLogin}
              >
                Register
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h3">Sign Up</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                />
              
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  bgcolor: "rgba(0,0,0,0.5)",
                  ":hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                }}
                component="label"
              >
                <>
                  <CameraAlt />
                  <VisuallyHiddenInput type="file" />
                </>
              </IconButton>
              </Stack>

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              ></TextField>

              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              ></TextField>

              {
                username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )
              }

              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                type="password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              ></TextField>

{
              password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )
              }

              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>

              <Button
                variant="text"
                fullWidth
                color="primary"
                type="submit"
                onClick={toggleLogin}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};
