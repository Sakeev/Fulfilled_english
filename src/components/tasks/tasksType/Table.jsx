import { Button } from '@mui/material';
import { useState } from 'react';

import './tasksType.css';

const Table = ({ caseDetail, handleAnswer, task_id, caseInfo }) => {
    const [inps, setInps] = useState({});
    const [tableProps, setTableProps] = useState({
        rows: caseDetail?.description.split('\r\n')[0].split('x')[1],
        cells: caseDetail?.description.split('\r\n')[0].split('x')[0],
    });

    const fillData = (data) => {
        while (data.length < tableProps.rows) {
            data.push('');
        }
        const res = data.map((elem) => {
            let temp = elem.split(' ');
            while (temp.length < tableProps.cells) {
                temp.push('');
            }
            return temp;
        });
        return res;
    };

    const handleInputsChange = (e, index) => {
        setInps((prev) => {
            return { ...prev, [index]: e.target.value };
        });
    };

    const [table, setTable] = useState({
        data: fillData(caseDetail.description.split('\r\n').slice(1)),
    });

    const onSend = () => {
        let size = +caseDetail.description.split('\r\n')[0].split('x')[0];
        let content = caseDetail.description
            .split('\r\n')
            .slice(2)
            .map((val) => val.split(' '));
        let answer = caseDetail.description
            .split('\r\n')[1]
            .split(' ')
            .reduce((obj, val) => {
                obj[val] = [];
                return obj;
            }, {});
        let counter = 0;

        for (let key in answer) {
            for (let i = 0; i < size; i++) {
                if (counter * 3 + i in inps) {
                    answer[key][i] = inps[counter * 3 + i];
                } else {
                    answer[key][i] = content[counter][i];
                }
            }
            counter++;
        }

        handleAnswer([answer], caseInfo.tasks?.[task_id - 1].id);
    };

    // console.log(inps);
    // console.log(caseDetail);

    return (
        <>
            <p className="task-condition">
                {caseInfo.tasks?.[task_id - 1].condition}
            </p>
            <div className="table-container task-types-container">
                <table className="table_exercise">
                    <thead>
                        <tr>
                            {table.data[0].map((elem, index) => (
                                <th key={index}>
                                    {elem ? (
                                        elem
                                    ) : (
                                        <input
                                            className="table_inp"
                                            onChange={(e) =>
                                                handleInputsChange(e)
                                            }
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.data.slice(1).map((elem, index) => (
                            <tr key={index}>
                                {elem.map((item, index_inner) => {
                                    let tdIndex = index * 3 + index_inner;

                                    return (
                                        <td key={tdIndex}>
                                            {item ? (
                                                item
                                            ) : (
                                                <input
                                                    className="table_inp"
                                                    onChange={(e) =>
                                                        handleInputsChange(
                                                            e,
                                                            tdIndex
                                                        )
                                                    }
                                                />
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={onSend}>send</Button>
            </div>
        </>
    );
};

export default Table;
