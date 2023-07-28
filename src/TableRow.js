import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsCheck } from "react-icons/bs";
import "./TableRow.css";

const TableRow = ({
  data,
  isSelected,
  isEditing,
  onRowEdit,
  onRowSave,
  onRowInputChange,
  onDeleteRow,
  onRowSelection,
}) => {
  const [rowData, setRowData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({ ...prevData, [name]: value }));
    onRowInputChange(data, name, value);
  };

  const handleEdit = () => {
    onRowEdit(data.id);
  };

  const handleSave = () => {
    if (!rowData.name.trim() || !rowData.email.trim() || !rowData.role.trim()) {
      alert("Please fill all the fields before saving.");
      return;
    }

    onRowSave(data.id);
  };

  const handleDelete = () => {
    onDeleteRow(data.id);
  };

  const handleSelectRow = () => {
    onRowSelection(data);
  };

  return (
    <tr className={isSelected ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelectRow}
          aria-label="Select row"
        />
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={rowData.name}
            onChange={handleInputChange}
            aria-label="Edit name"
          />
        ) : (
          data.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={rowData.email}
            onChange={handleInputChange}
            aria-label="Edit email"
          />
        ) : (
          data.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="role"
            value={rowData.role}
            onChange={handleInputChange}
            aria-label="Edit role"
          />
        ) : (
          data.role
        )}
      </td>
      <td>
        {isEditing ? (
          <BsCheck
            onClick={handleSave}
            className="saveIcon"
            role="button"
            aria-label="Save changes"
          />
        ) : (
          <>
            <BsFillPencilFill
              onClick={handleEdit}
              className="editIcon"
              role="button"
              aria-label="Edit row"
            />
            <BsFillTrashFill
              onClick={handleDelete}
              className="deleteIcon"
              role="button"
              aria-label="Delete row"
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;







