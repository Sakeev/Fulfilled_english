import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_API } from '../helpers/consts';
import axios from 'axios';

export const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorObj, setErrorObj] = useState({
        emailError: { status: false, message: '' },
        passwordError: { status: false, message: '' },
        loginDataError: { status: false, statusCode: 0, message: '' },
    });

    const navigate = useNavigate();

    const token = async (email, password) => {
        let formData = {
            email,
            password,
        };

        try {
            const res = await axios.post(`${AUTH_API}`, formData);
            localStorage.setItem('Token' , JSON.stringify(res.data.access))
            localStorage.setItem('token', JSON.stringify(res.data));
            localStorage.setItem('user', email);
            navigate('/');
        } catch (error) {
            setError(error);
        }
    };

    async function login(email, password) {
        setErrorObj((prev) => {
            return {
                ...prev,
                emailError: {
                    status: !email,
                    message: !email ? 'Введите вашу почту' : '',
                },
                passwordError: {
                    status: !password,
                    message: !password ? 'Введите пароль' : '',
                },
            };
        });

        if (!email || !password) return;

        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            setIsLoading(true);
            let res = await axios.post(`${AUTH_API}`, formData, config);

            localStorage.setItem('token', JSON.stringify(res.data));
            localStorage.setItem('username', email);

            setUser(email);
            navigate('/');
        } catch (error) {
            console.dir(error);
            if (error.response.status === 401) {
                setErrorObj((prev) => {
                    return {
                        ...prev,
                        passwordError: {
                            status: true,
                            message:
                                'Неверный адрес электронной почты или пароль',
                        },
                        emailError: {
                            status: false,
                            message: '',
                        },
                    };
                });
                console.log(errorObj);
            }

            setError(error.response.statusText);
        } finally {
            setIsLoading(false);
        }
    }

    async function checkAuth() {
        let token = JSON.parse(localStorage.getItem('token'));

        try {
            const Authorization = `Bearer ${token.access}`;

            let res = await axios.post(
                `${AUTH_API}refresh/`,
                {
                    refresh: token.refresh,
                },
                {
                    headers: { Authorization },
                }
            );

            localStorage.setItem(
                'token',
                JSON.stringify({
                    refresh: res.data.refresh,
                    access: res.data.access,
                })
            );

            let userName = localStorage.getItem('username');
            setUser(userName);
        } catch (error) {
            localStorage.setItem('username', '');
            setUser('');
            setError('error occured');
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser('');
    }

    return (
        <authContext.Provider
            value={{
                token,
                login,
                logout,
                user,
                errorObj,
                checkAuth,
                isLoading,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContextProvider;
