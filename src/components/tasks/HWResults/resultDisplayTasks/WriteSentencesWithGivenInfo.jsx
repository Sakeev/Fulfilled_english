import { API } from 'helpers/consts';

import styles from '../../tasksType/WriteSentences/WriteSentences.module.scss';

const WriteSentencesWithGivenInfo = ({
    taskDetails,
    answer,
    displayDataType,
}) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    console.log(taskDetails);

    return (
        <div className={styles.writeSentencesContainer}>
            <div className={styles.images}>
                {taskDetails.images.map(({ image }) => {
                    return (
                        <div className={styles.image} key={image}>
                            <img src={`${API}${image}`} alt="exercise" />
                        </div>
                    );
                })}
            </div>
            <div className={styles.inputColumns}>
                {Object.keys(taskDetails.description).map((key, index) => (
                    <div className={styles.inputColumn} key={index}>
                        <p className={styles.header}>{key}</p>
                        <ol>
                            {answers[key].map((value, innerInd) => (
                                <li key={innerInd}>
                                    <span className={styles.answer}>
                                        {typeof value === 'object'
                                            ? value[0]
                                            : value || ''}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        </div>
        // <div className="ws-w-given-info-container task-types-container">
        //     <div className="ws-w-given-info-image-box-wrapper">
        //         {taskDetails.images.map(
        //             ({ image, sentence, additional_info }, index) => {
        //                 return (
        //                     <div
        //                         className="ws-w-given-info-image-box"
        //                         key={image}
        //                     >
        //                         <img src={`${API}${image}`} alt="exercise" />
        //                         {sentence && (
        //                             <p>
        //                                 {index + 1}. {sentence}
        //                             </p>
        //                         )}
        //                         <ul>
        //                             {additional_info &&
        //                                 additional_info
        //                                     .split('\r\n')
        //                                     .map((line, index) => (
        //                                         <li key={index}>{line}</li>
        //                                     ))}
        //                         </ul>
        //                     </div>
        //                 );
        //             }
        //         )}
        //     </div>
        //     <div className="ws-w-given-info-input-columns">
        //         {Object.keys(taskDetails.description).map((key, index) => (
        //             <div className="ws-w-given-info-input-column" key={index}>
        //                 <p>{key}</p>
        //                 <ol>
        //                     {Object.values(answers)[index].map(
        //                         (value, innerInd) => (
        //                             <li key={innerInd}>{value}</li>
        //                         )
        //                     )}
        //                 </ol>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};

export default WriteSentencesWithGivenInfo;
