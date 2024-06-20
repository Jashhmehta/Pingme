import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt } from "@mui/icons-material";
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
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../Components/Styles/StyledComponents";
import { userExists } from "../Redux/reducers/auth";
import { usernameValidator } from "../Utils/validators";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single");
  const dispath = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispath(userExists(true));
      toast.success(data.message);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";

      toast.error(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispath(userExists(true));
      toast.success(data.message);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";

      toast.error(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    }
  };
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
          {isLogin ? (
            <>
              <Typography variant="h3">Login</Typography>
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleLogin}
              >
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
              <form
                style={{ width: "100%", marginTop: "1rem" }}
                onSubmit={handleSignup}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  {avatar.error && (
                    <Typography color="error" variant="caption">
                      {avatar.error}
                    </Typography>
                  )}

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
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
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

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

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

                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

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
    </div>
  );
};
