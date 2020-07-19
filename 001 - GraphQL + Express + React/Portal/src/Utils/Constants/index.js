export default {
  localStorageVars: {
    IS_AUTHENTICATED: "isAuthenticated",
  },
  apiLinks: {
    GRAPHQL_SERVER_LINK: `http://localhost:${process.env.REACT_APP_EXPRESS_SERVER_PORT}`,
    RANDOM_USER_LINK: "https://randomuser.me/api/",
  },
  themes: {
    LIGHT: "light",
    DARK: "dark",
  },
  pageTags: {
    LOGIN_PAGE: "LOGIN_PAGE",
    EMPLOYEE_DASHBOARD: "EMPLOYEE_DASHBOARD",
    PORTAL_SETTINGS: "PORTAL_SETTINGS",
  },
};
