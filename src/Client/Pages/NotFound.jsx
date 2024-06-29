import { Error } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
      }}
    >
      <Stack>
        <Error />
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">Page not found</Typography>
        <Link to="/">Go back to home page</Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
