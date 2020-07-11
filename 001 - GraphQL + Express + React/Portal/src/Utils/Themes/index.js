//override common global theme variables here
let commonOverrides = {};

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
