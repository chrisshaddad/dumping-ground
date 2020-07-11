import React from "react";
import  TextField from "@material-ui/core/TextField";

const CustomTextField = ({ fullWidth = true, ...rest }) =>  <TextField fullWidth {...rest} />;

export default CustomTextField;
