import { Box } from "@mui/material";
import React from "react";
import ClassWorkLayout from "../components/classwork/ClassWorkLayout";

import "./ClassPage.css";

const ClassPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <ClassWorkLayout />
    </Box>
  );
};

export default ClassPage;
