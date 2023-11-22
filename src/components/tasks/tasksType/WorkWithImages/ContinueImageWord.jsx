import { count, renderInputs } from '../utils';
import { Button } from 'components/ui';
import { API } from 'helpers/consts';
import { useState } from 'react';

import styles from './ContinueImageWord.module.scss';

const ContinueImageWord = ({ taskDetails, handleAnswer, ids, nextTask }) => {
    const splittedDescription = taskDetails.description.split('\r\n');
    const [results, setResults] = useState({});

    const handleInput = (event, index) => {
        setResults((results) => {
            return { ...results, [index]: event.target.value };
        });
    };

    const formRequest = () => {
        const keys = Object.keys(results);
        const answerTemplate = Array.apply(
            null,
            Array(count(taskDetails.description, '__inp__'))
        ).map(() => 'No answer');

        for (let key of keys) {
            if (results[key].trim() === '') answerTemplate[key] = 'No answer';
            else answerTemplate[key] = results[key];
        }

        return { answers: answerTemplate };
    };

    return (
        <div className={styles.imageWordContainer}>
            <div
                className={`${styles.images} ${
                    taskDetails.images.length > 1 ? '' : styles.oneImage
                }`}
            >
                {taskDetails.images.map(({ image, sentence }, index) => {
                    return (
                        <div className={styles.image} key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                            {sentence && (
                                <p>
                                    {index + 1}. {sentence}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={styles.inputs}>
                {splittedDescription.map((string, index) => {
                    return (
                        <div key={index} className={styles.inputBox}>
                            {string.split('|').map((row, pInd) => {
                                return renderInputs(row, handleInput, pInd);
                            })}
                        </div>
                    );
                })}
            </div>
            <Button
                disabled={
                    !taskDetails ||
                    taskDetails.answers[taskDetails.answers.length - 1]?.passed
                }
                className={styles.submit}
                onClick={() => {
                    handleAnswer(formRequest(), taskDetails.id, ids);
                    nextTask();
                }}
            >
                Submit
            </Button>
        </div>
    );
};

export default ContinueImageWord;
