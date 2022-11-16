import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from '../components/auth/Registration';
import NotFoundPage from '../components/NotFoundPage';
import AuthPage from '../pages/AuthPage';
import CoursesPage from '../pages/CoursesPage';
import { useAuth } from '../contexts/AuthContextProvider';
import TasksPage from '../pages/TasksPage';
import ClassPage from '../pages/ClassPage';
import ProfilePage from '../pages/ProfilePage';

const MainRoutes = () => {
    const { checkAuth } = useAuth();
    const user = true;

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth();
        }
    }, []);

    const PRIVATE_ROUTES = [
        {
            link: '/home',
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
            id: 5,
        },
        {
            link: '/profile',
            element: <ProfilePage />,
            id: 6,
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
