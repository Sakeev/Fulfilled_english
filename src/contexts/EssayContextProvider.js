import React, { createContext, useContext, useReducer } from 'react';
import { API } from '../helpers/consts';
import api from '../http';

export const essayContext = createContext();

const INIT_STATE = {
    essay: {},
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_ESSAY':
            return { ...state, essay: action.payload };
        default:
            return state;
    }
};

export const useEssay = () => {
    return useContext(essayContext);
};

const EssayContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const getEssay = async () => {
        try {
            let { data } = await api.get(`${API}room/essa/`);

            if (data.length === 0) {
                data = [{ id: -1 }];
            }

            dispatch({
                type: 'GET_ESSAY',
                payload: data[0],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const values = {
        essay: state.essay,
        getEssay,
    };

    return (
        <essayContext.Provider value={values}>{children}</essayContext.Provider>
    );
};

export default EssayContextProvider;
