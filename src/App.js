import AuthContextProvider from './contexts/AuthContextProvider';
import ClassWorkContextProvider from './contexts/ClassWorkContextProvider';
import EssayContextProvider from './contexts/EssayContextProvider';
import ScheduleContextProvider from './contexts/ScheduleContextProvider';
import TasksContextProvider from './contexts/TasksContextProvider';
import UsersContextProvider from './contexts/UsersContextProvider';
import MainRoutes from './routes/MainRoutes';

import './App.css';

function App() {
    return (
        <ClassWorkContextProvider>
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
        </ClassWorkContextProvider>
    );
}

export default App;
