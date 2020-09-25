//override common global theme variables here
let commonOverrides = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiBackdrop: {
      root: {
        zIndex: 9999,
      },
    },
    MuiDrawer: {
      paper: {
        zIndex: 10000,
      },
    },
    MuiDialog: {
      paper: {
        zIndex: 10000,
      },
    },
  },
};

export default {
  light: {
    ...commonOverrides,
    palette: {
      type: "light",
    },
  },
  dark: {
    ...commonOverrides,
    palette: {
      type: "dark",
    },
  },
};
