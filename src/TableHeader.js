import React from "react";
import "./TableHeader.css";

const TableHeader = ({ selectAll, handleSelectAll }) => {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;





