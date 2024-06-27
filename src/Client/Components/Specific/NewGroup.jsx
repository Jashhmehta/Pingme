import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../../constants/sampleData";
import UserItem from "../Shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../Hooks/hook";
import { setIsNewGroup } from "../../Redux/reducers/misc";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../Redux/API/api";
import toast from "react-hot-toast";
const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, isLoading, data, error } = useAvailableFriendsQuery();

  const [selectedmembers, setSelectedMembers] = useState([]);
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);
  const groupName = useInputValidation();
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedmembers.length < 2)
      return toast.error("Please select atleast 3 members");
    newGroup("Creating new group",{ name: groupName.value, members: selectedmembers });
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
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
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedmembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="text" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="text"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
