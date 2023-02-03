import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { API, AUTH_API } from "../helpers/consts";
import axios from "axios";
import jwtDecode from "jwt-decode";
import api from "../http";

export const authContext = createContext();

const INIT_STATE = {
    userId: 0,
    isTeacher: false,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "SET_USER_ID":
            return { ...state, userId: action.payload };
        case "SET_IS_TEACHER":
            return { ...state, isTeacher: action.payload };
        default:
            return state;
    }
};

export const useAuth = () => {
    return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorObj, setErrorObj] = useState({
        emailError: { status: false, message: "" },
        passwordError: { status: false, message: "" },
        loginDataError: { status: false, statusCode: 0, message: "" },
    });
    // console.log(state.userId);
    const navigate = useNavigate();

    const token = async (email, password) => {
        let formData = {
            email,
            password,
        };

        try {
            const { data } = await axios.post(`${AUTH_API}`, formData);
            const { access, refresh } = data;

            // dispatch({ type: 'SET_USER_ID', payload: data.id });
            // dispatch({ type: 'SET_IS_TEACHER', payload: data.is_teacher });

            localStorage.setItem("token", JSON.stringify({ access, refresh }));
            localStorage.setItem("user", email);
            navigate("/");
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
                    message: !email ? "Введите вашу почту" : "",
                },
                passwordError: {
                    status: !password,
                    message: !password ? "Введите пароль" : "",
                },
            };
        });

        if (!email || !password) return;

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            setIsLoading(true);
            let { data } = await axios.post(`${AUTH_API}`, formData, config);
            const { access, refresh } = data;

            dispatch({ type: "SET_USER_ID", payload: data.id });
            dispatch({ type: "SET_IS_TEACHER", payload: data.is_teacher });

            localStorage.setItem("token", JSON.stringify({ access, refresh }));
            localStorage.setItem("username", email);

            setUser(email);
            navigate("/");
        } catch (error) {
            if (error.response.status === 401) {
                setErrorObj((prev) => {
                    return {
                        ...prev,
                        passwordError: {
                            status: true,
                            message:
                                "Неверный адрес электронной почты или пароль",
                        },
                        emailError: {
                            status: false,
                            message: "",
                        },
                    };
                });
            }

            setError(error.response.statusText);
        } finally {
            setIsLoading(false);
        }
    }

    async function checkAuth() {
        let token = JSON.parse(localStorage.getItem("token"));

        try {
            const Authorization = `Bearer ${token.access}`;

            let { data } = await axios.post(
                `${AUTH_API}refresh/`,
                {
                    refresh: token.refresh,
                },
                {
                    headers: { Authorization },
                }
            );

            const { access, refresh } = data;

            // console.log(data);

            // dispatch({ type: 'SET_USER_ID', payload: data.id });
            // dispatch({ type: 'SET_IS_TEACHER', payload: data.is_teacher });

            localStorage.setItem("token", JSON.stringify({ access, refresh }));

            let userName = localStorage.getItem("username");
            setUser(userName);
        } catch (error) {
            localStorage.setItem("username", "");
            setUser("");
            setError("error occured");
        }
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser("");
    }

    const values = {
        token,
        login,
        logout,
        user,
        errorObj,
        checkAuth,
        isLoading,
        userId: state.userId,
        isTeacher: state.isTeacher,
    };

    return (
        <authContext.Provider value={values}>{children}</authContext.Provider>
    );
};

export default AuthContextProvider;
