import axios from 'axios'
import React, { createContext, useContext, useReducer } from 'react'
import { API, API_USER_PROGRESS, TEACHER_PROFILE_API } from '../helpers/consts'
import api from 'http'
import { isTeacher } from 'helpers/funcs'

const usersContext = createContext()
export const useUsers = () => useContext(usersContext)

const init_state = {
    students: [],
    hwstudents: [],
    onehw: {},
    onelesson: {},
    currentlesson: {},
    teacherInfo: {},
    user: null,
    studentProgress: null,
}

const reducer = (state = init_state, action) => {
    switch (action.type) {
        case 'GET_STUDENTS':
            return {
                ...state,
                students: action.payload.filter((user) => !user.teacher),
            }
        case 'STUDENTS':
            return { ...state, hwstudents: action.payload }
        case 'GET_ONE_HW':
            return { ...state, onehw: action.payload }
        case 'GET_ONE_LESSON':
            return { ...state, onelesson: action.payload }
        case 'GET_CURRENT_LESSON':
            return { ...state, currentlesson: action.payload }
        case 'GET_TEACHER':
            return { ...state, teacherInfo: action.payload }
        case 'SET_STUDENT_PROGRESS':
            return { ...state, studentProgress: action.payload }
        case 'SET_USER':
            return { ...state, user: action.payload }
        default:
            return state
    }
}

const UsersContextProvider = ({ children }) => {
    const getConfig = () => {
        const token = localStorage.getItem('token')
            ? JSON.parse(localStorage.getItem('token'))
            : ''

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.access}`,
            },
        }
        return config
    }

    const [state, dispatch] = useReducer(reducer, init_state)

    const getStudents = async () => {
        try {
            let { data } = await axios(`${API}account/users/`, getConfig())

            dispatch({
                type: 'GET_STUDENTS',
                payload: data,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async () => {
        const { data } = await axios(`${API}room/rooms/`, getConfig())

        dispatch({
            type: 'STUDENTS',
            payload: data,
        })
    }

    const getOneHw = async (case_id, user_id) => {
        const { data } = await axios(
            `${API}room/case_tasks/${case_id}/?user_id=${user_id}`,
            getConfig()
        )
        dispatch({
            type: 'GET_ONE_HW',
            payload: data,
        })
    }

    const getOneLesson = async (lesson_id, user_id) => {
        try {
            const { data } = await axios(
                `${API}room/lessons/${lesson_id}/?user_id=${user_id}`,
                getConfig()
            )
            dispatch({
                type: 'GET_ONE_LESSON',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'GET_ONE_LESSON',
                payload: {},
            })
        }
    }

    const getCurrentLesson = async (user_id) => {
        const { data } = await axios(
            `${API}room/get_lesson/?user_id=${user_id}&hw=true`,
            getConfig()
        )
        dispatch({
            type: 'GET_CURRENT_LESSON',
            payload: data,
        })
    }

    const getTeacher = async () => {
        const { data } = await axios(
            `${API}account/get_teacher_user/`,
            getConfig()
        )
        dispatch({
            type: 'GET_TEACHER',
            payload: data,
        })
    }

    const getStudentProgress = async () => {
        const { data } = await api.get(API_USER_PROGRESS)

        dispatch({ type: 'SET_STUDENT_PROGRESS', payload: data[0] || null })
    }

    const getUser = async () => {
        const { data } = await api.get(API_USER_PROGRESS)
        dispatch({ type: 'SET_USER', payload: data[0]?.user || null })
    }

    const getUserAndProgress = async () => {
        let user = null

        if (isTeacher()) {
            user = (await api.get(TEACHER_PROFILE_API)).data
        } else {
            user = (await api.get(API_USER_PROGRESS)).data[0]?.user
        }

        const { data } = await api.get(API_USER_PROGRESS)

        dispatch({ type: 'SET_USER', payload: user || null })
        dispatch({ type: 'SET_STUDENT_PROGRESS', payload: data[0] || null })
    }

    const cloud = {
        getStudents,
        students: state.students,
        getUsers,
        hwstudents: state.hwstudents,
        getOneHw,
        onehw: state.onehw,
        onelesson: state.onelesson,
        getOneLesson,
        getCurrentLesson,
        currentlesson: state.currentlesson,
        getTeacher,
        teacherInfo: state.teacherInfo,
        user: state.user,
        studentProgress: state.studentProgress,
        getStudentProgress,
        getUser,
        getUserAndProgress,
    }

    return (
        <usersContext.Provider value={cloud}>{children}</usersContext.Provider>
    )
}

export default UsersContextProvider
