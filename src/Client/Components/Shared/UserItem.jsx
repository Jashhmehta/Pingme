import { Add, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { memo } from "react";

const UserItem = ({ user, handler, handlerIsLoading, isAdded=false, styling={} }) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src={avatar}/>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <IconButton size="small" sx={{bgcolor: isAdded? "error.main": "primary.main", color:"white", "&:hover":{
            bgcolor:"primary.dark",
        }}} onClick={() => handler(_id)} disabled={handlerIsLoading}>
          {
            isAdded?<RemoveIcon />:<Add />      
               }
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
