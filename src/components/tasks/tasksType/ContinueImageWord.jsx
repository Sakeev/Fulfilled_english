import { API } from '../../../helpers/consts';
import { Button } from '@mui/material';
import { useState } from 'react';
import { count, formResultTemplate, transformObj } from './utils';

const ContinueImageWord = ({ caseDetail, handleAnswer, taskId }) => {
    const splittedDescription = caseDetail.description.split('\r\n');
    const [results, setResults] = useState(
        caseDetail.description.includes('|')
            ? formResultTemplate(splittedDescription)
            : {}
    );

    const handleInput = (event, index) => {
        setResults((results) => {
            return { ...results, [index]: event.target.value };
        });
    };

    const formRequest = () => {
        console.log(count(caseDetail.description, '__inp__'));
        const newResults = transformObj(results);
        console.log(newResults);
        const keys = Object.keys(newResults);
        // const answerTemplate = caseDetail.images.map(() => 'No answer');
        const answerTemplate = Array.apply(
            null,
            Array(count(caseDetail.description, '__inp__'))
        ).map(() => 'No answer');
        // const examples = caseDetail.description
        //     .split('\r\n')
        //     .filter((string) => string !== '__inp__');
        // const examplesCount = caseDetail.description
        //     .split('\r\n')
        //     .filter((string) => string !== '__inp__').length;

        for (let key of keys) {
            if (newResults[key].trim() === '')
                answerTemplate[key] = 'No answer';
            else answerTemplate[key] = newResults[key];
        }

        // for (let i = 0; i < examples.length; i++) {
        //     answerTemplate[i] = examples[i];
        // }

        console.log(answerTemplate);
        // answerTemplate.splice(0, examplesCount);

        return { answers: answerTemplate };
    };

    const renderInputs = (row, outerInd, innerInd) => {
        const splittedRow = row.split('__inp__');

        return splittedRow.map((value, index) => {
            return (
                <p key={index}>
                    {value}
                    {index < splittedRow.length - 1 && (
                        <input
                            onChange={(event) => {
                                handleInput(
                                    event,
                                    outerInd * splittedDescription.length +
                                        innerInd
                                );
                            }}
                        />
                    )}
                </p>
            );
        });
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
                {splittedDescription.map((string, index) => {
                    return (
                        <div key={index} className="image-word-input">
                            {string.split('|').map((row, innerInd) => {
                                return renderInputs(row, index, innerInd);
                                // <p key={index}>
                                //     {row === '__inp__' ? (
                                //         <input
                                //             type="text"
                                //             onChange={(event) =>
                                //                 handleInput(event, index)
                                //             }
                                //         />
                                //     ) : (
                                //         row
                                //     )}
                                // </p>
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
