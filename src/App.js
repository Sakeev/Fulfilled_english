import React from 'react';
import './App.css';
import AuthContextProvider from './contexts/AuthContextProvider';
import TasksContextProvider from './contexts/TasksContextProvider';
import UsersContextProvider from './contexts/UsersContextProvider';

import AuthPage from './pages/AuthPage';
import MainRoutes from './routes/MainRoutes';

function App() {
    return (
        <TasksContextProvider>
            <AuthContextProvider>
                <UsersContextProvider>
                    <MainRoutes />
                </UsersContextProvider>
            </AuthContextProvider>
        </TasksContextProvider>
    );
}

export default App;
