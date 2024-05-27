import React from "react";
import { Link } from "../Styles/StyledComponents";
import { Stack, Typography } from "@mui/material";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  lastMessage,
  groupChat = false,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link to={`/chat/${_id}`}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          borderBottom: "1px solid #fofofo",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Stack>
          <Typography>{name}</Typography>
          {newMessage && <Typography>{newMessage.count}New Message</Typography>}
        </Stack>
      </div>
    </Link>
  );
};

export default ChatItem;
