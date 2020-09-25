import React, { useContext, useEffect } from "react";
import { PagePaperContainer } from "../../Components";
import { useHistory } from "react-router-dom";
import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  FormControl,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GlobalContext from "../../Contexts/GlobalContext";
import { Constants } from "../../Utils";

function PortalSettings() {
  const history = useHistory();
  const globalContext = useContext(GlobalContext);
  const isDarkTheme = globalContext.globalTheme.get === Constants.themes.DARK;

  useEffect(() => {
    if (globalContext.currentPage.get !== Constants.pageTags.PORTAL_SETTINGS)
      globalContext.currentPage.set(Constants.pageTags.PORTAL_SETTINGS);
  });

  return (
    <PagePaperContainer
      title={"Portal Settings"}
      backAction={() => history.goBack()}
    >
      <Container maxWidth="sm">
        <Accordion elevation={4}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Interface Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container justify="center">
              <Grid item>
                <FormControl>
                  <FormLabel focused={false}>Dark Theme Switcher</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          checked={isDarkTheme}
                          onChange={() => {
                            globalContext.globalTheme.set(
                              isDarkTheme
                                ? Constants.themes.LIGHT
                                : Constants.themes.DARK
                            );
                          }}
                        />
                      }
                      label={isDarkTheme ? "ON" : "OFF"}
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </PagePaperContainer>
  );
}

export default PortalSettings;
