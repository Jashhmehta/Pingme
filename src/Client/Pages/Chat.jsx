import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../Components/Styles/StyledComponents";
import FileMenu from "../Components/Dialogs/FileMenu";
import { useInfiniteScrollTop } from "6pp";
import MessageComponent from "../Components/Shared/MessageComponent";
import { useSocket } from "../../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../Redux/API/api";
import { useErrors, useSocketEvents } from "../Hooks/hook";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../Redux/reducers/misc";
import { removeNewMessagesAlert } from "../Redux/reducers/chat";
import { TypingLoader } from "../Components/Layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const socket = useSocket();
  const bottomref = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setuserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [fileMenuAnchor, setIsFileMenuAnchor] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page: 1 });
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const dispatch = useDispatch();

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  useEffect(() => {
    if (bottomref.current)
      bottomref.current.scrollIntoView({
        behaviour: "smooth",
      });
  }, [messages]);
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  const members = chatDetails?.data?.chat?.members;
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setIsFileMenuAnchor(e.currentTarget);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setuserTyping(true);
    },
    [chatId]
  );

  const stopTypingHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setuserTyping(false);
    },
    [chatId]
  );

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  const alertHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "12df94i934r",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
  });
  const eventHandler = {
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingHandler,
    [STOP_TYPING]: stopTypingHandler,
    [ALERT]: alertHandler,
  };
  useSocketEvents(socket, eventHandler);
  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];
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
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        {userTyping && <TypingLoader />}

        <div ref={bottomref} />
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
            onClick={handleFileOpen}
          >
            <AttachFile />
          </IconButton>
          <InputBox
            placeholder="Type your message here"
            value={message}
            onChange={messageOnChange}
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
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};
export default AppLayout()(Chat);
