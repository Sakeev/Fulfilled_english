import { API } from '../../../helpers/consts';
import { Button } from '@mui/material';
import { useState } from 'react';
import { count, renderInputs } from './utils';

const ContinueImageWord = ({ taskDetails, handleAnswer, taskId }) => {
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
        <div className="image-word-container task-types-container">
            <div className="image-word-image-box-wrapper">
                {taskDetails.images.map(({ image, sentence }, index) => {
                    return (
                        <div className="image-word-image-box" key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                            <p>
                                {index + 1}. {sentence}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="image-word-inputs">
                {splittedDescription.map((string, index) => {
                    return (
                        <div key={index} className="image-word-input">
                            {string.split('|').map((row) => {
                                return renderInputs(row, handleInput);
                            })}
                        </div>
                    );
                })}
            </div>
            <Button
                className="hw__send-btn"
                onClick={() => {
                    handleAnswer(formRequest(), taskId);
                }}
            >
                send
            </Button>
        </div>
    );
};

export default ContinueImageWord;
