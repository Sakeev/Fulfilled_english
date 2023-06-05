import { Button } from "@mui/material";
import { useState } from "react";

import "./tasksType.css";

const Table = ({ caseDetail, handleAnswer, task_id, caseInfo }) => {
  const [inps, setInps] = useState({});
  const [tableProps, setTableProps] = useState({
    rows: caseDetail?.description.split("\r\n")[0].split("x")[1],
    cells: caseDetail?.description.split("\r\n")[0].split("x")[0],
  });

  const fillData = (data) => {
    while (data.length < tableProps.rows) {
      data.push("");
    }
    const res = data.map((elem) => {
      let temp = elem.split(" ");
      while (temp.length < tableProps.cells) {
        temp.push("");
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
    data: fillData(caseDetail.description.split("\r\n").slice(1)),
  });

    const onSend = () => {
        const splittedDescr = caseDetail.description.split('\r\n');

        const [cols, rows] = splittedDescr[0].split('x').map((size) => +size);
        const colHeadings = splittedDescr[1].split(' ');
        const content = splittedDescr.slice(2).map((val) => val.split(' '));
        const answerTemplate = {};

        for (let colHeading of colHeadings) {
            answerTemplate[colHeading] = Array(+rows).fill('');
        }

        let col = 0;

        for (let colHeading in answerTemplate) {
            for (let row = 0; row < rows; row++) {
                if (cols * row + col in inps) {
                    answerTemplate[colHeading][row] = inps[cols * row + col];
                } else if (content[row][col]) {
                    answerTemplate[colHeading][row] = content[row][col];
                } else {
                    answerTemplate[colHeading][row] = '';
                }
            }

            col++;
        }
      }
      counter++;
    }

        handleAnswer(
            JSON.stringify({ answers: [answerTemplate] }),
            caseInfo.tasks?.[task_id - 1].id
        );
    };

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
                                                item.split('_').join(" ")
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
                <Button className='hw__send-btn' onClick={onSend}>send</Button>
            </div>
        </>
    );
};

export default Table;
