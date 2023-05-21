import React from "react";
import HomeWork from "./HomeWork";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";

const TeachersHwPage = () => {
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          overflowY: "scroll",
          display: "flex",
        }}
      >
        <Sidebar />
        <HomeWork />
      </Box>
    </div>
  );
};

export default TeachersHwPage;
