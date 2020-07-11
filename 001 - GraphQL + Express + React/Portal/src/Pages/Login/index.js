import React, { Fragment, useEffect, useContext } from "react";
import { GlobalContext } from "../../App";
import { Constants } from "../../Utils";
import { Grid, Container, Paper, Button } from "@material-ui/core";
import { CustomTextField } from "../../Components";

import styles from "./styles.module.css";

function Login() {
  const globalContext = useContext(GlobalContext);
  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.LOGIN_PAGE)
      globalContext.currentPage.set(Constants.pageTags.LOGIN_PAGE);
  });

  return (
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
              <Grid item xs={12}>
                Sign In
              </Grid>
              <form className={styles.loginForm}>
                <Grid item xs={12}>
                  <CustomTextField label="Username" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField label="Password" type="password" variant="outlined" />
                </Grid>
                <Grid item xs={12} className={styles.loginButtonContainer}>
                  <Button color="primary" variant="contained">
                    Sign In
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
