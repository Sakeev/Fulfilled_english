import { renderCondition } from 'components/tasks/Case/utils';
import { useTasks } from 'contexts/TasksContextProvider';
import Pagination from 'components/Pagination';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { capitalize } from 'helpers/funcs';
import RenderTask from './RenderTask/RenderTask';

import styles from 'components/tasks/Case/Case.module.scss';

const HWResults = () => {
    const { caseInfo, getCaseInfo } = useTasks();
    const { caseId } = useParams();
    const [tasksQuan, setTasksQuan] = useState(0);
    const [taskDetails, setTaskDetails] = useState(null);

    useEffect(() => {
        getCaseInfo(caseId);
    }, []);

    // console.log(caseInfo, taskDetails);

    useEffect(() => {
        if (caseInfo.id) {
            setTasksQuan(caseInfo.quantity_task);
            setTaskDetails(caseInfo.tasks[0]);
        }
    }, [caseInfo]);

    const checkHW = () => {
        if (taskDetails) {
            if (taskDetails.answers.length === 0) return true;

            return taskDetails.answers[taskDetails.answers.length - 1].accepted;
        } else return false;
    };

    const handlePage = (page) => {
        if (caseInfo.id) {
            setTaskDetails(caseInfo.tasks[page - 1] || null);
        }
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
                        // task_id={task_id}
                        displayDataType={'student'}
                    />
                    {!checkHW() && (
                        <RenderTask
                            taskDetails={taskDetails}
                            // task_id={task_id}
                            displayDataType={'teacher'}
                        />
                    )}
                </div>
                <div className={styles.pagination}>
                    <Pagination
                        count={tasksQuan}
                        pagination={{ type: 'results', cb: handlePage }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HWResults;
