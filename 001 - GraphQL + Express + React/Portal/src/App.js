import React, { Fragment, useState, useContext } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Page } from "./Components";

import { Themes, Constants } from "./Utils";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, Backdrop, CircularProgress } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./Contexts/GlobalContext";

function App() {
  //Automatically sets dark mode in case user set it as preferred
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [globalTheme, setGlobalTheme] = useState(
    prefersDarkMode ? Constants.themes.DARK : Constants.themes.LIGHT
  );
  const [showLoadingOverlay, setLoadingOverlay] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          globalTheme: { get: globalTheme, set: setGlobalTheme },
          showLoadingOverlay: {
            get: showLoadingOverlay,
            set: setLoadingOverlay,
          },
          currentPage: { get: currentPage, set: setCurrentPage },
        }}
      >
        <ThemeProvider theme={createMuiTheme(Themes[globalTheme])}>
          <CssBaseline />
          <Page />
          <Backdrop open={showLoadingOverlay}>
            <CircularProgress />
          </Backdrop>
        </ThemeProvider>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
