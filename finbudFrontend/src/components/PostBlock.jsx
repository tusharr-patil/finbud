import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Avatar from "@mui/material/Avatar";
import { Box, Button, CardContent, Grid, Link, List, ListItem} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import ViewProfile from "./ViewProfile";
import UserDetailsApi from "../apis/UserDetailsApi";
import ToastContext from "../contexts/ToastContext";
import {AddOrRemovePostIdToSaveList} from "../apis/SaveUnSave";
import PostMoreOptions from "./PostMoreOptions";
import DeletePostApi from "../apis/DeletePost";
import { GetUserIdApi } from "../apis/GetUserIdApi";

export default function PostBlock(props) {
  const [save, setSave] = useState(props?.post?.isSaved ? false : true);
  const [openViewProfile, setOpenViewProfile] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [open, setOpen] = useState(false);

  function handleViewProfileToOpen() {
    setOpenViewProfile(true);
  }

  function handleViewProfileCancel() {
    setOpenViewProfile(false);
  }

  async function SetUserDetails() {
    const userDetails = await UserDetailsApi(props?.post?.userId);
    setUserDetails(userDetails);
    const userId = await GetUserIdApi(); 
    if(userId === props?.post?.userId) {
      setShowDelete(true);
    }
  }

  const snackBar = useContext(ToastContext);

  async function saveUnsave() {
    if (save) {
      AddOrRemovePostIdToSaveList(props?.post?.postId);
      setSave(false);
      snackBar("Post saved successfully", "success");
    } else {
      AddOrRemovePostIdToSaveList(props?.post?.postId);
      setSave(true);
      snackBar("Post unsaved successfully", "success");
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deletePost() {
    DeletePostApi(props?.post?.postId);
    setOpen(false);
    snackBar("Post deleted successfully", "error");
  }

  function share() {

  }

  useEffect(() => {
    SetUserDetails();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          height: "80%",
          width: "60%",
          marginTop: "15px",
          boxShadow: "1px 1px 10px -3px rgba(0,0,0,0.75)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              onClick={handleViewProfileToOpen}
              sx={{ bgcolor: "#d9d9d9" }}
              aria-label="recipe"
              src={userDetails.avatar}
            />
          }
          action={
            <IconButton aria-label="settings">
              <PostMoreOptions
                showDelete={showDelete}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                handleDeletePost={deletePost}
                open={open}
                postIds={props?.post?.postId}
                saveUnsave={saveUnsave}
                share={share}
                save={save}
              />
            </IconButton>
          }
          title={
            <Link
              size="small"
              style={{ textDecoration: "none", color: "#000000" }}
              //   onClick={handleViewProfileToOpen}
            >
              {/* {mainUser[0] === undefined ? "" : mainUser[0].name} */}
              {userDetails.firstName}
            </Link>
          }
          subheader={
            <span style={{ color: "#000000" }}>{props.post?.timeSince}</span>
          }
        />
        <CardContent>
          <ViewProfile
            userDetails={userDetails}
            openViewProfile={openViewProfile}
            handleViewProfileCancel={handleViewProfileCancel}
            handleViewProfileToOpen={handleViewProfileToOpen}
          />
        </CardContent>
        <CardContent>
          <Card.Title>Project Name</Card.Title>
          <Card.Text>{props?.post?.content}</Card.Text>
        </CardContent>
        <Grid container>
          <Grid lg={6} style={{ textAlign: "center" }}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <List sx={{ pt: 0 }}>
                <ListItem>
                  {save ? (
                    <Button style={{ color: "#00000" }} onClick={saveUnsave}>
                      {" "}
                      <BookmarkBorderIcon style={{ marginRight: "20px" }} />
                      Save
                    </Button>
                  ) : (
                    <Button style={{ color: "#00000" }} onClick={saveUnsave}>
                      {" "}
                      <BookmarkIcon style={{ marginRight: "20px" }} />
                      UnSave
                    </Button>
                  )}
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid lg={6}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <List sx={{ pt: 0 }}>
                <ListItem>
                  <Button style={{ color: "#00000" }} onClick={share}>
                    <ShareOutlinedIcon style={{ marginRight: "20px" }} />
                    Share
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
