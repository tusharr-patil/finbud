import React, { useContext, useState } from "react";

// frontend imports
import {
  Button,
  Container,
  Fab,
  Modal,
  Tooltip,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import StepperIcons from "./StepperIcon";
import ClearIcon from "@mui/icons-material/Clear";
import ToastContext from "../contexts/ToastContext";
import CreatePostApi from "../apis/CreatePostApi";
import { GetUserIdApi } from "../apis/GetUserIdApi";

const fab = {
  position: "fixed",
  bottom: 20,
  right: 20
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
  margin: "auto"
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
    "My Experties",
    "Benefits"
  ];

  const divStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "30px"
  };

  const backButtonStyle = {
    marginRight: "20px",
    color: "black",
    borderColor: "#0063cc",
    "&:hover": {
      color: "black",
      borderColor: "#262626"
    },
    width: "100px"
  };

  const nextButtonStyle = {
    backgroundColor: "black",
    borderColor: "#0063cc",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
      borderColor: "black"
    },
    width: "100px"
  };

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

  function handleChange(event) {
    const value = event.target.value;
    const type = event.target.id;

    setPost((prevPost) => ({
      ...prevPost,
      [type]: value
    }));
  }

  async function handleSubmit() {
    setOpen(false);
    console.log("HandleSubmit");
    post.userId = await GetUserIdApi();
    CreatePostApi(post);
    console.log(post);
    setPost((prevPost) => ({}));
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setActiveStep(0);
    setOpen(true);
  }

  return (
    <>
      <>
        <Tooltip
          title="Create Buddy Request"
          aria-label="add"
          onClick={() => handleOpen()}
        >
          <Fab color="primary" style={fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
        <Modal open={open}>
          <Container style={container}>
            <DialogTitle style={{ display: "flex", alignItems: "center" }}>
              {"Create Buddy Request"}
            </DialogTitle>
            <ClearIcon
              style={{ float: "right;" }}
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </ClearIcon>
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    sx={{ color: "black" }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    {steps.map((step, index) => {
                      const labelProps = {};
                      const stepProps = {};
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step stepProps={stepProps}>
                          <StepLabel
                            StepIconComponent={StepperIcons}
                            style={{ color: "black" }}
                            labelProps={labelProps}
                          >
                            {step}
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
                <div
                  container
                  style={{ borderLeft: "solid 1px", width: "100%" }}
                >
                  {activeStep === 0 ? (
                    <div style={{ margin: "2rem" }}>
                      <h1>Project Name</h1>
                      <TextField
                        onChange={handleChange}
                        value={post?.projectName}
                        autoFocus
                        margin="dense"
                        id="project"
                        label="Project Name"
                        multiline
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {activeStep === 1 ? (
                    <div style={{ margin: "2rem" }}>
                      <h1>I'm Working on</h1>
                      <TextField
                        onChange={handleChange}
                        value={post?.description}
                        autoFocus
                        margin="dense"
                        id="description"
                        label="I'm working on"
                        multiline
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {activeStep === 2 ? (
                    <div style={{ margin: "2rem" }}>
                      <h1>Requirements</h1>
                      <TextField
                        onChange={handleChange}
                        value={post?.requirements}
                        autoFocus
                        margin="dense"
                        id="requirements"
                        label="Requirements"
                        multiline
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {activeStep === 3 ? (
                    <div style={{ margin: "2rem" }}>
                      <h1>My Experties</h1>
                      <TextField
                        onChange={handleChange}
                        value={post?.experience}
                        autoFocus
                        margin="dense"
                        id="experience"
                        label="My expertise"
                        multiline
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  {activeStep === 4 ? (
                    <div style={{ margin: "2rem" }}>
                      <h1>Benefits</h1>
                      <TextField
                        onChange={handleChange}
                        value={post?.benefits}
                        autoFocus
                        margin="dense"
                        id="benefits"
                        label="Benefits"
                        multiline
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div style={divStyle}>
                <Button
                  onClick={() => {
                    handleBack();
                  }}
                  sx={backButtonStyle}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  sx={nextButtonStyle}
                  onClick={() => {
                    activeStep === steps.length - 1
                      ? handleSubmit()
                      : handleNext();
                  }}
                >
                  {activeStep >= steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </>
          </Container>
        </Modal>
      </>
    </>
  );
}
