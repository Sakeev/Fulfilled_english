import { renderOutput } from 'components/tasks/tasksType/utils';
import { API } from 'helpers/consts';

import styles from '../../tasksType/DescribeImage/Images.module.scss';

const Images = ({ taskDetails, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    return (
        <div className={styles.imagesContainer}>
            <div className={styles.images}>
                {taskDetails.images.map(({ image, sentence }) => {
                    return (
                        <div className={styles.image} key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                            {sentence.split('|').map((row, pInd) => {
                                return renderOutput(row, '', answers, pInd);
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Images;
