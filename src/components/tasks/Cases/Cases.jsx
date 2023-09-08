import { useTasks } from 'contexts/TasksContextProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './Cases.module.scss';

const Cases = () => {
    const { handleTask, getCases, cases } = useTasks();

    const navigate = useNavigate();

    useEffect(() => {
        handleTask();
        getCases();
    }, []);

    return (
        <div className={styles.cases}>
            {cases[0]?.case_tasks?.map(
                ({
                    id,
                    title,
                    passed_quantity: passed,
                    quantity_task: tasks,
                }) => {
                    if (title === 'vocabulary') return null;

                    return (
                        <div className={styles.case} key={id}>
                            <div
                                className={styles.button}
                                onClick={() =>
                                    navigate(`/task/case/${id}/task/1`)
                                }
                            >
                                <span>
                                    {title[0].toUpperCase() + title.slice(1)}
                                </span>
                            </div>
                            <span
                                className={`${styles.progress} ${
                                    passed === tasks ? styles.done : ''
                                }`}
                            >
                                {passed}/{tasks}
                            </span>
                        </div>
                    );
                }
            )}
        </div>
    );
};

export default Cases;
