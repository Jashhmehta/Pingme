/* eslint-disable react-hooks/rules-of-hooks */
import { Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE,
  REFETCH_CHATS,
} from "../../../constants/events";
import { useSocket } from "../../../socket";
import { useErrors, useSocketEvents } from "../../Hooks/hook";
import { getorSaveFromStorage } from "../../Lib/Features";
import { useMyChatsQuery } from "../../Redux/API/api";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../Redux/reducers/chat";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../Redux/reducers/misc";
import DeleteChatMenu from "../Dialogs/DeleteChatMenu";
import Title from "../Shared/Title";
import Chatlist from "../Specific/Chatlist";
import Profile from "../Specific/Profile";
import Header from "./Header";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { newMessagesAlert } = useSelector((state) => state.chat);

    const dispatch = useDispatch();
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    const { user } = useSelector((state) => state.auth);
    useErrors([{ isError, error }]);

    useEffect(() => {
      getorSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);
    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ _id, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };
    const newMessageAlert = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestAlert = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlert,
      [NEW_REQUEST]: newRequestAlert,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE]: onlineUsersListener,
    };
    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteOptionAnchor={deleteMenuAnchor}
        />

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
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
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
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
