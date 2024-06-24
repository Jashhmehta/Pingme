import React, { Fragment, useRef, useState } from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../Components/Styles/StyledComponents";
import FileMenu from "../Components/Dialogs/FileMenu";
import { sampleMessage } from "../../constants/sampleData";
import MessageComponent from "../Components/Shared/MessageComponent";
import { useSocket } from "../../socket";
import { NEW_MESSAGE } from "../../constants/events";
import { useChatDetailsQuery } from "../Redux/API/api";
const user = {
  _id: "340224",
  name: "Jash",
};
const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const socket = useSocket();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const [message, setMessage] = useState("");
  const members = chatDetails?.data?.chat?.members;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
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
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFile />
          </IconButton>
          <InputBox
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: "blue",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};
export default AppLayout()(Chat);
