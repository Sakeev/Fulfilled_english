import { API } from '../../../helpers/consts';
import { renderInputs } from './utils';
import { Button } from '@mui/material';
import { useState } from 'react';

const WriteSentencesWithGivenInfo = ({ taskDetails, handleAnswer, taskId }) => {
    const formAnswerTemplate = () => {
        const answerTemplate = {};

        for (let [key, value] of Object.entries(taskDetails.description)) {
            answerTemplate[key] = value.map((sentence) =>
                sentence.includes('__inp__') ? '' : sentence
            );
        }

        return answerTemplate;
    };

    const [results, setResults] = useState(formAnswerTemplate());
    const titles = Object.keys(taskDetails.description);

    const handleInput = (event, title, innerInd) => {
        setResults((results) => {
            const newAnswer = [...results[title]];
            newAnswer[innerInd] = event.target.value;
            return { ...results, [title]: newAnswer };
        });
    };

    const formRequest = () => {
        const resultsCopy = JSON.parse(JSON.stringify(results));

        for (let key in resultsCopy) {
            for (let i in resultsCopy[key]) {
                if (resultsCopy[key][i].trim() === '') {
                    resultsCopy[key][i] = 'No answer';
                }
            }
        }

        return { answers: resultsCopy };
    };

    return (
        <div className="ws-w-given-info-container task-types-container">
            <div className="ws-w-given-info-image-box-wrapper">
                {taskDetails.images.map(
                    ({ image, sentence, additional_info }, index) => {
                        return (
                            <div
                                className="ws-w-given-info-image-box"
                                key={image}
                            >
                                <img src={`${API}${image}`} alt="exercise" />
                                {sentence && (
                                    <p>
                                        {index + 1}. {sentence}
                                    </p>
                                )}
                                <ul>
                                    {additional_info &&
                                        additional_info
                                            .split('\r\n')
                                            .map((line, index) => (
                                                <li key={index}>{line}</li>
                                            ))}
                                </ul>
                            </div>
                        );
                    }
                )}
            </div>
            <div className="ws-w-given-info-input-columns">
                {Object.keys(taskDetails.description).map((key, index) => (
                    <div className="ws-w-given-info-input-column" key={index}>
                        <p>{key}</p>
                        <ol>
                            {Object.values(taskDetails.description)[index].map(
                                (value, innerInd) => (
                                    <li key={innerInd}>
                                        {value.split('|').map((row) => {
                                            return renderInputs(row, (event) =>
                                                handleInput(
                                                    event,
                                                    titles[index],
                                                    innerInd
                                                )
                                            );
                                        })}
                                    </li>
                                )
                            )}
                        </ol>
                    </div>
                ))}
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

export default WriteSentencesWithGivenInfo;
