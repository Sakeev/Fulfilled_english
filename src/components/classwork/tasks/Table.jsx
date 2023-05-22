import React, { useEffect, useState } from "react";
import "./Tasks.css";

const Table = ({ task, sendJsonMessage, inps, setInps }) => {
  const [tableProps, setTableProps] = useState({
    rows: task[0]?.description.split("\r\n")[0].split("x")[1],
    cells: task[0]?.description.split("\r\n")[0].split("x")[0],
  });

  //   console.log(sendJsonMessage);
  const request_id = new Date().getTime();

  console.log(inps);

  // useEffect(() => {
  //   const timeOut = setTimeout(
  //     () =>
  //       sendJsonMessage({
  //         message: inps,
  //         action: "create_message",
  //         request_id: request_id,
  //       }),
  //     1000
  //   );
  //   return () => clearTimeout(timeOut);
  // }, [inps]);

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

  console.log(task[0]?.flag);
  const [table, setTable] = useState({
    data: fillData(task[0].description.split("\r\n").slice(1)),
  });

  return (
    <>
      <h2>Table exercise</h2>
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
                    value={inps.td[index]}
                    onChange={(e) => {
                      setInps((prevState) => ({
                        ...prevState,
                        [`th${index}`]: `${e.target.value}`,
                      }));
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
                      onChange={(e) => {
                        setInps((prevState) => ({
                          ...prevState,
                          [`td${rowIndex}_${cellIndex}`]: `${e.target.value}`,
                        }));
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
