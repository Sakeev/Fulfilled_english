import { API } from '../../../helpers/consts';
import React, { useState } from 'react';
import { Button } from '@mui/material';

const ContinueImageWord = ({ caseDetail, handleAnswer, taskId }) => {
    const [results, setResults] = useState({});

    const handleInput = (event, index) => {
        setResults((results) => {
            return { ...results, [index]: event.target.value };
        });
    };

    const formRequest = () => {
        const keys = Object.keys(results);
        const answerTemplate = caseDetail.images.map(() => 'No answer');
        const examples = caseDetail.description
            .split('\r\n')
            .filter((string) => string !== '__inp__');
        // const examplesCount = caseDetail.description
        //     .split('\r\n')
        //     .filter((string) => string !== '__inp__').length;

        for (let key of keys) {
            if (results[key].trim() === '') answerTemplate[key] = 'No answer';
            else answerTemplate[key] = results[key];
        }

        for (let i = 0; i < examples.length; i++) {
            answerTemplate[i] = examples[i];
        }
        // answerTemplate.splice(0, examplesCount);

        return { answers: answerTemplate };
    };

    console.log(results);

    return (
        <div className="image-word-container task-types-container">
            <div className="image-word-image-box-wrapper">
                {caseDetail.images.map(({ image, sentence }, index) => {
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
                {caseDetail?.description.split('\r\n').map((string, index) => {
                    return (
                        <p key={index}>
                            {string === '__inp__' ? (
                                <>
                                    {index + 1}.{' '}
                                    <input
                                        type="text"
                                        onChange={(event) =>
                                            handleInput(event, index)
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    {index + 1}. {string}
                                </>
                            )}
                        </p>
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
