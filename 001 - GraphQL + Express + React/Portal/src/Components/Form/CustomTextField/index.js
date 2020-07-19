import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomTextField = ({ fullWidth = true, helperText = " ", ...rest }) => (
  <TextField fullWidth={fullWidth} helperText={helperText} {...rest} />
);

export default CustomTextField;
