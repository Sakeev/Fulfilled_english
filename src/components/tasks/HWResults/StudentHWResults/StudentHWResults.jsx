import { useTasks } from 'contexts/TasksContextProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './StudentHWResults.module.scss';

const StudentHWResults = () => {
    const { getPastLessons, pastLessons } = useTasks();
    const navigate = useNavigate();

    useEffect(() => {
        getPastLessons();
    }, []);

    const onSelect = (event) => {
        navigate(`/student-tasks/results/${event.target.value}`);
    };

    return (
        <div>
            <select onChange={onSelect}>
                <option value="" defaultChecked hidden>
                    Choose lesson
                </option>
                {pastLessons.map((lesson) => {
                    const caseId = lesson.case_tasks.find(
                        (caseTask) => caseTask.title === 'grammar'
                    ).id;

                    return <option value={caseId}>{lesson.title}</option>;
                })}
            </select>
        </div>
    );
};

export default StudentHWResults;
