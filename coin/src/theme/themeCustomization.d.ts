import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true;
    tablet: true;
    desktop: true;
  }
}
