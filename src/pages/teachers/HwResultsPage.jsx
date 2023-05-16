import React from "react";
import HwResults from "./HwResults";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
const HwResultsPage = () => {
  return (
    <div>
      <Box
        sx={{
          height: "100%",
          //   overflowY: "hidden",
          display: "flex",
        }}
      >
        <Sidebar />
        <HwResults />
      </Box>
    </div>
  );
};

export default HwResultsPage;
