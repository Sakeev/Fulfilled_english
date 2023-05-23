import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";
import Notes from "../components/notes/Notes";

const NotesPage = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          overflowY: "hidden",
          display: "flex",
        }}
      >
        <Sidebar />
        <Notes />
      </Box>
    </>
  );
};

export default NotesPage;
