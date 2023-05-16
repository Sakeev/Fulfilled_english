import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

import './tasksType.css';

const Inputs = ({
    descr,
    handleAnswer,
    caseInfo,
    caseDetail,
    handleCaseDetail,
    inputValuesHook,
}) => {
    const [str, setStr] = useState('');
    const { id, task_id } = useParams();
    const [inputValues, setInputValues] = inputValuesHook;

    useEffect(() => {
        setStr(descr);
    }, []);

    useEffect(() => {
        handleCaseDetail(id, task_id);
    }, [id, task_id]);

    useEffect(() => {
        if (caseDetail) {
            setStr(caseDetail?.description);
        }
    }, [caseDetail]);
    const inputCount = str.split('__inp__').length - 1;

    const [obj, setObj] = useState({});

    const handleInputChange = (event, index) => {
        const newInputValues = { ...inputValues, [index]: event.target.value };
        setInputValues(newInputValues);
    };

    const spl = (obj) => {
        let newArr = [];

        for (let index in obj) {
            newArr.push(obj[index]);
        }

        const newObj = {
            answers: newArr.join(','),
        };
        console.log(newObj);
        setObj(newObj);
    };

    console.log(caseInfo.tasks?.[task_id - 1]);

    const inputArr = str.split('__inp__').map((value, index) => {
        return (
            <React.Fragment key={index}>
                {value}
                {index < inputCount && (
                    <TextField
                        variant="filled"
                        onChange={(e) => {
                            e.target.style.width = e.target.value.length + 'ch';
                            handleInputChange(e, index);
                            spl(inputValues);
                        }}
                        value={inputValues[index] || ''}
                    />
                )}
            </React.Fragment>
        );
    });

    return (
        <>
            <p className="task-condition">
                {caseInfo.tasks?.[task_id - 1].condition}
            </p>
            <div className="inputs-container task-types-container">
                <div>{inputArr}</div>
                <Button
                    onClick={() => {
                        handleAnswer(obj, caseInfo.tasks?.[task_id - 1].id);
                    }}
                >
                    send
                </Button>
            </div>
        </>
    );
};

export default Inputs;
