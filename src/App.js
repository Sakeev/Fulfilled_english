import React from "react";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContextProvider";
import EssayContextProvider from "./contexts/EssayContextProvider";
import TasksContextProvider from "./contexts/TasksContextProvider";
import UsersContextProvider from "./contexts/UsersContextProvider";

import AuthPage from "./pages/AuthPage";
import MainRoutes from "./routes/MainRoutes";

function App() {
    return (
        <EssayContextProvider>
            <TasksContextProvider>
                <AuthContextProvider>
                    <UsersContextProvider>
                        <MainRoutes />
                    </UsersContextProvider>
                </AuthContextProvider>
            </TasksContextProvider>
        </EssayContextProvider>
    );
}

export default App;
