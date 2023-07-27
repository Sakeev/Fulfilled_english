import './resultDisplayTasks.css';

const BuildSentences = ({ task, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    return <div></div>;
};

export default BuildSentences;
