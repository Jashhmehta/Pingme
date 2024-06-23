import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  List,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../Shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../Redux/reducers/misc";
import { useLazySearchUserQuery } from "../../Redux/API/api";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser, { data: searchResults }] = useLazySearchUserQuery();
  const dispatch = useDispatch();
  const search = useInputValidation("");
  const addFriendHandler = (id) => {
    console.log(id);
  };
  const [users, setUsers] = useState([]);
  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
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
          {users.map((i) => (
            <UserItem user={i} key={i._id} handler={addFriendHandler} />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
