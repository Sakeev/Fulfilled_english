import './resultDisplayTasks.css';

import styles from '../../tasksType/ConnectWords/ConnectWords.module.scss';
import { Button } from 'components/ui';

const ConnectWords = ({ task, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    let answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    if (displayDataType === 'teacher') {
        answers = answers
            .split(',')
            .map((wordPair) => wordPair.trim().split(' '));
    }

    return (
        <div>
            <div>
                {answers.map((wordPair, index) => (
                    <p key={index}>
                        {wordPair[0]} - {wordPair[1]}
                    </p>
                ))}
            </div>
        </div>
        // <div className={styles.connectWords}>
        //     <div className={styles.columns}>
        //         <div className={styles.column}>
        //             {firstColumn?.map((word, index) => (
        //                 <Button
        //                     key={index}
        //                     className={styles.button}
        //                     onClick={(event) => {
        //                         handleWord(word, index, event);
        //                     }}
        //                 >
        //                     {word}
        //                 </Button>
        //             ))}
        //         </div>
        //         <div className={styles.column}>
        //             {secondColumn?.map((word, index) => (
        //                 <Button
        //                     key={index + firstColumn?.length}
        //                     className={styles.button}
        //                     onClick={(event) =>
        //                         handleWord(
        //                             word,
        //                             index + firstColumn?.length,
        //                             event
        //                         )
        //                     }
        //                 >
        //                     {word}
        //                 </Button>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    );
};

export default ConnectWords;
