import { Box } from "@mui/material";
import React from "react";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContextProvider";

import AuthPage from "./pages/AuthPage";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <AuthContextProvider>
      <MainRoutes />
    </AuthContextProvider>
  );
}

export default App;
