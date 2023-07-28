import React from "react";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const Table = ({ data, selectedRows, handleRowSelection, handleDeleteRow }) => {
  return (
    <table className="table">
      <TableHeader />
      <tbody>
        {data.map((rowData, index) => (
          <TableRow
            key={index}
            rowData={rowData}
            selected={selectedRows.includes(rowData)}
            handleRowSelection={handleRowSelection}
            handleDeleteRow={handleDeleteRow}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
