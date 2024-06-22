/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Header from "./Header";
import Title from "../Shared/Title";
import { Grid, Skeleton } from "@mui/material";
import Chatlist from "../Specific/Chatlist";
import { samplechats } from "../../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../Specific/Profile";
import { useMyChatsQuery } from "../../Redux/API/api";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };
    return (
      <>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            bgcolor="primary.main"
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
