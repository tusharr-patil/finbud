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
              mainUser.name = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
          <br />
          {/* about */}
          <TextField
            value={mainUser === undefined ? "" : mainUser.about}
            onChange={(e) => {
              mainUser.about = e.target.value;
              setMainUser({...mainUser});
            }}
            autoFocus
            margin="dense"
            id="about"
            label="About"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
          <br />
          {/* college */}
          <TextField
            onChange={(e) => {
              mainUser.college = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.college}
            autoFocus
            margin="dense"
            id="college"
            label="College"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
          <br />
          {/* website */}
          <TextField
            onChange={(e) => {
              mainUser.website = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.website}
            autoFocus
            margin="dense"
            id="website"
            label="Website"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
          <br />
          {/* github */}
          <TextField
            onChange={(e) => {
              mainUser.github = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.github}
            autoFocus
            margin="dense"
            id="github"
            label="Github"
            multiline
            fullWidth
            size="small"
            variant="outlined"
          />
          <br />
          {/* Twitter */}
          <TextField
            onChange={(e) => {
              mainUser.twitter = e.target.value;
              setMainUser({...mainUser});
            }}
            value={mainUser === undefined ? "" : mainUser.twitter}
            autoFocus
            margin="dense"
            id="twitter"
            label="Twitter"
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
