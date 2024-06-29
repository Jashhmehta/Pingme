import { Menu, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../Redux/reducers/misc";

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };
  const { isDeleteMenu } = useSelector((state) => state.misc);
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteOptionAnchor}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
      >
        Delete chat
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
