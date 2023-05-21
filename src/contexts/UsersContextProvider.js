import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/consts";

const usersContext = createContext();
export const useUsers = () => useContext(usersContext);

const init_state = {
  students: [],
  hwstudents: [],
  studentshw: [],
  onehw: {},
  onelesson: {},
  currentlesson: {},
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "GET_STUDENTS":
      return {
        ...state,
        students: action.payload.filter((user) => !user.teacher),
      };
    case "STUDENTS":
      return { ...state, hwstudents: action.payload };
    case "GET_STUD_HW":
      return { ...state, studentshw: action.payload };
    case "GET_ONE_HW":
      return { ...state, onehw: action.payload };
    case "GET_ONE_LESSON":
      return { ...state, onelesson: action.payload };
    case "GET_CURRENT_LESSON":
      return { ...state, currentlesson: action.payload };
    default:
      return state;
  }
};

const UsersContextProvider = ({ children }) => {
  const getConfig = () => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : "";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };
    return config;
  };

  const [state, dispatch] = useReducer(reducer, init_state);

  const getStudents = async () => {
    try {
      let { data } = await axios(`${API}account/users/`, getConfig());
      dispatch({
        type: "GET_STUDENTS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    const { data } = await axios(`${API}room/rooms/`, getConfig());
    dispatch({
      type: "STUDENTS",
      payload: data,
    });
  };

  const getUserHw = async (id) => {
    const { data } = await axios(
      `${API}room/get_deactivated_lessons/?user_id=${id}&hw=true`,
      getConfig()
    );
    dispatch({
      type: "GET_STUD_HW",
      payload: data,
    });
    console.log(data);
  };

  const getOneHw = async (case_id, user_id) => {
    const { data } = await axios(
      `${API}room/case_tasks/${case_id}/?user_id=${user_id}`,
      getConfig()
    );
    dispatch({
      type: "GET_ONE_HW",
      payload: data,
    });
  };

  const getOneLesson = async (lesson_id, user_id) => {
    try {
      const { data } = await axios(
        `${API}room/lessons/${lesson_id}/?user_id=${user_id}`,
        getConfig()
      );
      dispatch({
        type: "GET_ONE_LESSON",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "GET_ONE_LESSON",
        payload: {},
      });
    }
  };

  const getCurrentLesson = async (user_id) => {
    const { data } = await axios(
      `${API}room/get_lesson/?user_id=${user_id}&hw=true`,
      getConfig()
    );
    console.log(data);
    dispatch({
      type: "GET_CURRENT_LESSON",
      payload: data,
    });
  };

  const cloud = {
    getStudents,
    studentsList: state.students,
    getUsers,
    hwstudents: state.hwstudents,
    getUserHw,
    studentshw: state.studentshw,
    getOneHw,
    onehw: state.onehw,
    onelesson: state.onelesson,
    getOneLesson,
    getCurrentLesson,
    currentlesson: state.currentlesson,
  };

  return (
    <usersContext.Provider value={cloud}>{children}</usersContext.Provider>
  );
};

export default UsersContextProvider;
