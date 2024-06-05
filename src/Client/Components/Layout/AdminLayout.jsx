import { Close, Dashboard, Group, ManageAccounts, Message } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Menu as MenuIcon,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";



const adminTabs=[{
  name:"Dashboard",
  path:"/admin/dashboard",
  icon:<Dashboard />
},
{name:"User",
path:"/admin/user-management",
icon:<ManageAccounts />
},
{name:"Chat",
path:"/admin/chat-management",
icon:<Group />
},
{name:"Message",
path:"/admin/messages",
icon:<Message />
},]

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        PingMe
      </Typography>
      <Stack spacing={"1rem"}>
       {
        adminTabs.map((tab)=>(
          <Link key={tab.path} to={tab.path}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            {tab.icon}
            <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        
        ))
       } 

      </Stack>
    </Stack>
  );
};
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#f5f5f5" }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
