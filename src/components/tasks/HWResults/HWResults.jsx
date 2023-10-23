import { renderCondition } from 'components/tasks/Case/utils';
import { useTasks } from 'contexts/TasksContextProvider';
import { capitalize, isTeacher } from 'helpers/funcs';
import RenderTask from './RenderTask/RenderTask';
import Pagination from 'components/Pagination';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'components/ui';

import styles from 'components/tasks/Case/Case.module.scss';

const HWResults = () => {
    const {
        caseInfo,
        getCaseInfo,
        updateAnswer,
        taskDetails,
        setTaskDetails,
        getTaskDetails,
    } = useTasks();
    const { userId, caseId } = useParams();
    const [page, setPage] = useState(0);
    const [quantityTask, setQuantityTask] = useState(0);

    useEffect(() => {
        getCaseInfo(caseId, userId);
    }, []);

    useEffect(() => {
        if (caseInfo.id) {
            const taskDetails = caseInfo.tasks[0];
            setQuantityTask(caseInfo.quantity_task);
            setTaskDetails(taskDetails);
        }
    }, [caseInfo]);

    const checkHW = () => {
        if (taskDetails) {
            if (
                taskDetails.answers.length === 0 ||
                taskDetails.right_answer === ''
            )
                return false;

            return !taskDetails.answers[taskDetails.answers.length - 1]
                .accepted;
        } else return false;
    };

    const handlePage = (page) => {
        if (caseInfo.id) {
            const taskDetails = caseInfo.tasks[page - 1] || null;

            setTaskDetails(taskDetails);
            setPage(page);
        }
    };

    const setAccuracy = (accuracy) => {
        updateAnswer(taskDetails.answers[taskDetails.answers.length - 1].id, {
            checked: true,
            accepted: accuracy,
        });
        getTaskDetails(caseId, page, userId);
    };

    const isDisabled = () => {
        return taskDetails?.id
            ? taskDetails.answers[taskDetails.answers.length - 1].checked
            : false;
    };

    return (
        <div className={styles.case}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h2>
                        Homework Results - {capitalize(caseInfo?.title)} -{' '}
                        <span>{capitalize(taskDetails?.implemented_case)}</span>
                    </h2>
                    {renderCondition(taskDetails?.condition)}
                </div>
                {/* {vocabulary ? (
                    <div>
                        <Vocabulary
                            showVocab={showVocab}
                            setShowVocab={setShowVocab}
                            vocabTasks={[vocabulary]}
                        />
                    </div>
                ) : null} */}
                <div className={`${styles.task} ${styles.results}`}>
                    <RenderTask
                        taskDetails={taskDetails}
                        displayDataType={'student'}
                    />
                    {checkHW() && (
                        <RenderTask
                            taskDetails={taskDetails}
                            displayDataType={'teacher'}
                        />
                    )}
                    {!taskDetails?.right_answer &&
                    isTeacher() &&
                    taskDetails?.answers.length ? (
                        <div className={styles.checkBtns}>
                            <Button
                                disabled={isDisabled()}
                                onClick={() => setAccuracy(true)}
                            >
                                Correct
                            </Button>
                            <Button
                                disabled={isDisabled()}
                                onClick={() => setAccuracy(false)}
                            >
                                Incorrect
                            </Button>
                        </div>
                    ) : null}
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        count={quantityTask}
                        pagination={{ type: 'results', cb: handlePage }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HWResults;
