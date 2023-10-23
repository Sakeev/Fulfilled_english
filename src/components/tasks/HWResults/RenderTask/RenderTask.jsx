import { useTaskResultsComponent } from './utils';
import { isTeacher } from 'helpers/funcs';

import questionMark from 'assets/icons/question_mark.svg';
import incorrectIcon from 'assets/icons/incorrect.svg';
import correctIcon from 'assets/icons/correct.svg';

import styles from './RenderTask.module.scss';

const RenderTask = ({ taskDetails, displayDataType = null }) => {
    const taskResultsComponent = useTaskResultsComponent(
        taskDetails,
        displayDataType
    );

    if (taskDetails === null) return <></>;

    if (!taskDetails.answers[taskDetails.answers.length - 1])
        return <h2>This task hasn't done yet</h2>;

    const answer = taskDetails.answers[taskDetails.answers.length - 1];

    const showAccuracy = () => {
        if (taskDetails.right_answer === '' && !answer?.checked) {
            return <img src={questionMark} alt="question mark" />;
        }

        if (displayDataType === 'teacher' || answer.accepted) {
            return <img src={correctIcon} alt="correct" />;
        } else {
            return <img src={incorrectIcon} alt="incorrect" />;
        }
    };

    return (
        <div className={styles.renderTask}>
            <p className={styles.answerType}>
                {displayDataType === 'teacher'
                    ? 'Correct'
                    : isTeacher()
                    ? 'Student'
                    : 'Your'}{' '}
                answer
            </p>
            <div className={styles.taskWrapper}>
                <div className={styles.task}>{taskResultsComponent}</div>
                <div className={styles.taskAccuracy}>{showAccuracy()}</div>
            </div>
        </div>
    );
};

export default RenderTask;
