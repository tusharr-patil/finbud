// React imports
import React from "react";

// frontend imports
import { AppBar, Box, Hidden, Toolbar, Typography } from "@mui/material";
import NavbarProfileAvatar from "./NavbarProfileAvatar";
// import { useStyles } from "./HeaderStyles";

export default function Navbar({ handleDrawerOpen }) {
//   const classes = useStyles();

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#010100" }}>
      <Toolbar>
        <Typography variant="h6">
          {"FINBUD"}
        </Typography>
        <Hidden smDown>
          <Box style={{ display: "flex" }}>
            <NavbarProfileAvatar />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box style={{ display: "flex" }}>
            <NavbarProfileAvatar />
          </Box>
        </Hidden> 
      </Toolbar>
    </AppBar>
  );
}
