import { StudentEssay } from 'components/Essay';
import styles from './StudentEssayPage.module.scss';

const StudentEssayPage = () => {
    return (
        <div className={styles.studentEssayPage}>
            <StudentEssay />
        </div>
    );
};

export default StudentEssayPage;
