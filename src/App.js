import { Box } from "@mui/material";
import React from "react";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContextProvider";
import TasksContextProvider from "./contexts/TasksContextProvider";

import AuthPage from "./pages/AuthPage";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <TasksContextProvider>
    <AuthContextProvider>
      <MainRoutes />
    </AuthContextProvider>
    </TasksContextProvider>
  );
}

export default App;
