import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Client/Pages/Login";
import ProtectRoute from "./Client/Components/Auth/ProtectRoute";
import { LayoutLoader } from "./Client/Components/Layout/Loaders";
import AdminLogin from "./Client/Pages/Admin/AdminLogin";
import Dashboard from "./Client/Pages/Admin/Dashboard";

const Home = lazy(() => import("./Client/Pages/Home"));
const Chat = lazy(() => import("./Client/Pages/Chat"));
const Groups = lazy(() => import("./Client/Pages/Groups"));
const NotFound = lazy(() => import("./Client/Pages/NotFound"));

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

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
