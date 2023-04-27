import React, { useState } from 'react';
import "./Tasks.css"

const Table = ({task}) => {
  const [tableProps, setTableProps] = useState({
    rows: task[0]?.description.split('\r\n')[0].split('x')[1],
    cells: task[0]?.description.split('\r\n')[0].split('x')[0],
  });

  const fillData = (data) => {
    while(data.length < tableProps.rows){
      data.push("")
    }
    const res = data.map((elem) => {
      let temp = elem.split(' ')
      while(temp.length < tableProps.cells){
        temp.push("");
      }
      return temp
    })
    return res;
  }
  
  const [table, setTable] = useState({
    data: fillData(task[0].description.split('\r\n').slice(1)),
  });

  return (
    <table className='table_exercise'>
      <thead>
        <tr>
          {
            table.data[0].map((elem, index) => (
              <th key={index}>{elem ? elem : <input className='table_inp' />}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          table.data.slice(1).map((elem, index) => (
            <tr key={index}>
              {
                elem.map((item, index_inner) => (
                  <td key={index_inner}>{item ? item : <input className='table_inp' />}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Table;