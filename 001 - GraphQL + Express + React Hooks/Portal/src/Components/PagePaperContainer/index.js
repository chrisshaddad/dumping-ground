import React, { Fragment } from "react";
import {
  Paper,
  IconButton,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import { ArrowBack, Add } from "@material-ui/icons";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    [theme.breakpoints.only("xs")]: {
      margin: 0,
      borderRadius: 0,
    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: 7,
    },
    [theme.breakpoints.up("md")]: {
      margin: "10px 15px",
    },
    minHeight: "50vh",
  },
  childrenContainer: {
    padding: 10,
  },
  titleContainer: {
    padding: "10px 10px 0px 10px",
  },
  addActionContainer: {
    marginLeft: "auto",
  },
}));

function PagePaperContainer(props) {
  const { backAction, title, children, addAction } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Paper elevation={5} className={classes.paperRoot}>
        <Grid container>
          {backAction || addAction || title ? (
            <Grid item xs={12}>
              <Grid container className={classes.titleContainer}>
                {backAction && (
                  <Grid item>
                    <IconButton onClick={backAction}>
                      <ArrowBack />
                    </IconButton>
                  </Grid>
                )}
                {title && (
                  <Grid item>
                    <Typography variant="h4" component={"span"}>
                      {title}
                    </Typography>
                  </Grid>
                )}
                {addAction && (
                  <Grid item className={classes.addActionContainer}>
                    <IconButton onClick={addAction}>
                      <Add />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12} className={classes.childrenContainer}>
            {children}
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
}

PagePaperContainer.propTypes = {
  title: PropTypes.string,
  backAction: PropTypes.func,
};

export default PagePaperContainer;
