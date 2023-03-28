import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { SCHEDULE_API } from '../helpers/consts';

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

const getToken = () => {
  const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.access}` 
    }
  };
  return config
}


const ScheduleContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, init_state);

  const getSchedule = async () => {
    try {
      let data = await axios.get(SCHEDULE_API, getToken());
      dispatch({
        type: "GET_SCHEDULE",
        payload: data.data,
      })
    } catch (error) {
      console.log(error, 'get_schedule_error')
    }
  }

  const setSchedule = async (info) => {
    console.log(info)
    try {
      let res = await axios.post(SCHEDULE_API, info, getToken())
      console.log(res);
      getSchedule();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteSchedule = async (id) => {
    console.log(id)
    try {
      let res = await axios.delete(`${SCHEDULE_API}${id}/`, getToken());
      console.log(res)
      getSchedule()
    } catch (error) {
      console.log(error)
    }
  }

  const values = {
    schedule: state.schedule,
    getSchedule,
    setSchedule,
    deleteSchedule,
  }

  return (
    <scheduleContext.Provider value={values}>
      {children}
    </scheduleContext.Provider>
  );
};

export default ScheduleContextProvider;