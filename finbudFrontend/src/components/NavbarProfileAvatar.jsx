import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ListItem, Menu, MenuItem } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import EditProfile from "./EditProfile.jsx";
import SignOutApi from "../apis/SignOutApi.js";

function NavbarProfileAvatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    SignOutApi().then(() => {
      navigate("/");
    });
  };

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<MenuIcon style={{ color: "white" }} />}
      ></Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          component={ListItem}
          onClick={handleClose}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#282828"
          }}
        >
          <ListItem>
            <EditProfile />
          </ListItem>
          <ListItem>
            <Button onClick={handleSignOut}>
              <LogoutIcon />
              &nbsp; Sign Out
            </Button>
          </ListItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default NavbarProfileAvatar;