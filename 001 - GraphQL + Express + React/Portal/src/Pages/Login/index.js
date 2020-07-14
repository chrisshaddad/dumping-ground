import React, { Fragment, useEffect, useContext, useState } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { Constants } from "../../Utils";
import {
  Grid,
  Container,
  Paper,
  Button,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
} from "@material-ui/core";
import { LockOutlined, ReportProblemOutlined } from "@material-ui/icons";
import { lime } from "@material-ui/core/colors";
import { CustomTextField } from "../../Components";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import API from "../../Utils/Network";

import styles from "./styles.module.css";

//Using multiple implementation of styles just for showcasing :)
//Focusing on makeStyles as it is the main method of styling for material ui
//Ofcourse all styles can be exported to different files in case we need more modularity
const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: "auto",
  },
  signInHeader: {
    marginBottom: 15,
  },
  gridSpacing: {
    marginBottom: 10,
  },
}));

function LoginPage() {
  const globalContext = useContext(GlobalContext);
  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.LOGIN_PAGE)
      globalContext.currentPage.set(Constants.pageTags.LOGIN_PAGE);
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const classes = useStyles();

  const handleSignInClick = (event) => {
    
  };

  return (
    <Fragment>
      <Container maxWidth="xs" className={styles.loginPageContainer}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={styles.loginDialogContainer}
        >
          <Grid item xs={12}>
            <Paper elevation={3} className={styles.loginDialog}>
              <Grid container>
                <Grid item xs={12} className={classes.gridSpacing}>
                  <Avatar className={classes.avatar}>
                    <LockOutlined />
                  </Avatar>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={`text-align-center ${classes.signInHeader}`}
                >
                  <Typography variant="h5">Sign in</Typography>
                </Grid>
                <form className={styles.loginForm}>
                  <Grid item xs={12} className={classes.gridSpacing}>
                    <CustomTextField label="Username" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} className={classes.gridSpacing}>
                    <CustomTextField
                      label="Password"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} className={styles.loginButtonContainer}>
                    <Tooltip
                      title={
                        <Fragment>
                          <span>
                            Use Admin as username and password to sign in
                          </span>
                          <br />
                          <br />
                          <span>Anything else to see the error popup :)</span>
                        </Fragment>
                      }
                    >
                      <span>
                        <IconButton disabled>
                          <ReportProblemOutlined />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={(event) => handleSignInClick(event)}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
          Invalid Credentials!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default LoginPage;
