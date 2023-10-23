import { StudentHWResults } from 'components/tasks/HWResults';
import Cases from 'components/tasks/Cases';

import styles from './TasksPage.module.scss';

const TasksPage = () => (
    <div className={styles.homework}>
        <div>
            <h2>Homework</h2>
            <p>Your cases</p>
            <Cases />
        </div>
        <div className={styles.results}>
            <h2>Homework results</h2>
            <p>Select lesson</p>
            <StudentHWResults />
        </div>
    </div>
);

export default TasksPage;
