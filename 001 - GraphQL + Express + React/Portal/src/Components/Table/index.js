import React, { Fragment } from "react";
import {
  Grid,
  Table as MUITable,
  TableBody,
  TableHead,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  tableTitle: {
    color: theme.palette.primary.main,
  },
}));

function Table(props) {
  const { title } = props;
  const classes = useStyles()
  return (
    <Grid container>
      {title && (
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.tableTitle}>{title}</Typography>
        </Grid>
      )} 
      <Grid item xs={12}>

      </Grid>
    </Grid>
  );
}

Table.propTypes = {
  title: PropTypes.string,
};

export default Table;
