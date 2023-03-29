import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Registration from '../components/auth/Registration';
import NotFoundPage from '../components/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import CoursesPage from '../pages/CoursesPage';
import { useAuth } from '../contexts/AuthContextProvider';
import TasksPage from '../pages/TasksPage';
import ClassPage from '../pages/ClassPage';
import EssayPage from '../pages/EssayPage';
import ProfilePage from '../pages/ProfilePage';
import StudentsListPage from '../pages/teachers/StudentsPage';
import SchedulePage from '../pages/teachers/SchedulePage';
import TasksResultPage from '../pages/TasksResultPage';
import TeacherEssayPage from '../pages/teachers/TeacherEssayPage';
import ViewEssayPage from '../pages/teachers/ViewEssayPage';

const MainRoutes = () => {
    const { checkAuth, isTeacher } = useAuth();
    const navigate = useNavigate();

    const user = localStorage.getItem('username');

    React.useEffect(() => {
        if (localStorage.getItem('token')) checkAuth();
        else navigate('/');
    }, []);

    const PRIVATE_ROUTES = [
        {
            link: '/',
            element: <CoursesPage />,
            id: 1,
        },
        {
            link: '/class',
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
            element: <TasksPage />,
            id: 4,
        },
        {
            link: '/essay',
            element: isTeacher ? <TeacherEssayPage /> : <EssayPage />,
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
            link: '/essay/view/:essayId',
            element: <ViewEssayPage />,
            id: PRIVATE_ROUTES.length + 2,
        });
    }

    return (
        <>
            <Routes>
                {user
                    ? PRIVATE_ROUTES.map((item) => (
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
                      ))
                    : PUBLIC_ROUTES.map((item) => (
                          <Route
                              path={item.link}
                              element={item.element}
                              key={item.id}
                          />
                      ))}
            </Routes>
        </>
    );
};

export default MainRoutes;
