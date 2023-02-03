import React, { createContext, useContext, useReducer } from 'react';
import { API } from '../helpers/consts';
import api from '../http';

export const essayContext = createContext();

const INIT_STATE = {
    essay: {},
    essays: [
        {
            id: 1,
            title: 'About myself',
            description:
                'Write an essay about yourself. Essay have to contain at least 100 words.',
            text: 'ERTAY GAY',
            teacher_text: '',
            checked: false,
            accepted: true,
            student: 3,
            teacher: 4,
            deadline: '12.02.2023',
        },
        {
            id: 8,
            title: 'About myself',
            description:
                'Write an essay about yourself. Essay have to contain at least 100 words.',
            text: '',
            teacher_text: '',
            checked: false,
            accepted: false,
            student: 5,
            teacher: 4,
            deadline: '24.03.2023',
        },
    ],
    students: [
        {
            id: 3,
            email: 'jbarakanov@gmail.com',
            username: 'jaanger',
            date_joined: '2023-01-29T18:12:10.520592Z',
            about: '',
        },
        {
            id: 5,
            email: 'jbarakanov@inbox.ru',
            username: 'jaga',
            date_joined: '2023-01-29T18:31:32.390189Z',
            about: '',
        },
    ],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_ESSAY':
            return { ...state, essay: action.payload };
        case 'GET_ESSAYS':
            return { ...state, essays: action.payload };
        case 'GET_STUDENTS':
            return { ...state, students: action.payload };
        case 'SET_STUDENTS':
            return { ...state, students: action.payload };
        default:
            return state;
    }
};

export const useEssay = () => {
    return useContext(essayContext);
};

const EssayContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const getEssay = async (id = undefined) => {
        try {
            if (id) {
                const { data } = await api.get(`${API}room/essa/${id}/`);

                dispatch({
                    type: 'GET_ESSAY',
                    payload: data,
                });
            } else {
                let { data } = await api.get(`${API}room/essa/`);

                if (data.length === 0) {
                    data = [{ id: -1 }];
                }

                dispatch({
                    type: 'GET_ESSAY',
                    payload: data[0],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getEssays = async () => {
        try {
            let { data } = await api.get(`${API}room/essa/`);

            console.log(data);

            dispatch({
                type: 'GET_ESSAYS',
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getStudents = async () => {
        try {
            let { data } = await api.get(`${API}account/users/`);

            dispatch({
                type: 'GET_STUDENTS',
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const values = {
        essay: state.essay,
        getEssay,
        essays: state.essays,
        getEssays,
        students: state.students,
        getStudents,
    };

    return (
        <essayContext.Provider value={values}>{children}</essayContext.Provider>
    );
};

export default EssayContextProvider;
