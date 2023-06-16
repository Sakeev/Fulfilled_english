import React, { useCallback, useEffect, useRef, useState } from "react";
import { API } from "../../../helpers/consts";
import "./Tasks.css";

const Table = ({
  task,
  inps,
  setInps,
  setTyping,
  tablePlaying,
  table_current_time,
  sendJsonMessage,
  request_id,
  listeningId,
  taskId,
}) => {
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

  // Audio
  const audioRef = useRef();

  const handleTogglePlayback = (booli = false) => {
    sendJsonMessage({
      action: "is_playing",
      booli: booli,
      request_id: request_id,
      task_id: taskId,
    });
    sendJsonMessage({
      pk: listeningId,
      action: "get_listening_te",
      request_id: request_id,
    });
  };

  useEffect(() => {
    const { unit1, unit2 } = tablePlaying;
    if (listeningId === unit1.id) {
      const timeout = setTimeout(() => {
        audioRef.current[unit1.task.is_playing ? "play" : "pause"]();
      }, 200);
      return () => clearTimeout(timeout);
    } else if (listeningId === unit2.id) {
      const timeout = setTimeout(() => {
        audioRef.current[unit2.task.is_playing ? "play" : "pause"]();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [tablePlaying, listeningId]);

  const changeTime = (currentTime) => {
    sendJsonMessage({
      action: "set_current_time",
      current_time: currentTime,
      request_id: request_id,
      task_id: taskId,
    });
    sendJsonMessage({
      pk: listeningId,
      action: "get_current_time_te",
      request_id: request_id,
    });
  };

  useEffect(() => {
    if (listeningId === table_current_time.unit1.id) {
      const timeout = setTimeout(() => {
        audioRef.current.currentTime = +table_current_time.unit1.task?.seeked;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [table_current_time.unit1.task?.seeked, listeningId]);

  useEffect(() => {
    if (listeningId === table_current_time.unit2.id) {
      const timeout = setTimeout(() => {
        audioRef.current.currentTime = +table_current_time.unit2.task?.seeked;
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [table_current_time.unit2.task?.seeked, listeningId]);

  return (
    <>
      <h2>Table exercise</h2>

      {task[0]?.condition && <p>Description: {task[0]?.condition}</p>}
      <hr />

      {task[0]?.audio && (
        <audio
          src={API + task[0]?.audio}
          controls
          ref={audioRef}
          onPause={() => handleTogglePlayback(false)}
          onPlay={() => handleTogglePlayback(true)}
          onSeeked={(e) => {
            changeTime(e.target.currentTime);
          }}
        />
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
