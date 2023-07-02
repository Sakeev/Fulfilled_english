import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { API } from "../helpers/consts";

export const tasksContext = createContext();

export const useTasks = () => {
  return useContext(tasksContext);
};

const INIT_STATE = {
  tasks: [],
  taskDetails: {},
  wordFind: [],
  fillInps: [],
  sent: [],
  answers: [],
  cases: [],
  casesDetail: {},
  singleCase: [],
  caseInfo: {},
  taskProgress: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return { ...state, tasks: action.payload };
    case "GET_TASKS_DETAIL":
      return { ...state, taskDetails: action.payload };
    case "GET_WORD":
      return { ...state, wordFind: action.payload };
    case "GET_INPS":
      return { ...state, fillInps: action.payload };
    case "GET_SENT":
      return { ...state, sent: action.payload };
    case "ANSWERS":
      return { ...state, answers: action.payload };
    case "CASE":
      return { ...state, cases: action.payload };
    case "CASE_DETAIL":
      return { ...state, casesDetail: action.payload };
    case "CASE_INFO":
      return { ...state, caseInfo: action.payload };
    case "SINGLE_CASE":
      return { ...state, singleCase: action.payload };
    case "PROGRESS_OBJECT":
      return { ...state, progObj: action.payload };
    case "TASK_PROGRESS":
      return {
        ...state,
        taskProgress: [...state.taskProgress, action.payload],
      };
    default:
      return state;
  }
};
const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getConfig = () => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : "";
    // console.log(token.access);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    };
    return config;
  };
  const handleTask = async () => {
    try {
      const res = await axios(`${API}room/tasks/`, getConfig());

      dispatch({
        type: "GET_TASKS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAnswers = async () => {
    try {
      const res = await axios(`${API}room/answers/`, getConfig());
      // console.log(res);
      dispatch({
        type: "ANSWERS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswer = async (obj, id) => {
    try {
      const res = await axios.post(
        `${API}room/tasks/${id}/answer/`,
        obj,
        getConfig()
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCase = async () => {
    const { data } = await axios(`${API}room/get_lesson/?hw=true`, getConfig());
    console.log(data);

    dispatch({
      type: "CASE",
      payload: data,
    });
  };

  const handleCaseDetail = async (id, task_id) => {
    const { data } = await axios(
      `${API}room/case_tasks/${id}/?task=${task_id}`,
      getConfig()
    );
    console.log(data);
    dispatch({
      type: "CASE_DETAIL",
      payload: data,
    });
  };
  const singleCase = async (id) => {
    const { data } = await axios(`${API}room/case_tasks/${id}/`, getConfig());
    dispatch({
      type: "SINGLE_CASE",
      payload: data,
    });
    return data;
  };
  const infoCase = async (id) => {
    const { data } = await axios(`${API}room/case_tasks/${id}/`, getConfig());
    // console.log(data);
    dispatch({
      type: "CASE_INFO",
      payload: data,
    });
  };

  const editProgress = async (obj, caseIndex) => {
    if (obj.task0) {
      console.log("patch", obj);
      let resObj = {
        json_field: obj,
      };

      await axios.patch(
        `${API}room/case_tasks/${caseIndex}/`,
        resObj,
        getConfig()
      );
    }
  };

  const getProgress = async (caseIndex) => {
    const { data } = await axios.get(
      `${API}room/case_tasks/${caseIndex}/`,
      getConfig()
    );
    dispatch({
      type: "PROGRESS_OBJECT",
      payload: data,
    });
  };

  const values = {
    handleTask,
    handleCase,
    singleCase,
    caseDetail: state.casesDetail,
    handleCaseDetail,
    cases: state.cases,
    tasks: state.tasks,
    sent: state.sent,
    fillInps: state.fillInps,
    dispatch,
    wordFind: state.wordFind,
    handleAnswer,
    getAnswers,
    answers: state.answers,
    oneCase: state.singleCase,
    caseInfo: state.caseInfo,
    infoCase,
    taskProgress: state.taskProgress,
    editProgress,
    getProgress,
    progObj: state.progObj,
  };

  return (
    <tasksContext.Provider value={values}>{children}</tasksContext.Provider>
  );
};

export default TasksContextProvider;
