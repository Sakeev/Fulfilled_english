import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { API } from '../helpers/consts';

const usersContext = createContext();
export const useUsers = () => useContext(usersContext);

const init_state = {
  students: [],
}

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "GET_STUDENTS":
      return { ...state, students: action.payload.filter(user => !user.teacher) };
    default:
      return state;
  }
}

const UsersContextProvider = ({children}) => {


  const getConfig = () => {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";

    const config = {
      headers : {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access}`,
      }
    };
    return config;
}

  const [state, dispatch] = useReducer(reducer, init_state)

  const getStudents = async () => {
    try {
      let { data } = await axios(`${API}account/users/`, getConfig());
      dispatch({
        type: "GET_STUDENTS",
        payload: data,
      })
    } catch(error) {
      console.log(error);
    }
  }

  const cloud = {
    getStudents,
    studentsList: state.students,
  }

  return (
    <usersContext.Provider value={cloud}>
      {children}
    </usersContext.Provider>
  );
};

export default UsersContextProvider;