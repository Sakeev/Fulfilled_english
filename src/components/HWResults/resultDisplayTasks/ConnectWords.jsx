import './resultDisplayTasks.css';

const ConnectWords = ({ task, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    let answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    if (displayDataType === 'teacher') {
        answers = answers
            .split(',')
            .map((wordPair) => wordPair.trim().split(' '));
    }

    return (
        <div>
            <div>
                {answers.map((wordPair, index) => (
                    <p key={index}>
                        {wordPair[0]} - {wordPair[1]}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ConnectWords;
