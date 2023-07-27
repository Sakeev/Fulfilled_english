import { useEffect, useState, Fragment } from 'react';
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
    displayDataType,
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
        const { value } = event.target;
        const newInputValues = { ...inputValues, [index]: value };
        setInputValues(newInputValues);
    };

    const spl = (obj) => {
        let newArr = [];

        for (let index in obj) {
            newArr.push(obj[index]);
        }

        const newObj = {
            answers: newArr,
        };
        console.log(newArr);
        setObj(newObj);
    };

    const rows = str.split('\r\n');

    const output = rows.map((row, outerInd) => {
        const splittedRow = row.split('__inp__');

        return (
            <div key={outerInd}>
                {splittedRow.map((value, index) => (
                    <Fragment key={index}>
                        {value}
                        {index < splittedRow.length - 1 && (
                            <TextField
                                variant="filled"
                                onChange={(e) => {
                                    e.target.style.width =
                                        e.target.value.length + 'ch';
                                    const { value } = e.target; // Получаем самое последнее значение
                                    handleInputChange(e, outerInd);
                                    setTimeout(() => {
                                        spl({
                                            ...inputValues,
                                            [outerInd]: value,
                                        }); // Передаем обновленное значение
                                    }, 0);
                                }}
                                value={inputValues[outerInd] || ''}
                            />
                        )}
                    </Fragment>
                ))}
            </div>
        );
    });

    // console.log(caseDetail);

    // let inputArr = str.split('__inp__').map((value, index) => {
    //     return (
    //         <Fragment key={index}>
    //             {value}
    //             {index < inputCount && (
    //                 <TextField
    //                     variant="filled"
    //                     onChange={(e) => {
    //                         e.target.style.width = e.target.value.length + 'ch';
    //                         const { value } = e.target; // Получаем самое последнее значение
    //                         handleInputChange(e, index);
    //                         setTimeout(() => {
    //                             spl({ ...inputValues, [index]: value }); // Передаем обновленное значение
    //                         }, 0);
    //                     }}
    //                     value={inputValues[index] || ''}
    //                 />
    //             )}
    //         </Fragment>
    //     );
    // });

    return (
        <div className="inputs-container task-types-container">
            {caseDetail.audio && (
                <div>
                    <audio src={caseDetail.audio} controls />
                </div>
            )}
            <div>{output}</div>
            {!displayDataType && (
                <Button
                    className="hw__send-btn"
                    onClick={() => {
                        handleAnswer(obj, caseInfo.tasks?.[task_id - 1].id);
                    }}
                >
                    send
                </Button>
            )}
        </div>
    );
};

export default Inputs;
