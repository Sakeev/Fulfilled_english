import WriteSentencesWithGivenInfo from '../resultDisplayTasks/WriteSentencesWithGivenInfo';
import WorkWithImages from '../resultDisplayTasks/WorkWithImages';
import DescribeImages from '../resultDisplayTasks/DescribeImages';
import { useTasks } from 'contexts/TasksContextProvider';
import ConnectWords from '../resultDisplayTasks/ConnectWords';
import Inputs from '../resultDisplayTasks/Inputs';
import BuildDialog from '../resultDisplayTasks/BuildDialog';
import BuildSentences from '../resultDisplayTasks/BuildSentences';

import correctIcon from 'assets/icons/correct.svg';
import incorrectIcon from 'assets/icons/incorrect.svg';

import styles from './RenderTask.module.scss';
import Table from '../resultDisplayTasks/Table';

const RenderTask = ({ taskDetails, id, displayDataType = null }) => {
    const { getTaskDetails, handleAnswer, caseInfo } = useTasks();

    if (
        taskDetails === null ||
        (taskDetails.right_answer === '' && displayDataType === 'teacher')
    )
        return <></>;
    if (!taskDetails.answers[taskDetails.answers.length - 1])
        return <h2>This task hasn't done yet</h2>;

    let component = null;

    switch (taskDetails?.implemented_case) {
        case 'missing word':
            component = (
                <Inputs
                    task={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'build sentence':
            component = (
                <BuildSentences
                    task={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'build dialog':
            component = (
                <BuildDialog
                    taskDetails={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'connect words':
            component = (
                <ConnectWords
                    task={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'table':
            component = (
                <Table
                    taskDetails={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'describe image':
            component = (
                <DescribeImages
                    task={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;
        case 'work with images':
            component = (
                <WorkWithImages
                    taskDetails={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        case 'write sentences with given info':
            component = (
                <WriteSentencesWithGivenInfo
                    taskDetails={taskDetails}
                    answer={
                        taskDetails.answers[taskDetails.answers.length - 1] ||
                        null
                    }
                    displayDataType={displayDataType}
                />
            );
            break;

        default:
            component = null;
    }

    return (
        <div className={styles.renderTask}>
            <p className={styles.answerType}>
                {displayDataType === 'teacher' ? 'Correct' : 'Your'} answer
            </p>
            <div className={styles.taskWrapper}>
                <div className={styles.task}>{component}</div>
                <div className={styles.taskAccuracy}>
                    {displayDataType === 'teacher' ? (
                        <img src={correctIcon} alt="correct" />
                    ) : (
                        <img src={incorrectIcon} alt="incorrect" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RenderTask;
