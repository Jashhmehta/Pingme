import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Client/Pages/Login.jsx";
import ProtectRoute from "./Client/Components/Auth/ProtectRoute.jsx";
import { LayoutLoader } from "./Client/Components/Layout/Loaders.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "../src/socket.jsx";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./Client/Redux/reducers/auth.js";
import { client_url } from "./constants/config.js";
const Home = lazy(() => import("./Client/Pages/Home.jsx"));
const Chat = lazy(() => import("./Client/Pages/Chat.jsx"));
const Groups = lazy(() => import("./Client/Pages/Groups.jsx"));
const NotFound = lazy(() => import("./Client/Pages/NotFound.jsx"));
const Dashboard = lazy(() => import("./Client/Pages/Admin/Dashboard.jsx"));
const AdminLogin = lazy(() => import("./Client/Pages/Admin/AdminLogin.jsx"));
const UserManagement = lazy(() =>
  import("./Client/Pages/Admin/UserManagement.jsx")
);
const ChatManagement = lazy(() =>
  import("./Client/Pages/Admin/ChatManagement.jsx")
);
const MessageManagement = lazy(() =>
  import("./Client/Pages/Admin/MessageManagement.jsx")
);

function App() {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${client_url}/api/v1/user/profile`, {
        withCredentials: true,
      })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center " />
    </BrowserRouter>
  );
}

export default App;
