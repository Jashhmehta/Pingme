import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../../constants/sampleData";
import UserItem from "../Shared/UserItem";
const NewGroup = () => {
  const selectMemberHandler = () => {};
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"}>
        <DialogTitle>New Group</DialogTitle>
        <TextField />
        <Typography>Members</Typography>
        <Stack>
          {sampleUsers.map((i) => (
            <UserItem user={i} key={i._id} handler={selectMemberHandler} />
          ))}
        </Stack>
        <Stack direction={"row"}>
          <Button variant="text" color="error">Cancel</Button>
          <Button variant="contained">Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
