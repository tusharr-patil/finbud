import React, { useState } from "react";

// frontend imports
import { Box, Button, ListItem, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogContentText } from "@mui/material";

// page imports
// import { useStyles } from "./HeaderStyle";

function PostMoreOptions({
  showDelete,
  handleClickOpen,
  handleClose,
  handleDeletePost,
  open,
  postIds,
  saveUnsave,
  share,
  save
}) {
  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOnClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <ListItem
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        // startIcon={<MoreVertIcon className={classes.navAvatar}></MoreVertIcon>}
      >
        {" "}
        <MoreVertIcon style={{ color: "#000000" }} />
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOnClose}
        sx={{ backgroudColor: "#282828" }}
      >
        <MenuItem
          component={ListItem}
          onClick={handleOnClose}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroudColor: "#282828"
          }}
        >
          <ListItem style={{ backgroudColor: "#282828" }}>
            {save ? (
              <Button onClick={saveUnsave}>
                {" "}
                <BookmarkBorderIcon style={{ marginRight: "20px" }} />
                Save
              </Button>
            ) : (
              <Button onClick={saveUnsave}>
                {" "}
                <BookmarkIcon style={{ marginRight: "20px" }} />
                UnSave
              </Button>
            )}
          </ListItem>
          {/* <ListItem>
            <Button onClick={share}>
              <ShareOutlinedIcon style={{ marginRight: "20px" }} />
              Share
            </Button>
          </ListItem> */}
          <ListItem>
            {showDelete ? (
              <div>
                <Button onClick={handleClickOpen}>
                  <DeleteIcon style={{ marginRight: "20px" }} />
                  Delete
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{"Delete this post"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure want to delete?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDeletePost} autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              ""
            )}
          </ListItem>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default PostMoreOptions;
