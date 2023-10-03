import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Registration from '../components/auth/Registration';
import NotFoundPage from '../components/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import CoursesPage from '../pages/CoursesPage';
import { useAuth } from '../contexts/AuthContextProvider';
import TasksPage from '../pages/TasksPage';
import ClassPage from '../pages/ClassPage';
import ProfilePage from '../pages/ProfilePage';
import StudentsListPage from '../pages/teachers/StudentsPage';
import SchedulePage from '../pages/teachers/SchedulePage';
import TasksResultPage from '../pages/TasksResultPage';
import Case from '../components/tasks/Case';
import Progress from '../components/tasks/Progress';
import NotesPage from '../pages/NotesPage';
import HomeWork from '../pages/teachers/HomeWork';
import HwResults from '../pages/teachers/HwResults';
import TeachersHwPage from '../pages/teachers/TeachersHwPage';
import HwResultsPage from '../pages/teachers/HwResultsPage';
import ShowCases from '../components/teachers/HWResults/ShowCases';
import SidebarLayout from 'components/SidebarLayout';
import {
    StudentEssayPage,
    TeacherEssayPage,
    ViewEssayPage,
} from 'pages/EssayPages';

const MainRoutes = () => {
    const { checkAuth, isTeacher } = useAuth();
    const navigate = useNavigate();

    const user = localStorage.getItem('username');

    React.useEffect(() => {
        if (user) {
            if (localStorage.getItem('token')) checkAuth();
            else navigate('/');
        }
    }, []);

    const PRIVATE_ROUTES = [
        {
            link: '/',
            element: <CoursesPage />,
            id: 1,
        },
        {
            link: '/classwork',
            element: <ClassPage />,
            id: 2,
        },
        {
            link: '/register',
            element: <Registration />,
            id: 3,
        },
        {
            link: '*',
            element: <NotFoundPage />,
            id: 4,
        },
        {
            link: '/tasks',
            element: isTeacher ? <TeachersHwPage /> : <TasksPage />,
            id: 4,
        },
        {
            link: '/student-tasks/:userId',
            element: <ShowCases />,
            id: 4,
        },
        {
            link: '/essay',
            element: isTeacher ? <TeacherEssayPage /> : <StudentEssayPage />,
            id: 5,
        },
        {
            link: '/profile',
            element: <ProfilePage />,
            id: 6,
        },
        {
            link: '/students',
            element: <StudentsListPage />,
            id: 7,
        },
        {
            link: '/schedule',
            element: <SchedulePage />,
            id: 8,
        },
        {
            link: '/task/case/:caseId/task/:taskId',
            element: <Case />,
            id: 9,
        },
        // {
        //     link: '/task/case/:id/task/:task_id/results',
        //     element: <TasksResultPage />,
        //     id: 10,
        // },
        {
            link: '/student-tasks/:userId/results/:taskId',
            element: <TasksResultPage />,
            id: 10,
        },
        {
            link: '/homework',
            element: <TeachersHwPage />,
            id: 11,
        },
        // {
        //     link: `/hwresults/:user_id/:id`,
        //     element: <HwResultsPage />,
        //     id: 12,
        // },
        {
            link: '/notes',
            element: <NotesPage />,
            id: 13,
        },
    ];
    const PUBLIC_ROUTES = [
        {
            link: '/',
            element: <AuthPage />,
            id: 1,
        },
        {
            link: '/register',
            element: <Registration />,
            id: 2,
        },
        {
            link: '*',
            element: <NotFoundPage />,
            id: 3,
        },
    ];

    if (isTeacher) {
        PRIVATE_ROUTES.push({
            link: '/essay/view/:studentId',
            element: <ViewEssayPage />,
            id: PRIVATE_ROUTES.length + 2,
        });
    }

    return (
        <>
            <Routes>
                {!user &&
                    PUBLIC_ROUTES.map((item) => (
                        <Route
                            path={item.link}
                            element={item.element}
                            key={item.id}
                        />
                    ))}
                <Route path="/" element={<SidebarLayout />}>
                    {user &&
                        PRIVATE_ROUTES.map((item) => (
                            <Route
                                path={item.link}
                                element={
                                    user ? (
                                        item.element
                                    ) : (
                                        <Navigate replace to="*" />
                                    )
                                }
                                key={item.id}
                            />
                        ))}
                </Route>
            </Routes>
        </>
    );
};

export default MainRoutes;
