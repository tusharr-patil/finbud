import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Fab,
  Modal,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import ToastContext from "../contexts/ToastContext";
import CreatePostApi from "../apis/CreatePostApi";
import { GetUserIdApi } from "../apis/GetUserIdApi";

const fab = {
  position: "fixed",
  bottom: 20,
  right: 20,
};

const container = {
  width: "80%",
  height: "80%",
  backgroundColor: "white",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  borderRadius: "4px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
};

const closeButton = {
  position: "absolute",
  top: 10,
  right: 10,
  color: "#999",
};

const stepperContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "20px",
};

const stepContent = {
  margin: "2rem",
};

const backButtonStyle = {
  marginRight: "20px",
  color: "black",
  borderColor: "#0063cc",
  "&:hover": {
    color: "black",
    borderColor: "#262626",
  },
  width: "100px",
};

const nextButtonStyle = {
  backgroundColor: "black",
  borderColor: "#0063cc",
  "&:hover": {
    color: "white",
    backgroundColor: "black",
    borderColor: "black",
  },
  width: "100px",
};

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [skippedSteps, setSkippedSteps] = useState([]);

  const steps = [
    "Project Name",
    "I'm Working on",
    "Requirements",
    "My Expertise",
    "Benefits",
  ];

  const isStepSkipped = (step) => skippedSteps.includes(step);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  const snackBar = useContext(ToastContext);

  const handleChange = (event) => {
    const { value, id } = event.target;

    setPost((prevPost) => ({
      ...prevPost,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    setOpen(false);
    post.userId = await GetUserIdApi();
    CreatePostApi(post);
    setPost((prevPost) => ({}));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setActiveStep(0);
    setOpen(true);
  };

  return (
    <>
      <Tooltip
        title="Create Buddy Request"
        aria-label="add"
        onClick={handleOpen}
      >
        <Fab color="primary" style={fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
        <Container style={container}>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Create Buddy Request</Typography>
              <IconButton
                sx={closeButton}
                onClick={handleClose}
                aria-label="close"
              >
                <ClearIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <Box>
            <div style={stepperContainer}>
              <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                  const labelProps = {};
                  const stepProps = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={step} {...stepProps}>
                      <StepLabel
                        StepIconProps={{ active: true }}
                        {...labelProps}
                      >
                        {step}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            <div style={stepContent}>
              {activeStep === 0 && (
                <div>
                  <h1>Project Name</h1>
                  <TextField
                    onChange={handleChange}
                    value={post.projectName || ""}
                    autoFocus
                    margin="dense"
                    id="projectName"
                    label="Project Name"
                    multiline
                    fullWidth
                    variant="outlined"
                  />
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <h1>I'm Working on</h1>
                  <TextField
                    onChange={handleChange}
                    value={post.workingOn || ""}
                    autoFocus
                    margin="dense"
                    id="workingOn"
                    label="I'm working on"
                    multiline
                    fullWidth
                    variant="outlined"
                  />
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <h1>Requirements</h1>
                  <TextField
                    onChange={handleChange}
                    value={post.requirements || ""}
                    autoFocus
                    margin="dense"
                    id="requirements"
                    label="Requirements"
                    multiline
                    fullWidth
                    variant="outlined"
                  />
                </div>
              )}
              {activeStep === 3 && (
                <div>
                  <h1>My Expertise</h1>
                  <TextField
                    onChange={handleChange}
                    value={post.expertise || ""}
                    autoFocus
                    margin="dense"
                    id="expertise"
                    label="My expertise"
                    multiline
                    fullWidth
                    variant="outlined"
                  />
                </div>
              )}
              {activeStep === 4 && (
                <div>
                  <h1>Benefits</h1>
                  <TextField
                    onChange={handleChange}
                    value={post.benefits || ""}
                    autoFocus
                    margin="dense"
                    id="benefits"
                    label="Benefits"
                    multiline
                    fullWidth
                    variant="outlined"
                  />
                </div>
              )}
            </div>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <Button
                onClick={handleBack}
                sx={backButtonStyle}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={nextButtonStyle}
                onClick={
                  activeStep >= steps.length - 1 ? handleSubmit : handleNext
                }
              >
                {activeStep >= steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
