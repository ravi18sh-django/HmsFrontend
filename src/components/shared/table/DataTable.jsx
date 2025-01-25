import React, { useState } from 'react';
// import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const DataTable = ({ data, columns }) => {
    console.log(data,columns);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column,index) => (
              <th
                key={index}
                className={column.headerClassName || ''}                
              >
                <div className="table-head">
                  {column}                  
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={column.className || ''}
                  >
                    {row[column.id]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
