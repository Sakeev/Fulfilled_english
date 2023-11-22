import Vocabulary from 'components/classwork/tasks/Vocabulary';
import { getVocabulary, renderCondition, useTaskComponent } from './utils';
import { useTasks } from 'contexts/TasksContextProvider';
import Pagination from 'components/Pagination';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { capitalize } from 'helpers/funcs';

import styles from './Case.module.scss';

const Case = () => {
    const { getCases, cases, taskDetails, getCaseInfo, caseInfo } = useTasks();
    const { caseId } = useParams();
    const [page, setPage] = useState(1);
    const [showVocab, setShowVocab] = useState(false);
    const vocabulary = getVocabulary(cases);
    const taskComponent = useTaskComponent(() =>
        setPage((prev) => (prev < caseInfo.quantity_task ? prev + 1 : prev))
    );

    useEffect(() => {
        getCases();
        getCaseInfo(caseId);
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
                    <Pagination
                        count={caseInfo.quantity_task}
                        pagination={{ type: 'homework' }}
                        pageHook={[page, setPage]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Case;
