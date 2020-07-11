import React, { Fragment, useState, useContext } from 'react';
import { Page } from "./Components"

import { Themes, Constants } from "./Utils"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"

export const GlobalContext = React.createContext({})

function App() {
  const [ globalTheme, setGlobalTheme ] = useState(Constants.themes.light) 
  const [ showLoadingOverlay, setLoadingOverlay ] = useState(false)

  return (
    <GlobalContext.Provider value={{
      globalTheme: {get: globalTheme, set: setGlobalTheme},
      showLoadingOverlay:  {get: showLoadingOverlay, set: setLoadingOverlay}
    }}>
      <ThemeProvider theme={createMuiTheme(Themes[globalTheme])}>
        <CssBaseline />
        <Page />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}

export default App;
