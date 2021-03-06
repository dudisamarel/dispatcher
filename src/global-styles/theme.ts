const size = {
  mobile: "767.98px",
  tablet: "1270.98px",
};

const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.tablet})`,
};

export const theme = {
  graphColorPalette: {
    doughnut: ["#FF9800", "#DDF3FE", "#E8E8E8", "#030035", "#343A6E"],
    area: { lightBlue: "#00B9FF", blue: "#0058B9" },
  },
  colors: {
    piePercent: "#9FA2B4",
    pieText: "#030035",
    primary: `#0058B9`,
    primaryHover: `#3379c6`,
    secondary: `#D9DBE9`,
    secondaryHover: `#e1e2ed`,
    lightGray: `#F8F8FF`,
    lightGray2: `#F3F3FF`,
    lightPurple: `#5A5A89`,
    inputHolder: `#5A5A8980`,
    purple: `#262146`,
    inputBorder: "#d9dbe9",
    background: `#F8F8FF`,
    lightPurple2: `#636393b0`,
    textGray: "rgba(90, 90, 137, 0.5)",
    hoverDropDown: "#dfe0eb69",
    warning: "#d52d2d",
  },
  device,
  spacing: (number: number) => 8 * number + "px",
};
