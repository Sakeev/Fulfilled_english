import { useState } from 'react';
import { useEffect } from 'react';

import './../tasksType.css';

const styles = {
    word: {
        bgcolor: '#e7e7e7',
        padding: '2px 10px',
        margin: '5px',
        borderRadius: '10px',
        transition: '100ms',
        cursor: 'pointer',
        '&:hover': {
            bgcolor: '#9bd0cb',
        },
    },
};

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
        <div className="sentence-container task-types-container">
            <div className="sentence-task-box-wrapper">
                <div className="sentence-task-box">
                    <div className="sentence-word">
                        {words.map((word, ind) => (
                            <span
                                key={ind}
                                sx={styles.word}
                                onClick={() => {
                                    handleWord(ind);
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                    <div
                        className="build-sentences-answer-block"
                        sx={styles.answer_block}
                    >
                        {answer?.map((item, ind) => (
                            <p
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
            </div>
        </div>
    );
};

export default BuildSentence;
