import React from "react";
import { TextField, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

function CustomSelect({ fullWidth = true, helperText = " ", data, ...rest }) {
  return (
    <TextField select fullWidth={fullWidth} helperText={helperText} {...rest}>
      {data.map((d) => (
        <MenuItem key={d.key} value={d.key}>
          {d.value}
        </MenuItem>
      ))}
    </TextField>
  );
}

CustomSelect.propTypes = {
  data: PropTypes.array,
};

export default CustomSelect;
