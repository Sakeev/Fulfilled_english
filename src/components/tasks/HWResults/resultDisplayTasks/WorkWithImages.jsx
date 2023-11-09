import { renderOutput } from 'components/tasks/tasksType/utils';
import { API } from 'helpers/consts';

import styles from 'components/tasks/tasksType/WorkWithImages/ContinueImageWord.module.scss';
import answerStyles from '../HWResults.module.scss';

const WorkWithImages = ({ taskDetails, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;
    const splittedDescription = taskDetails.description.split('\r\n');
    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;
    console.log(answers);
    return (
        <div className={styles.imageWordContainer}>
            <div
                className={`${styles.images} ${
                    taskDetails.images.length > 1 ? '' : styles.oneImage
                }`}
            >
                {answer.images.map(({ image, sentence }, index) => {
                    return (
                        <div className={styles.image} key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                            {sentence && (
                                <p>
                                    {index + 1}. {sentence}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={styles.inputs}>
                {splittedDescription.map((string, index) => {
                    return (
                        <div key={index} className={styles.inputBox}>
                            {string.split('|').map((row, pInd) => {
                                return renderOutput(
                                    row,
                                    answerStyles.answer,
                                    answers,
                                    pInd
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkWithImages;
