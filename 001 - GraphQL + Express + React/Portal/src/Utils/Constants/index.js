export default {
    localStorageVars: {
        IS_AUTHENTICATED: "isAuthenticated"
    },
    apiLinks: {
        graphQLServerLink: process.env.REACT_APP_EXPRESS_SERVER_PORT,
    },
    themes: {
        light: "light",
        dark: "dark"
    }
}