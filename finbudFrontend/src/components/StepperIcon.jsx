/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Diversity3Icon from "@mui/icons-material/Diversity3";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const StepperIcons = (props) => {
  const { active, completed, className } = props;

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 35,
    height: 35,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, black 0%, black 50%, black 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, black 0%, black 50%, black 100%)"
    })
  }));

  const icons = {
    1: <LaptopMacIcon fontSize="small" />,
    2: <ArchitectureIcon fontSize="small" />,
    3: <AssignmentIcon fontSize="small" />,
    4: <AutoGraphIcon fontSize="small" />,
    5: <Diversity3Icon fontSize="small" />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

StepperIcons.propTypes = {
  active: PropTypes.string,
  completed: PropTypes.string,
  className: PropTypes.string
};

StepperIcons.defaultProps = {
  active: "",
  completed: "",
  className: ""
};

export default StepperIcons;
