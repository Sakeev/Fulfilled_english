import { API } from '../../../helpers/consts';
import { Button } from '@mui/material';
import { useState } from 'react';

const WriteSentencesWithGivenInfo = ({ caseDetail, handleAnswer, taskId }) => {
    const formAnswerTemplate = () => {
        const answerTemplate = {};

        for (let [key, value] of Object.entries(caseDetail.description)) {
            answerTemplate[key] = value.map((sentence) =>
                sentence === '__inp__' ? '' : sentence
            );
        }

        return answerTemplate;
    };

    const [results, setResults] = useState(formAnswerTemplate());
    const titles = Object.keys(caseDetail.description);

    const handleInput = (event, title, innerInd) => {
        setResults((results) => {
            const newAnswer = [...results[title]];
            newAnswer[innerInd] = event.target.value;
            return { ...results, [title]: newAnswer };
        });
    };

    const formObj = () => {
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

    console.log(results);

    return (
        <div className="ws-w-given-info-container task-types-container">
            <div className="ws-w-given-info-image-box-wrapper">
                {caseDetail.images.map(
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
                {Object.keys(caseDetail.description).map((key, index) => (
                    <div className="ws-w-given-info-input-column" key={index}>
                        <p>{key}</p>
                        <ol>
                            {Object.values(caseDetail.description)[index].map(
                                (value, innerInd) => (
                                    <li key={innerInd}>
                                        {value === '__inp__' ? (
                                            <>
                                                <input
                                                    type="text"
                                                    onChange={(event) =>
                                                        handleInput(
                                                            event,
                                                            titles[index],
                                                            innerInd
                                                        )
                                                    }
                                                />
                                            </>
                                        ) : (
                                            value
                                        )}
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
                    handleAnswer(formObj(), taskId);
                }}
            >
                send
            </Button>
        </div>
    );
};

export default WriteSentencesWithGivenInfo;