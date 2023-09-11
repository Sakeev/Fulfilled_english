import { useEffect, useState } from 'react';
import { formAnswer } from './utils';

import styles from './Inputs.module.scss';

const Inputs = ({ handleAnswer, taskDetails, displayDataType }) => {
    const [description, setDescription] = useState('');
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        if (taskDetails) {
            setDescription(taskDetails?.description);
        }
    }, [taskDetails]);

    const handleInputChange = (event, index) => {
        const { value } = event.target;
        const newInputValues = { ...inputValues, [index]: value };
        setInputValues(newInputValues);
    };

    const rows = description.split('\r\n');

    console.log(taskDetails);

    const output = rows.map((row, outerInd) => {
        const splittedRow = row.split('__inp__');

        return (
            <li className={styles.input} key={outerInd}>
                {splittedRow.map((value, index) => (
                    <>
                        <span>{value}</span>
                        {index < splittedRow.length - 1 && (
                            <input
                                onChange={(event) => {
                                    handleInputChange(event, outerInd);
                                }}
                                value={inputValues[outerInd] || ''}
                            />
                        )}
                    </>
                ))}
            </li>
        );
    });

    return (
        <div className={styles.inputs}>
            {taskDetails.audio && (
                <div className={styles.audio}>
                    <audio src={taskDetails.audio} controls />
                </div>
            )}
            <ul>{output}</ul>
            {!displayDataType && (
                <button
                    disabled={!taskDetails.id}
                    onClick={() => {
                        handleAnswer(formAnswer(inputValues), taskDetails.id);
                    }}
                >
                    send
                </button>
            )}
        </div>
    );
};

export default Inputs;
