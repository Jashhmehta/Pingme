import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
const Header = () => {
  const handleMobile = () => {
    console.log("Mobile");
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
                <MenuIcon></MenuIcon>
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }} 
            />

            <Box>
            <IconButton color="inherit" size="large" onClick={handleMobile} />

            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
