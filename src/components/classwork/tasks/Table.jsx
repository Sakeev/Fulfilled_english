import React, { useState } from 'react';

const Table = ({task}) => {
  console.log(task[0]?.description.split('\r\n')[1].split(' '))
  const [tableProps, setTableProps] = useState({
    rows: task[0]?.description.split('\r\n')[0].split('x')[1],
    cells: task[0]?.description.split('\r\n')[0].split('x')[0],
  });

  const [table, setTable] = useState({
    rows: [],
    cells: []
  })

  return (
    <table>
      <thead>
        <tr>
          {
            Array.from({ length: tableProps.cells }, (_, i) => (
              <th style={{border: '1px solid black', width: '100%', minWidth: '100px'}} key={`header-${i}`}>Column {i + 1}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          Array.from({ length: tableProps.rows - 1 }, (_, i) => (
            <tr key={i}>
              {
                Array.from({ length: tableProps.cells },(_, i) => (
                  <td style={{border: '1px solid black', width: '100%', minWidth: '100px'}} key={`header-${i}`}>row</td>
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