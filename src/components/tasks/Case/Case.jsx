import Vocabulary from 'components/classwork/tasks/Vocabulary';
import { getVocabulary, useTaskComponent } from './utils';
import { useTasks } from 'contexts/TasksContextProvider';
import Pagination from 'components/Pagination';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { capitalize } from 'helpers/funcs';

import styles from './Case.module.scss';

const Case = () => {
    const { caseId } = useParams();
    const taskComponent = useTaskComponent();
    const [showVocab, setShowVocab] = useState(false);

    const {
        getTaskDetails,
        getCases,
        cases,
        taskDetails,
        getCaseInfo,
        caseInfo,
    } = useTasks();

    const vocabulary = getVocabulary(cases);

    const renderCondition = (condition) => {
        if (condition) {
            return condition
                .split('\r\n')
                .map((row, index) =>
                    row.length ? <p key={index}>{row}</p> : <br key={index} />
                );
        }
        return null;
    };

    useEffect(() => {
        getCases();
        getCaseInfo(caseId);
        getTaskDetails(caseId, 1);
    }, []);

    return (
        <div className={styles.case}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h2>
                        Homework - {capitalize(caseInfo?.title)} -{' '}
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
                <div className={styles.task}>{taskComponent}</div>
                <div className={styles.pagination}>
                    <Pagination count={caseInfo.quantity_task} />
                </div>
            </div>
        </div>
    );
};

export default Case;