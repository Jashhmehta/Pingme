import { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import {client_url} from "../src/constants/config.js"
const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io(client_url, { withCredentials: true }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
