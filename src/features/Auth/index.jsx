import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Outlet } from "react-router-dom";

const theme = createTheme();

export default function Auth() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </div>
  );
}
