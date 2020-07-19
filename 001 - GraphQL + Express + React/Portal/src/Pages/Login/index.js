import React, { Fragment, useEffect, useContext, useState } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import { useHistory } from "react-router-dom";
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
  Menu,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined, ReportProblemOutlined } from "@material-ui/icons";
import { lime } from "@material-ui/core/colors";
import { CustomTextField } from "../../Components";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import API from "../../Utils/Network";

import styles from "./styles.module.css";
import { object } from "prop-types";

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
  const history = useHistory();
  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.LOGIN_PAGE)
      globalContext.currentPage.set(Constants.pageTags.LOGIN_PAGE);
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loaderMenuAnchor, setLoaderMenuAnchor] = useState(null);
  const [isLoadingLocally, setIsLoadingLocally] = useState(false);

  const classes = useStyles();

  const handleSignInClick = (event) => {
    if (
      formData.username.toLowerCase() !== "admin" ||
      formData.password.toLowerCase() !== "admin"
    ) {
      setLoginError(true);
      setSnackbarMessage("Invalid Credentials!");
      setSnackbarOpen(true);
    } else setLoaderMenuAnchor(event.currentTarget);
  };

  const handleLoaderSelection = (loaderType) => {
    if (loaderType === "fullscreen") globalContext.showLoadingOverlay.set(true);
    else setIsLoadingLocally(true);
    setLoaderMenuAnchor(null);
    triggerLogin();
  };

  const triggerLogin = () => {
    API.login(formData.username, formData.password)
      .then((result) => {
        globalContext.showLoadingOverlay.set(false);
        setIsLoadingLocally(false);
        localStorage.setItem(Constants.localStorageVars.IS_AUTHENTICATED, true);
        document.body.className = "hide-background-image";
        history.push("/dashboard");
      })
      .catch((ex) => {
        setSnackbarMessage(
          "Possible timeout, double check if you started the expess server"
        );
        setSnackbarOpen(true);
        globalContext.showLoadingOverlay.set(false);
        setIsLoadingLocally(false);
      });
  };

  const handleFormDataChange = (value, field) => {
    setLoginError(false);
    let newFormData = Object.assign({}, formData);
    newFormData[field] = value;
    setFormData(newFormData);
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
                    <CustomTextField
                      label="Username"
                      variant="outlined"
                      error={loginError}
                      value={formData.username}
                      onChange={(event) =>
                        handleFormDataChange(event.target.value, "username")
                      }
                      disabled={isLoadingLocally}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridSpacing}>
                    <CustomTextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={loginError}
                      value={formData.password}
                      onChange={(event) =>
                        handleFormDataChange(event.target.value, "password")
                      }
                      disabled={isLoadingLocally}
                    />
                  </Grid>
                  <Grid item xs={12} className={styles.loginButtonContainer}>
                    <Tooltip
                      title={
                        <Fragment>
                          <span>
                            Use "admin" as username and password to sign in
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
                      variant={isLoadingLocally ? "text" : "contained"}
                      onClick={(event) => handleSignInClick(event)}
                      disabled={isLoadingLocally}
                    >
                      {isLoadingLocally ? (
                        <CircularProgress size={25} />
                      ) : (
                        "Sign In"
                      )}
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
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Menu
        anchorEl={loaderMenuAnchor}
        open={Boolean(loaderMenuAnchor)}
        onClose={() => setLoaderMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleLoaderSelection("fullscreen")}>
          Fullscreen Loader
        </MenuItem>
        <MenuItem onClick={() => handleLoaderSelection("local")}>
          Local Loader
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default LoginPage;
