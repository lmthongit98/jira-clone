import { Box, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function ProjectFeature() {
  return (
    <Box>
      <Grid container>
        <Grid
          item
          sx={{
            width: "15%",
            minHeight: "100vh",
            borderRight: "2px solid #e5e1e1",
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item sx={{ width: "85%", minHeight: "100vh", p: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
