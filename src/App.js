import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Client/Pages/Login";
import ProtectRoute from "./Client/Components/Auth/ProtectRoute";
import { LayoutLoader } from "./Client/Components/Layout/Loaders";
const Home = lazy(() => import("./Client/Pages/Home"));
const Chat = lazy(() => import("./Client/Pages/Chat"));
const Groups = lazy(() => import("./Client/Pages/Groups"));
const NotFound = lazy(() => import("./Client/Pages/NotFound"));
const Dashboard = lazy(() => import("./Client/Pages/Admin/Dashboard"));
const AdminLogin = lazy(() => import("./Client/Pages/Admin/AdminLogin"));
const UserManagement = lazy(() =>
  import("./Client/Pages/Admin/UserManagement")
);
const ChatManagement = lazy(() =>
  import("./Client/Pages/Admin/ChatManagement")
);
const MessageManagement = lazy(() =>
  import("./Client/Pages/Admin/MessageManagement")
);

let user = true;
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
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
    </BrowserRouter>
  );
}

export default App;
