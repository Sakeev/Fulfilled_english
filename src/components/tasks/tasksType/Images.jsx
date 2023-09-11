import { API } from '../../../helpers/consts';
import { Button } from '@mui/material';
import { useState } from 'react';
import { renderInputs } from './utils';

const Images = ({ taskDetails, handleAnswer, taskId }) => {
    const [results, setResults] = useState({});

    const handleInput = (event, index) => {
        setResults((results) => {
            return { ...results, [index]: event.target.value };
        });
    };

    const formRequest = () => {
        const keys = Object.keys(results);
        const answerTemplate = taskDetails.images.map((image) =>
            image.sentence === '__inp__' ? '' : image.sentence
        );
        const examplesCount = answerTemplate.filter(
            (template) => template !== ''
        ).length;

        for (let key of keys) {
            answerTemplate[key] = results[key];
        }

        answerTemplate.splice(0, examplesCount);

        return { answers: answerTemplate };
    };

    return (
        <div className="images-container task-types-container">
            <div className="images-image-box-wrapper">
                {taskDetails.images.map(({ image, sentence }) => {
                    return (
                        <div className="images-image-box" key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                            {/* {renderInputs(sentence, handleInput)} */}
                            {sentence.split('|').map((row) => {
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

export default Images;
