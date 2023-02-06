import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';

const scheduleContext = createContext();
export const useSchedule = () => useContext(scheduleContext);

const init_state = {
  schedule: [],
}

const reducer = (state = init_state, action) => {
  switch(action.type) {
    case "GET_SCHEDULE":
      return { ...state, schedule: action.payload };
    default:
      return state;
  }
}

const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token.access}` 
  }
};

const ScheduleContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, init_state);

  const getSchedule = async () => {
    try {
      let data = await axios.get("http://35.238.162.84/schedule/schedule/", config);
      // console.log(data)
      dispatch({
        type: "GET_SCHEDULE",
        payload: data.data,
      })
    } catch (error) {
      console.log(error, 'get_schedule_error')
    }
  }

  const values = {
    schedule: state.schedule,
    getSchedule,
  }

  return (
    <scheduleContext.Provider value={values}>
      {children}
    </scheduleContext.Provider>
  );
};

export default ScheduleContextProvider;