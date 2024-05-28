import React, { memo } from "react";
import { Link } from "../Styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
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
    <Link to={`/chat/${_id}` }
    onContextmenu={(e)=>handleDeleteChatOpen(e,_id,groupChat)}>
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
        {
          isOnline && (
            <Box sx={{
              width:"10px",
              height:"10px",
              borderRadius:"50%",
              backgroundColor:"green",
              position:"absolute",
              top:"50%",
              right:"1rem",
              transform:"translateY(-50%)",
            }}>

            </Box>
          )
        }
      </div>
    </Link>
  );
};

export default memo(ChatItem);
