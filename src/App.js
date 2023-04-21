import React from 'react';
import './App.css';
import AuthContextProvider from './contexts/AuthContextProvider';
import EssayContextProvider from './contexts/EssayContextProvider';
import ScheduleContextProvider from './contexts/ScheduleContextProvider';
import TasksContextProvider from './contexts/TasksContextProvider';
import UsersContextProvider from './contexts/UsersContextProvider';

import AuthPage from './pages/AuthPage';
import MainRoutes from './routes/MainRoutes';
import ContinueSentence from './components/tasks/tasksType/ContinueSentence';
import FillInps from './components/tasks/FillInps';
import Sentence from './components/tasks/tasksType/Sentence';
function App() {
    return (
        <EssayContextProvider>
            <TasksContextProvider>
                <ScheduleContextProvider>
                    <AuthContextProvider>
                        <UsersContextProvider>
                            <MainRoutes />
                        </UsersContextProvider>
                    </AuthContextProvider>
                </ScheduleContextProvider>
            </TasksContextProvider>
        </EssayContextProvider>
    );
}

export default App;
