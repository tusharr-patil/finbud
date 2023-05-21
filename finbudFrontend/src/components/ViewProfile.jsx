import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


export default function ViewProfile({
  userDetails,
  openViewProfile,
  handleViewProfileCancel,
}) {
  
  return (
    <>
      <Dialog open={openViewProfile} onClose={handleViewProfileCancel}>
        <DialogTitle>{"User Profile"}</DialogTitle>
        <DialogContent>Name: {userDetails.name}</DialogContent>
        <DialogContent>Email: {userDetails.email}</DialogContent>
        <DialogContent>About: {userDetails.about}</DialogContent>
        <DialogContent>College: {userDetails.college}</DialogContent>
        <DialogContent>Website: {userDetails.website}</DialogContent>
        <DialogContent>Github: {userDetails.github}</DialogContent>
        <DialogContent>Twitter: {userDetails.twitter}</DialogContent>
        <DialogContent>LinkedIn: {userDetails.linkedIn}</DialogContent>
        {/* <DialogContent>
            Email: {mainUser[0] === undefined ? "" : mainUser[0].email}
          </DialogContent>
          <DialogContent>
            About: {mainUser[0] === undefined ? "" : mainUser[0].about}
          </DialogContent>
          <DialogContent>
            Linkedin: {mainUser[0] === undefined ? "" : mainUser[0].linkedin}
          </DialogContent>
          <DialogContent>
            College: {mainUser[0] === undefined ? "" : mainUser[0].college}
          </DialogContent>
          <DialogContent>
            Website: {mainUser[0] === undefined ? "" : mainUser[0].website}
          </DialogContent>
          <DialogContent>
            Github: {mainUser[0] === undefined ? "" : mainUser[0].github}
          </DialogContent>
          <DialogContent>
            Twitter: {mainUser[0] === undefined ? "" : mainUser[0].twitter}
          </DialogContent>
          <DialogContent>
            Technical Skills:{" "}
          </DialogContent> */}
        {/* <DialogContent>Github: {currentUser.linkedin}</DialogContent> */}
        <DialogActions>
          <Button onClick={handleViewProfileCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
