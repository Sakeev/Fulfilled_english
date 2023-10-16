import styles from '../../tasksType/Table/Table.module.scss';

const Table = ({ taskDetails, answer, displayDataType }) => {
    if (answer === null) return <h2>This task hasn't done yet</h2>;

    const answers =
        displayDataType === 'student' ? answer.answer : answer.right_answer;

    console.log(answers);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {answers[0].map((header, index) => (
                            <th key={index}>{header.replaceAll('_', ' ')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {answers.slice(1).map((elem, index) => (
                        <tr key={index}>
                            {elem.map((item, index_inner) => {
                                let tdIndex = index * elem.length + index_inner;

                                return (
                                    <td key={tdIndex}>
                                        {typeof item === 'string'
                                            ? item.replaceAll('_', ' ')
                                            : item[0].replaceAll('_', ' ')}
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
