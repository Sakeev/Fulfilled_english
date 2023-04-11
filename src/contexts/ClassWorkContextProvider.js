import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { CHAT_ROOM_API, ROOM_API } from '../helpers/consts';

const classWorkContext = createContext();
export const useClassWork = () => useContext(classWorkContext);

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

const init_state = {
  lesson: {},
}

const reducer = (state = init_state, action) => {
  switch(action.type){
    case 'get_lesson':
      return { ...state, lesson: action.payload };
    default:
      return state
  }
}

const ClassWorkContextProvider = ({children}) => {
  
  const [state, dispatch] = useReducer(reducer, init_state);

  const createRoom = async (roomInfo) => {
    console.log(roomInfo)
    try {
      const res = await axios.post(CHAT_ROOM_API, roomInfo, getToken());
      console.log(res, 'create_room_success')
    } catch (error) {
      console.log(error, 'create_room_err')
    }
  }

  const getLessons = async () => {
    try {
      const { data } = await axios.post(ROOM_API + 'get_lesson/', { user_id: 2 }, getToken());
      dispatch({
        type: 'get_lesson',
        payload: data,
      })
    } catch (error) {
      console.log(error, 'get_lesson error')
    }
  }

  const values = {
    createRoom,
    getLessons,
    lesson: state.lesson,
  }

  return (
    <classWorkContext.Provider value={values}>
      {children}
    </classWorkContext.Provider>
  );
};

export default ClassWorkContextProvider;