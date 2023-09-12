import { Fragment, useEffect, useState } from 'react';
import { Button } from 'components/ui';
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

    const listItems = description.split('\\li');

    console.log(inputValues);

    const output = listItems.map((listItem, outerInd) => {
        const splittedRows = listItem
            .split('\r\n')
            .filter((splittedRow) => splittedRow.length > 0);

        return (
            <li className={styles.input} key={outerInd}>
                {splittedRows.map((rows, index) => {
                    const splittedRow = rows.split('__inp__');

                    return (
                        <div className={styles.row} key={index}>
                            {splittedRow.map((value, innerInd) => {
                                return (
                                    <Fragment key={innerInd}>
                                        <span>{value}</span>
                                        {innerInd < splittedRow.length - 1 && (
                                            <input
                                                onChange={(event) => {
                                                    handleInputChange(
                                                        event,
                                                        outerInd * 10 + index
                                                    );
                                                }}
                                                value={
                                                    inputValues[
                                                        outerInd * 10 + index
                                                    ] || ''
                                                }
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                        </div>
                    );
                })}
            </li>
        );
    });

    return (
        <div className={styles.inputsContainer}>
            {taskDetails.audio && (
                <div className={styles.audio}>
                    <audio src={taskDetails.audio} controls />
                </div>
            )}
            <ol className={styles.inputs}>{output}</ol>
            {!displayDataType && (
                <Button
                    disabled={!taskDetails.id}
                    onClick={() => {
                        handleAnswer(formAnswer(inputValues), taskDetails.id);
                    }}
                >
                    Submit
                </Button>
            )}
        </div>
    );
};

export default Inputs;
