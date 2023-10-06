import { Button } from 'components/ui';
import { renderInputs } from '../utils';
import { API } from 'helpers/consts';
import { useState } from 'react';

import styles from './Images.module.scss';

const Images = ({ taskDetails, handleAnswer }) => {
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
        <div className={styles.imagesContainer}>
            <div className="images-image-box-wrapper">
                {taskDetails.images.map(({ image, sentence }) => {
                    return (
                        <div className="images-image-box" key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                            {sentence.split('|').map((row) => {
                                return renderInputs(row, handleInput);
                            })}
                        </div>
                    );
                })}
            </div>
            <Button
                className={styles.submit}
                onClick={() => {
                    handleAnswer(formRequest(), taskDetails.id);
                }}
            >
                send
            </Button>
        </div>
    );
};

export default Images;
