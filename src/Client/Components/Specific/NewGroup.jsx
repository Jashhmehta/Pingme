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
import { useInputValidation } from "6pp";
const NewGroup = () => {
  const groupName=useInputValidation();
  const selectMemberHandler = () => {};
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center "} variant="h4">
          New Group
        </DialogTitle>
        <TextField
        label="Group Name"
        value={groupName.value}
        onChange={groupName.changeHandler}


        
        
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {sampleUsers.map((i) => (
            <UserItem user={i} key={i._id} handler={selectMemberHandler} />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="text">Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
