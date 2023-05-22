// React imports
import React from "react";

// frontend imports
import { AppBar, Box, Hidden, Toolbar, Typography } from "@mui/material";
import NavbarProfileAvatar from "./NavbarProfileAvatar";

const Navbar = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: "#010100" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {"FINBUD"}
        </Typography>
        <Hidden smUp>
          <Box style={{ display: "flex" }}>
            <NavbarProfileAvatar />
          </Box>
        </Hidden>
        <Hidden smDown>
          <Box style={{ display: "flex" }}>
            <NavbarProfileAvatar />
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;