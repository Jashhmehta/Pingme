import { KeyboardBackspace } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "../Components/Styles/StyledComponents";
import AvatarCard from "../Components/Shared/AvatarCard"
const Groups = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const IconButtons = (
    <>
      <Tooltip titlee="back">
        <IconButton
          sx={{
            position: "absolute",
            left: "2rem",
            top: "2rem",
            bgcolor: "black",
            color: "white",
            ":hover": "rgba(0,0,0,0.7)",
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid item sm={4} bgcolor={"bisque"}>
        <GroupsList />
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
        {IconButtons}
      </Grid>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => {
  <Stack>
    {myGroups.length > 0 ? (
      myGroups.map((group) => {})
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>;
};
const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link>
      <Stack>
        <AvatarCard avatar={avatar}/>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};
export default Groups;
