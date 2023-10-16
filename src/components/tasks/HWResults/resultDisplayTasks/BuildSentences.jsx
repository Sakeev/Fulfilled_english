import styles from '../../tasksType/BuildSentences/BuildSentences.module.scss';
import sentenceStyles from '../../tasksType/BuildSentences/BuildSentence/BuildSentence.module.scss';

const BuildSentence = ({ sentence }) => {
    return (
        <div className={sentenceStyles.taskContainer}>
            <div className={sentenceStyles.answerBlock}>
                <p
                    className={`${sentenceStyles.pickedWord} ${sentenceStyles.results}`}
                >
                    {sentence}
                </p>
            </div>
        </div>
    );
};

const BuildSentences = ({ taskDetails, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    return (
        <div className={styles.buildSentencesContainer}>
            {answers.map((sentence, index) => {
                return <BuildSentence key={index} sentence={sentence} />;
            })}
        </div>
    );
};

export default BuildSentences;
