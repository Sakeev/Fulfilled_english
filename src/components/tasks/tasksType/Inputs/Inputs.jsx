import { Fragment, useEffect, useState } from 'react';
import { Button, Input } from 'components/ui';
import { formAnswer } from './utils';
import { parseId } from '../utils';

import styles from './Inputs.module.scss';

const Inputs = ({ handleAnswer, taskDetails, ids }) => {
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
                                const [id, string] = parseId(value);

                                if (string.length === 0) return null;

                                return (
                                    <Fragment key={innerInd}>
                                        <span>{string}</span>
                                        {innerInd < splittedRow.length - 1 && (
                                            <Input
                                                onChange={(event) => {
                                                    handleInputChange(
                                                        event,
                                                        id
                                                    );
                                                }}
                                                value={inputValues[id] || ''}
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
            {taskDetails?.audio && (
                <div className={styles.audio}>
                    <audio src={taskDetails.audio} controls />
                </div>
            )}
            <ol
                className={`${styles.inputs} ${
                    listItems.length === 1 ? styles.hideOrdering : ''
                }`}
            >
                {output}
            </ol>
            <Button
                disabled={
                    !taskDetails ||
                    taskDetails.answers[taskDetails.answers.length - 1]?.passed
                }
                className={styles.submit}
                onClick={() => {
                    handleAnswer(
                        formAnswer(inputValues, taskDetails),
                        taskDetails.id,
                        ids
                    );
                }}
            >
                Submit
            </Button>
        </div>
    );
};

export default Inputs;
