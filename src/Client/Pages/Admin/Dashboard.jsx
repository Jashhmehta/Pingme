import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { AdminPanelSettings, Notifications, Search } from "@mui/icons-material";
import moment from "moment/moment";
import {
  CurveButton,
  SearchField,
} from "../../Components/Styles/StyledComponents";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        margin: "2rem 0",

        borderRadius: "1rem",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"2rem"}
        p={"1rem"}
      >
        <AdminPanelSettings
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <Notifications />

      </Stack>
    </Paper>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>{Appbar}</Container>
    </AdminLayout>
  );
};

export default Dashboard;
