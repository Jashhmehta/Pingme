import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { startTransition, Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExists } from "../../Redux/reducers/auth";
import { setIsNotification, setIsSearch } from "../../Redux/reducers/misc";
import NewGroup from "../Specific/NewGroup";

const SearchDialog = React.lazy(() => import("../Specific/Search"));
const NotificationDialog = React.lazy(() =>
  import("../Specific/Notifications")
);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const { isSearch, isNotification } = useSelector((state) => state.misc);

  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleMobile = () => {
    setMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
  };

  const navigateToGroup = () => {
    startTransition(() => {
      navigate("/groups");
    });
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      dispatch(userNotExists());
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";

      toast.error(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#25D366",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              PingMe
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
