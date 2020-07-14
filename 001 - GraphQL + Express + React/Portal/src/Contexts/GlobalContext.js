import React from "react"

const GlobalContext = React.createContext({
   globalTheme: null,
   showLoadingOverlay: null,
   currentPage: null
});

export default GlobalContext;