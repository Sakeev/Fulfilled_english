import React, { useEffect, useState } from "react";
import { API } from "../../../helpers/consts";
import "./Tasks.css";

const Table = ({ task, inps, setInps, setTyping }) => {
  //   console.log(task);
  const [tableProps, setTableProps] = useState({
    rows: task[0]?.description.split("\r\n")[0].split("x")[1],
    cells: task[0]?.description.split("\r\n")[0].split("x")[0],
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

  const [table, setTable] = useState({
    data: fillData(task[0]?.description.split("\r\n").slice(1)),
  });

  return (
    <>
      <h2>Table exercise</h2>

      {task[0]?.condition && <p>Description: {task[0]?.condition}</p>}
      <hr />

      {task[0]?.audio && (
        <audio controls>
          <source src={API + task[0]?.audio} />
        </audio>
      )}

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
                    value={inps[`th${index}`] || ""}
                    onChange={(e) => {
                      setInps({
                        ...inps,
                        [`th${index}`]: `${e.target.value}`,
                      });
                      setTyping((prev) => !prev);
                    }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.data.slice(1).map((elem, rowIndex) => (
            <tr key={rowIndex}>
              {elem.map((item, cellIndex) => (
                <td key={cellIndex}>
                  {item ? (
                    item
                  ) : (
                    <input
                      className="table_inp"
                      value={
                        inps[`table_${task[0]?.id}`]?.[
                          `td${rowIndex}_${cellIndex}`
                        ] || ""
                      }
                      onChange={(e) => {
                        console.log(inps, "asdasdasdasdasdsasdsa");
                        setInps({
                          ...inps,
                          [`table_${task[0]?.id}`]: {
                            ...inps[`table_${task[0]?.id}`],
                            [`td${rowIndex}_${cellIndex}`]: `${e.target.value}`,
                          },
                        });
                        setTyping((prev) => !prev);
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
