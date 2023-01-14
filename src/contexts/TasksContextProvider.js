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
    answers:[],
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
        case 'ANSWERS':
        return { ...state, answers: action.payload };
      default:
        return state;
    }
  };
const TasksContextProvider = ({children}) => {


   

    const [state , dispatch] = useReducer(reducer , INIT_STATE)


    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
    // console.log(token.access);
    const API = 'http://35.238.162.84/room/tasks/'
    
    const config = {
        headers : {
          "Content-Type": "application/json",
    "Authorization": `Bearer ${token.access}` 
}
      };
      
    const handleTask=async()=>{
        try {
            const res =  await axios(`${API}`,config);  
            console.log( res);    
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


    const getAnswers=async()=>{
      try {
        const res = await axios('http://35.238.162.84/room/answers/' , config)
        console.log(res);
        dispatch({
          type:'ANSWERS',
          payload:res.data,
        })
      } catch (error) {
        console.log(error);
      }
    }

    const handleAnswer=async(obj)=>{

  try {
    const res = await axios.post(`http://35.238.162.84/room/answers/` , obj , config);
    console.log(res);
} catch (error) {
  console.log(error);
  
}

      


    }
 
    // console.log(state);

    
    const values={
        handleTask,
        tasks:state.tasks,
        sent:state.sent,
        fillInps:state.fillInps,
        dispatch,
        wordFind:state.wordFind,
        handleAnswer,
        getAnswers,
        answers:state.answers
    }

    return (
        <tasksContext.Provider value={values}>{children}</tasksContext.Provider>
    );
};

export default TasksContextProvider;