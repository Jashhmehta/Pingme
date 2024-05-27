import { Stack } from "@mui/material";
import React from "react";

const Chatlist = (
  { w = "100" ,
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      cout: 0,
    },
  ],
  handleDeleteChat
}) => {
  return <Stack width={w} direction={"column"}>
    { 
      chats?.map((data)=>{
        return <div>SD</div>
      })
    }
  </Stack>;
};

export default Chatlist;
