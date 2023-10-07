import React, { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, AUTH_API, PROFILE_API, USERS_API } from "../helpers/consts";
import axios from "axios";
import api from "../http";

export const authContext = createContext();

const INIT_STATE = {
  users: [],
  userId: 0,
  isTeacher: false,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
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

const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const Authorization = `Bearer ${token.access}`;
  const config = {
    headers: {
      Authorization,
    },
  };
  return config;
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

  const navigate = useNavigate();

  const token = async (email, password) => {
    let formData = {
      email,
      password,
    };

    try {
      const { data } = await axios.post(`${AUTH_API}`, formData);
      const { access, refresh, isTeacher } = data;

      dispatch({ type: "SET_IS_TEACHER", payload: isTeacher });

      localStorage.setItem("token", JSON.stringify({ access, refresh }));
      localStorage.setItem("username", email);
      localStorage.setItem("isTeacher", JSON.stringify(isTeacher));
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

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    try {
      setIsLoading(true);
      let { data } = await api.post(`${AUTH_API}`, formData, config);
      const { access, refresh, is_teacher } = data;

      localStorage.setItem("token", JSON.stringify({ access, refresh }));
      localStorage.setItem("username", email);
      localStorage.setItem("isTeacher", JSON.stringify(is_teacher));

      dispatch({ type: "SET_IS_TEACHER", payload: is_teacher });

      setUser(email);
      navigate("/");
    } catch (error) {
      if (error.response.status === 401) {
        setErrorObj((prev) => {
          return {
            ...prev,
            passwordError: {
              status: true,
              message: "Неверный адрес электронной почты или пароль",
            },
            emailError: {
              status: true,
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
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const Authorization = `Bearer ${token.access}`;

      const { data } = await api.post(
        `${AUTH_API}refresh/`,
        {
          refresh: token.refresh,
        },
        {
          headers: { Authorization },
        }
      );

      const { access, refresh } = data;
      const userName = localStorage.getItem("username");
      const isTeacher = JSON.parse(localStorage.getItem("isTeacher"));

      localStorage.setItem("token", JSON.stringify({ access, refresh }));
      dispatch({ type: "SET_IS_TEACHER", payload: isTeacher });
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
    localStorage.removeItem("isTeacher");

    dispatch({ type: "SET_IS_TEACHER", payload: false });

    setUser("");
    navigate("/");
  }

  async function getRoomOrRooms() {
    const res = await api.get(`${API}room/rooms/`);

    if (state.isTeacher) return res.data || [];
    else return res.data[0] || null;
  }

  async function getUsers() {
    try {
      const res = await axios.get(USERS_API, getToken());
      dispatch({
        type: "SET_USERS",
        payload: res.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const values = {
    userId: state.userId,
    isTeacher: state.isTeacher,
    users: state.users,
    token,
    login,
    logout,
    user,
    errorObj,
    checkAuth,
    isLoading,
    getRoomOrRooms,
    getUsers,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
