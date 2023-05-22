import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  CHAT_NOTES_API,
  CHAT_ROOM_API,
  GRADE_API,
  ROOM_API,
} from "../helpers/consts";
import api from "../http/index";

const classWorkContext = createContext();
export const useClassWork = () => useContext(classWorkContext);

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

const room_pk = JSON.parse(localStorage.getItem("room_pk")) || 0;

const init_state = {
  lesson: [],
  room_pk: room_pk,
  createRoomError: { title: "" },
  notes: [],
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "get_lesson":
      return { ...state, lesson: action.payload };
    case "set_room_pk":
      JSON.stringify(localStorage.setItem("room_pk", action.payload.pk));
      return { ...state, room_pk: action.payload.pk };
    case "create_room_error":
      return { ...state, createRoomError: { title: action.payload } };
    case "get_notes":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const ClassWorkContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init_state);

  const createRoom = async (roomInfo) => {
    console.log(roomInfo);
    try {
      const res = await axios.post(CHAT_ROOM_API, roomInfo, getToken());
      console.log(res, "create_room_success");
      dispatch({
        type: "set_room_pk",
        payload: res.data,
      });
      navigate("/classwork");
    } catch (error) {
      console.log(error, "create_room_err");
      dispatch({
        type: "create_room_error",
        payload:
          error?.response?.status === 500
            ? "Something went wrong"
            : error?.response?.data?.name[0],
      });
    }
  };

  const getLesson = async (id) => {
    try {
      const { data } = await api.get(ROOM_API + "get_lesson/", {
        params: { user_id: id },
      });
      dispatch({
        type: "get_lesson",
        payload: data,
      });
    } catch (error) {
      console.log(error, "get_lesson error");
    }
  };

  const getRoom = async () => {
    try {
      const res = await axios.get(CHAT_ROOM_API, getToken());
      console.log(res);
    } catch (error) {
      console.log(error, "get_room_error");
    }
  };

  const clearErrors = () => {
    dispatch({
      type: "create_room_error",
      payload: "",
    });
  };

  // Заметки
  const postNote = async (note, id) => {
    try {
      await axios.patch(`${CHAT_NOTES_API}${id}/`, note, getToken());
    } catch (error) {
      console.log(error, "post_note_error");
    }
  };

  const getNotes = async () => {
    try {
      let data = await axios.get(CHAT_NOTES_API, getToken());
      console.log(data);
      dispatch({
        type: "get_notes",
        payload: data.data,
      });
    } catch (error) {
      console.log(error, "get_notes_error");
    }
  };

  // Оценки классная
  const sendMark = async (mark) => {
    try {
      await axios.post(GRADE_API, mark, getToken());
    } catch (error) {
      console.log(error, "send_mark_error");
    }
  };

  const values = {
    createRoom,
    getLesson,
    getRoom,
    clearErrors,
    postNote,
    getNotes,
    sendMark,
    createRoomError: state.createRoomError,
    lesson: state.lesson,
    room_pk: state.room_pk,
    notes: state.notes,
  };

  return (
    <classWorkContext.Provider value={values}>
      {children}
    </classWorkContext.Provider>
  );
};

export default ClassWorkContextProvider;
