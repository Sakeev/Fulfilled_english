import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import { API } from '../helpers/consts';
import api from '../http';

export const essayContext = createContext();

const INIT_STATE = {
    essay: {},
    essays: [],
    student: {},
    students: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_ESSAY':
            return { ...state, essay: action.payload };
        case 'GET_ESSAYS':
            return { ...state, essays: action.payload };
        case 'GET_STUDENT':
            return { ...state, student: action.payload };
        case 'GET_STUDENTS':
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStudents();
        getEssays();
    }, []);

    const getEssay = async (id = undefined) => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const getEssays = async () => {
        try {
            setLoading(true);
            let { data } = await api.get(`${API}room/essa/`);

            dispatch({
                type: 'GET_ESSAYS',
                payload: data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStudent = async (id) => {
        try {
            setLoading(true);
            let { data } = await api.get(`${API}account/profile/${id}/`);
            console.log(data);

            dispatch({
                type: 'GET_STUDENT',
                payload: data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStudents = async () => {
        try {
            setLoading(true);
            let { data } = await api.get(`${API}account/users/`);

            dispatch({
                type: 'GET_STUDENTS',
                payload: data,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateEssay = async (essayId, newTitle) => {
        try {
            setLoading(true);

            await api.patch(`${API}room/essa/${essayId}/`, newTitle);

            getEssays();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStudentEssay = (id) => {
        const studentEssay = state.essays.filter(
            (essay) => essay.student === id
        );
        const noEssay = { title: 'No essay', deadline: '-', text: '' };

        if (studentEssay.length) return studentEssay[0];
        else return noEssay;
    };

    const values = {
        essay: state.essay,
        getEssay,
        essays: state.essays,
        getEssays,
        student: state.student,
        students: state.students,
        getStudent,
        getStudents,
        updateEssay,
        getStudentEssay,
        loading,
    };

    return (
        <essayContext.Provider value={values}>{children}</essayContext.Provider>
    );
};

export default EssayContextProvider;
