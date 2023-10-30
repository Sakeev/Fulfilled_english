import React, { useContext, useReducer, useState } from 'react';
import { createContext } from 'react';
import { API } from 'helpers/consts';
import api from 'http';

export const tasksContext = createContext();

export const useTasks = () => {
    return useContext(tasksContext);
};

const INIT_STATE = {
    tasks: [],
    answers: [],
    cases: [],
    taskDetails: null,
    caseInfo: {},
    pastLessons: [],
    studentsLessons: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return { ...state, tasks: action.payload };
        case 'SET_TASK_DETAILS':
            return { ...state, taskDetails: action.payload };
        case 'GET_TASK_DETAILS':
            return { ...state, taskDetails: action.payload };
        case 'ANSWERS':
            return { ...state, answers: action.payload };
        case 'CASE':
            return { ...state, cases: action.payload };
        case 'CASE_INFO':
            return { ...state, caseInfo: action.payload };
        case 'GET_PAST_LESSONS':
            return {
                ...state,
                pastLessons: action.payload,
            };
        case 'GET_STUDENT_LESSONS':
            return { ...state, studentsLessons: action.payload };
        default:
            return state;
    }
};
const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    const [loading, setLoading] = useState(false);

    const setTaskDetails = (taskDetails) => {
        dispatch({
            type: 'SET_TASK_DETAILS',
            payload: taskDetails,
        });
    };

    const handleTask = async () => {
        try {
            const res = await api.get(`${API}room/tasks/`);

            dispatch({
                type: 'GET_TASKS',
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getAnswers = async () => {
        try {
            const res = await api.get(`${API}room/answers/`);

            dispatch({
                type: 'ANSWERS',
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const updateAnswer = async (id, fields) => {
        try {
            await api.patch(`${API}room/answers/${id}/`, fields);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAnswer = async (obj, id) => {
        try {
            console.log(obj);
            await api.post(`${API}room/tasks/${id}/answer/`, obj);
        } catch (error) {
            console.log(error);
        }
    };

    const getCases = async (id) => {
        const { data } = await api.get(
            `${API}room/get_lesson/?hw=true${id ? '&user_id=' + id : ''}`
        );

        dispatch({
            type: 'CASE',
            payload: data,
        });
    };

    const getTaskDetails = async (caseId, taskId, userId) => {
        const { data } = await api.get(
            `${API}room/case_tasks/${caseId}/?task=${taskId}${
                userId ? `&user_id=${userId}` : ''
            }`
        );

        dispatch({
            type: 'GET_TASK_DETAILS',
            payload: data,
        });
    };

    const getCaseInfo = async (id, userId) => {
        const { data } = await api.get(
            `${API}room/case_tasks/${id}/${userId ? '?user_id=' + userId : ''}`
        );
        dispatch({
            type: 'CASE_INFO',
            payload: data,
        });
    };

    const getPastLessons = async () => {
        const { data } = await api.get(`${API}room/get_deactivated_lessons/
        `);

        dispatch({
            type: 'GET_PAST_LESSONS',
            payload: data,
        });
    };

    const getStudentLessons = async (id) => {
        setLoading(true);
        const { data } = await api.get(
            `${API}room/get_deactivated_lessons/?user_id=${id}&hw=true`
        );

        dispatch({
            type: 'GET_STUDENT_LESSONS',
            payload: data,
        });
        setLoading(false);
    };

    const values = {
        loading,
        dispatch,
        getTaskDetails,
        taskDetails: state.taskDetails,
        getCases,
        cases: state.cases,
        handleTask,
        tasks: state.tasks,
        handleAnswer,
        getAnswers,
        updateAnswer,
        answers: state.answers,
        getCaseInfo,
        caseInfo: state.caseInfo,
        getPastLessons,
        pastLessons: state.pastLessons,
        getStudentLessons,
        studentsLessons: state.studentsLessons,
        setTaskDetails,
    };

    return (
        <tasksContext.Provider value={values}>{children}</tasksContext.Provider>
    );
};

export default TasksContextProvider;
