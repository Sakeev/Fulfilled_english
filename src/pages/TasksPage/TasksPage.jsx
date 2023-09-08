import Cases from 'components/tasks/Cases';

import styles from './TasksPage.module.scss';

const TasksPage = () => (
    <div className={styles.homework}>
        <h2>Homework</h2>
        <p>Your cases</p>
        <Cases />
    </div>
);

export default TasksPage;
