import './resultDisplayTasks.css';

const Table = ({ task, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;
    console.log(answers[0]);

    return (
        <div className="table-container task-types-container">
            <table className="table_exercise">
                <thead>
                    <tr>
                        {answers[0].map((elem, index) => (
                            <th key={index}>{elem}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {answers.slice(1).map((elem, index) => (
                        <tr key={index}>
                            {elem.map((item, index_inner) => {
                                let tdIndex = index * 3 + index_inner;

                                return (
                                    <td key={tdIndex}>
                                        {item ? item.split('_').join(' ') : ''}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
