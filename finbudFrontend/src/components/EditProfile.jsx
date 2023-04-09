// React imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// frontend imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";

import {GetUserIdApi} from "../apis/GetUserIdApi.js";
import UserDetailsApi from "../apis/UserDetailsApi.js";
import UpdateUserData from "../apis/UpdateUserData.js";

function EditProfile() {
  const [open, setOpen] = useState(false);
  const [mainUser, setMainUser] = useState({});
  const navigate = useNavigate();

  async function getData() {
    const userId = await GetUserIdApi();
    const userDetails = await UserDetailsApi(userId);
    setMainUser(userDetails);
  }

  function handleToOpen() {
    setOpen(true);
    getData();
  }

  async function updateData() {
    UpdateUserData(mainUser);
    navigate("/home");
  }

  function handleEdit() {
    setOpen(false);
    updateData();
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <div style={{ paddingTop: "10px" }}>
      <Button color="primary" onClick={handleToOpen} startIcon={<EditIcon />}>
        Edit Profile
      </Button>   
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>
          <img src={mainUser.avatar} height="50px" width="50px" alt="img" />
          Edit Profile
        </DialogTitle>
        <hr style={{ width: "100%" }} />
        <DialogContent>
          {/* Email (CANNOT UPDATE)*/}
          <TextField
            value={mainUser === undefined ? "" : mainUser.email}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            multiline
            fullWidth
            disabled
            size="small"
            variant="outlined"
          />
          {/* name */}
          <TextField
            onChange={(e) => {
              mainUser.firstName = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.firstName}
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
          <br />
          {/* linkedin */}
          <TextField
            onChange={(e) => {
              mainUser.linkedIn = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.linkedIn}
            autoFocus
            margin="dense"
            id="linkedin"
            label="Linkedin"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button color="primary" onClick={handleEdit} autoFocus>
            Edit
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;
