import React, { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";
import { API } from "../helpers/consts";
import api from "../http";

export const essayContext = createContext();

const INIT_STATE = {
    essay: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_ESSAY":
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
            const { data } = await api.get(`${API}room/essa/`);

            dispatch({
                type: "GET_ESSAY",
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
