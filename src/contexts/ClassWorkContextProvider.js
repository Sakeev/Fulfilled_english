import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHAT_ROOM_API, ROOM_API } from '../helpers/consts';
import api from '../http/index'

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

const room_pk = JSON.parse(localStorage.getItem('room_pk')) || 0;

const init_state = {
  lesson: [],
  room_pk: room_pk,
  createRoomError: { title: '' },
}

const reducer = (state = init_state, action) => {
  switch(action.type){
    case 'get_lesson':
      return { ...state, lesson: action.payload };
    case 'set_room_pk':
      JSON.stringify(localStorage.setItem('room_pk', action.payload.pk));
      return { ...state, room_pk: action.payload.pk };
    case 'create_room_error':
      return { ...state, createRoomError: { title: action.payload } } 
    default:
      return state
  }
}

const ClassWorkContextProvider = ({children}) => {
  
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init_state);

  const createRoom = async (roomInfo) => {
    console.log(roomInfo)
    try {
      const res = await axios.post(CHAT_ROOM_API, roomInfo, getToken());
      console.log(res, 'create_room_success')
      dispatch({
        type: 'set_room_pk',
        payload: res.data,
      })
      navigate('/classwork')
    } catch (error) {
      dispatch({
        type: 'create_room_error',
        payload: error?.response?.data?.name[0],
      })
      console.log(error, 'create_room_err')
    }
  }

  const getLesson = async (id) => {
    try {
      const { data } = await api.get(ROOM_API + 'get_lesson/', {params: {user_id: id}});
      dispatch({
        type: 'get_lesson',
        payload: data,
      })
    } catch (error) {
      console.log(error, 'get_lesson error')
    }
  }

  const getRoom = async () => {
    try {
      const res = await axios.get(CHAT_ROOM_API, getToken());
      console.log(res)
    } catch (error) {
      console.log(error, 'get_room_error')
    }
  }

  const clearErrors = () => {
    dispatch({
      type: 'create_room_error',
      payload: '',
    })
  }

  const values = {
    createRoom,
    getLesson,
    getRoom,
    clearErrors,
    createRoomError: state.createRoomError,
    lesson: state.lesson,
    room_pk: state.room_pk
  }

  return (
    <classWorkContext.Provider value={values}>
      {children}
    </classWorkContext.Provider>
  );
};

export default ClassWorkContextProvider;