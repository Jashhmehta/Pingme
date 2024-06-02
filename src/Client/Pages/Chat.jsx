import React, { useRef } from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../Components/Styles/StyledComponents";
const Chat = () => {
  const containerRef = useRef(null);
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"green"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      ></Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton>
            <AttachFile />
          </IconButton>
          <InputBox placeholder="Type your message here"/>
          <IconButton type="submit" sx={{
            backgroundColor:"blue",
            color:"white",
            marginLeft:"1rem",
            padding:"0.5rem",
            "&:hover":{
              bgcolor:"error.dark"
            }
          }}>
            <Send />
          </IconButton>
        </Stack>
      </form>
    </>
  );
};
export default AppLayout()(Chat);
