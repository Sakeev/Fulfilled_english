import { useState, useEffect } from 'react';
import { Button } from 'components/ui';
import { colors } from './utils';

import styles from './ConnectWords.module.scss';

const ConnectWords = ({ handleAnswer, taskDetails }) => {
    const [wordsPairs, setWordsPairs] = useState([]);

    const [firstColumn, setFirstColumn] = useState(null);
    const [secondColumn, setSecondColumn] = useState(null);

    useEffect(() => {
        if (taskDetails) {
            setFirstColumn(taskDetails?.description1);
            setSecondColumn(taskDetails?.description2);
        }
    }, [taskDetails]);

    const isWordInArr = (index) => {
        if (wordsPairs.length === 0) return false;

        for (let wordsPair of wordsPairs) {
            for (let word of wordsPair) {
                if (word.id === index) return true;
            }
        }

        return false;
    };

    const handleWord = (item, index, event) => {
        let newWordsPairs = JSON.parse(JSON.stringify(wordsPairs));

        if (isWordInArr(index)) {
            for (let i in newWordsPairs) {
                for (let j in newWordsPairs[i]) {
                    if (newWordsPairs[i][j].id === index) {
                        newWordsPairs[i].splice(j, 1);
                        event.target.style.backgroundColor = '#f2f2f2';
                        break;
                    }
                }
            }
        } else {
            let added = false;

            for (let i in newWordsPairs) {
                if (newWordsPairs[i].length < 2) {
                    if (
                        newWordsPairs[i].length !== 0 &&
                        ((newWordsPairs[i][0].id < firstColumn.length &&
                            index < firstColumn.length) ||
                            (newWordsPairs[i][0].id >= firstColumn.length &&
                                index >= firstColumn.length))
                    )
                        return;
                    newWordsPairs[i].push({
                        word: item,
                        picked: true,
                        id: index,
                    });
                    added = true;
                    event.target.style.backgroundColor = colors[i];
                    break;
                }
            }

            if (!added) {
                newWordsPairs.push([
                    {
                        word: item,
                        picked: true,
                        id: index,
                    },
                ]);
                event.target.style.backgroundColor =
                    colors[newWordsPairs.length - 1];
            }
        }
        setWordsPairs(newWordsPairs);
    };

    const formObj = () => {
        const answer = [];

        for (let i = 0; i < firstColumn.length; i++) {
            answer.push(['No answer', 'No answer']);
        }

        for (let i = 0; i < wordsPairs.length; i++) {
            for (let j = 0; j < wordsPairs[i].length; j++) {
                answer[i][j] = wordsPairs[i][j].word.toLowerCase();
            }
        }

        return {
            answers: answer,
        };
    };

    return (
        <div className={styles.connectWords}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    {firstColumn?.map((word, index) => (
                        <Button
                            key={index}
                            className={styles.button}
                            onClick={(event) => {
                                handleWord(word, index, event);
                            }}
                        >
                            {word}
                        </Button>
                    ))}
                </div>
                <div className={styles.column}>
                    {secondColumn?.map((word, index) => (
                        <Button
                            key={index + firstColumn?.length}
                            className={styles.button}
                            onClick={(event) =>
                                handleWord(
                                    word,
                                    index + firstColumn?.length,
                                    event
                                )
                            }
                        >
                            {word}
                        </Button>
                    ))}
                </div>
            </div>
            <Button
                disabled={!taskDetails}
                className={styles.submit}
                onClick={() => handleAnswer(formObj(), taskDetails.id)}
            >
                Submit
            </Button>
        </div>
    );
};

export default ConnectWords;
