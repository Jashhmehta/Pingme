import { createContext, useMemo, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io("http://localhost:3001", { withCredentials: true }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
