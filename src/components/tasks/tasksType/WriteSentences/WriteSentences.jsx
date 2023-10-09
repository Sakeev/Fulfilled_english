import { renderInputs } from '../utils';
import { Button } from 'components/ui';
import { API } from 'helpers/consts';
import { useState } from 'react';

import styles from './WriteSentences.module.scss';

const WriteSentences = ({ taskDetails, handleAnswer, taskId }) => {
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

        console.log(resultsCopy);

        return { answers: resultsCopy };
    };

    return (
        <div className={styles.writeSentencesContainer}>
            <div className={styles.images}>
                {taskDetails.images.map(
                    ({ image, sentence, additional_info }, index) => {
                        return (
                            <div className={styles.image} key={image}>
                                <img src={`${API}${image}`} alt="exercise" />
                                {/* {sentence && (
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
                                </ul> */}
                            </div>
                        );
                    }
                )}
            </div>
            <div className={styles.inputColumns}>
                {Object.keys(taskDetails.description).map((key, index) => (
                    <div className={styles.inputColumn} key={index}>
                        <p className={styles.header}>{key}</p>
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
                className={styles.submit}
                onClick={() => {
                    handleAnswer(formRequest(), taskId);
                }}
            >
                Submit
            </Button>
        </div>
    );
};

export default WriteSentences;