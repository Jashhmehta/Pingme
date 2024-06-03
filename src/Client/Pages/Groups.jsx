import { Done, Edit, KeyboardBackspace } from "@mui/icons-material";
import {
  Avatar,
  ButtonGroup,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../Components/Styles/StyledComponents";
import AvatarCard from "../Components/Shared/AvatarCard";
import { samplechats } from "../../constants/sampleData";

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const navigateBack = () => {
    navigate("/");
  };
  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  useEffect(() => {
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit("false");
    };
  }, [chatId]);
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

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup=
  <Stack direction={{
    sm:"row",
    sx:"column-reverse",
  }}
  spacing={"1rem"}
  p={{
  sm:"1rem",
  xs:"0",
  md:"1rem 4rem"
  }}>

  </Stack>;
  return (
    <Grid container height={"100vh"}>
      <Grid item sm={4} bgcolor={"bisque"}>
        <GroupsList myGroups={samplechats} chatId={chatId} />
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
        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>
            <Stack maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              sm:"1rem",
              xs:"0",
              md:"1rem 4rem",
            }}
            spacing={"2rem"}
            bgcolor={"blueviolet"}
            height={"50vh"}
            overflow={"auto"}>
              
            {/**Members */}

            </Stack>
            
          </>
        )}
      </Grid>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};
export default Groups;
