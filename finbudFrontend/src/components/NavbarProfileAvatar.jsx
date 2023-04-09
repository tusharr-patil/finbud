import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  getIconButtonUtilityClass,
  ListItem,
  Menu,
  MenuItem
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
// import { useStyles } from "./HeaderStyle";
import EditProfile from "./EditProfile.jsx";
import SignOutApi from "../apis/SignOutApi.js";



function NavbarProfileAvatar() {
  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [mainUser, setMainUser] = useState([]);
  // const uid = GetUserId();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // async function getUserAvatar() {
  //   await GetUserDetails({ setMainUser: setMainUser, uid: uid });
  // }

  const navigate = useNavigate();
  // getUserAvatar();

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={
          <MenuIcon
            style={{ color: "white" }}
            // src={mainUser[0] === undefined ? "" : mainUser[0].img}
            // className={classes.navAvatar}
          ></MenuIcon>
        }
      ></Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // style={{ backgroundColor: "#282828" }}
      >
        <MenuItem
          component={ListItem}
          onClick={handleClose}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#282828"
            // justifyContent: 'left'
          }}
        >
          <ListItem>
            <EditProfile />
          </ListItem>
          <ListItem>
            <Button
              onClick={(event) => {
                event.preventDefault();
                SignOutApi()
                  .then(navigate("/"))
              }}
            >
              <LogoutIcon />
              &nbsp; Sign Out
            </Button>
          </ListItem>
          {/* <MyProfile /> */}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default NavbarProfileAvatar;
