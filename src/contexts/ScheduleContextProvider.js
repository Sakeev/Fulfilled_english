import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { GRADE_API, SCHEDULE_API } from "../helpers/consts";

const scheduleContext = createContext();
export const useSchedule = () => useContext(scheduleContext);

const init_state = {
  schedule: [],
  gradebook: [],
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "GET_SCHEDULE":
      return { ...state, schedule: action.payload };
    case "GET_GRADEBOOK":
      return { ...state, gradebook: action.payload };
    default:
      return state;
  }
};

const getToken = () => {
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

const ScheduleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init_state);

  const getSchedule = async () => {
    try {
      let data = await axios.get(SCHEDULE_API, getToken());
      dispatch({
        type: "GET_SCHEDULE",
        payload: data.data,
      });
    } catch (error) {
      console.log(error, "get_schedule_error");
    }
  };

  const setSchedule = async (info) => {
    try {
      let res = await axios.post(SCHEDULE_API, info, getToken());
      getSchedule();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      let res = await axios.delete(`${SCHEDULE_API}${id}/`, getToken());
      getSchedule();
    } catch (error) {
      console.log(error);
    }
  };

  const getGradebook = async () => {
    try {
      let data = await axios.get(GRADE_API, getToken());
      dispatch({
        type: "GET_GRADEBOOK",
        payload: data.data,
      });
    } catch (error) {
      console.log(error, "get_gradebook_error");
    }
  };

  const values = {
    schedule: state.schedule,
    gradebook: state.gradebook,
    getSchedule,
    setSchedule,
    deleteSchedule,
    getGradebook,
  };

  return (
    <scheduleContext.Provider value={values}>
      {children}
    </scheduleContext.Provider>
  );
};

export default ScheduleContextProvider;
