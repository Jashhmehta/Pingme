import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../Shared/UserItem";
import { sampleUsers } from "../../../constants/sampleData";

const Search = () => {
  const search = useInputValidation("");
  const addFriendHandler=(id)=>{
    console.log(id)
  }
  let isLoadingSendFriendRequest = false;
  const [users, setUsers]=useState(sampleUsers)
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find Chats</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <List>
          {
            users.map((i)=>(
              <UserItem user={i} key={i._id}  handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
