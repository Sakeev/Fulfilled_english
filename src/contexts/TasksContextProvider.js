import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { createContext } from 'react';




export const tasksContext = createContext();

export const useTasks = () => {
    return useContext(tasksContext);
  };


  const INIT_STATE = {
    tasks:[],
    taskDetails: {},
    wordFind:[],
    fillInps:[],
    sent:[],
  };

  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case 'GET_TASKS':
        return { ...state, tasks: action.payload };
      case 'GET_TASKS_DETAIL':
        return { ...state, taskDetails: action.payload };
      case 'GET_WORD':
        return { ...state, wordFind: action.payload };
      case 'GET_INPS':
        return { ...state, fillInps: action.payload };
      case 'GET_SENT':
        return { ...state, sent: action.payload };
      default:
        return state;
    }
  };
const TasksContextProvider = ({children}) => {


   

    const [state , dispatch] = useReducer(reducer , INIT_STATE)


    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
    console.log(token.access);
    const API = 'http://35.238.162.84/room/tasks/'
    
    const config = {
        headers : {
    "Authorization": `Bearer ${token.access}` 
}
      };
      
    const handleTask=async()=>{
        try {
            const res =  await axios(`${API}`,config);  
            console.log(res);    
            dispatch(
                {
                    type:"GET_TASKS",
                    payload:res.data,
                }
            )
        } catch (error) {
            console.log(error);
        }
      
    }
 
    // console.log(state);

    
    const values={
        handleTask,
        tasks:state.tasks,
        sent:state.sent,
        dispatch,
    }

    return (
        <tasksContext.Provider value={values}>{children}</tasksContext.Provider>
    );
};

export default TasksContextProvider;