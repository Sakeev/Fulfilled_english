import { useState, useEffect } from 'react';

import styles from './BuildSentence.module.scss';

const BuildSentence = ({ id, sentence, setResults }) => {
    const [words, _] = useState(sentence.split(' '));
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        setResults((results) => {
            return { ...results, [id]: answer };
        });
    }, [answer]);

    const handleWord = (ind) => {
        const pickedWord = words.splice(ind, 1);

        setAnswer((answer) => [...answer, ...pickedWord]);
    };

    const handleWordBack = (ind) => {
        words.splice(ind, 0, answer[ind]);
        let newAns = [...answer];
        newAns.splice(ind, 1);
        setAnswer(newAns);
    };

    return (
        <div className={styles.taskContainer}>
            <div className={styles.words}>
                {words.map((word, ind) => (
                    <span
                        key={ind}
                        className={styles.word}
                        onClick={() => {
                            handleWord(ind);
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <div className={styles.answerBlock}>
                {answer?.map((item, ind) => (
                    <p
                        className={styles.pickedWord}
                        key={ind}
                        onClick={() => {
                            handleWordBack(ind);
                        }}
                    >
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default BuildSentence;
