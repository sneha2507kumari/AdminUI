import React, { useState, useEffect } from "react";
import axios from "axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TableData.css";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import PaginationPage from "./PaginationPage";


const TableData = () => {
  const [adminData, setAdminData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItems, setSearchItems] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingRows, setEditingRows] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setAdminData(response.data);
      } catch (e) {
        toast.warning("ERROR IN FETCHING DATA");
        console.log("Error fetching data from URL, Please try again later."); 
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchItems(searchValue);
    setCurrentPage(1); 
    setSelectAll(false); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectAll(false); 
    toast.info(`Navigation to page ${page}`);
  };

  const handleDeleteRow = (id) => {
    const newData = adminData.filter((data) => data.id !== id);
    setAdminData(newData);
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    setSelectAll(false);
    toast.success("Deleted Row successfully");
  };

  const handleRowInputChange = (row, field, value) => {
    const newData = adminData.map((data) =>
      data === row ? { ...data, [field]: value } : data
    );
    setAdminData(newData);
  };

  const handleEditRow = (id) => {
    try{
    setEditingRows((prevEditingRows) => [...prevEditingRows, id]);
    toast.warning("Now Editing Row");
    }catch{
      toast.warning("error in editing");
    }
  };

  const handleSaveRow = (id) => {
    try{
    const newData = adminData.map((data) => {
      if (data.id === id) {
        if (!data.name.trim() || !data.email.trim() || !data.role.trim()) {
          toast.warning("INCOMPLETE DETAILS")
          alert("Please fill all the fields before saving.");
          return data;
        }
      }
      return data;
    });
    setAdminData(newData);
    setEditingRows((prevEditingRows) =>
      prevEditingRows.filter((editedId) => editedId !== id)
    );
    toast.success("Saved Row successfully");
  }catch{
    toast.error("Error in saving row, Please try again.")
  }
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedRows(
        adminData
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((data) => data.id)
      );
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelection = (row) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row.id)
        ? prevSelectedRows.filter((id) => id !== row.id)
        : [...prevSelectedRows, row.id]
    );
  };

  const handleDeleteSelected = () => {
    const newData = adminData.filter(
      (data) => !selectedRows.includes(data.id)
    );
    setAdminData(newData);
    setSelectedRows([]);
    setSelectAll(false);
    if (newData.length !== adminData.length) {
      toast.success("Deleted All successfully");
    }
    else{
      toast.error("Please choose the checkbox and try again");
    }
  };

  const filteredData = adminData.filter(
    ({ name, email, role }) =>
      name.toLowerCase().includes(searchItems) ||
      email.toLowerCase().includes(searchItems) ||
      role.toLowerCase().includes(searchItems)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentPageData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Admin Table</h1>
      </header>

      <main>
        <div className="table-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by name, email, or role"
            value={searchItems}
            onChange={handleSearch}
          />
          <table>
            <TableHeader
              selectAll={selectAll}
              handleSelectAll={handleSelectAll}
            />
            <tbody>
              {currentPageData.map((data, index) => (
                <TableRow
                  key={index}
                  data={data}
                  isSelected={selectedRows.includes(data.id)}
                  isEditing={editingRows.includes(data.id)}
                  onRowEdit={handleEditRow}
                  onRowSave={handleSaveRow}
                  onRowInputChange={handleRowInputChange}
                  onDeleteRow={handleDeleteRow}
                  onRowSelection={handleRowSelection}
                />
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <p className="no-results">No search results found.</p>
          )}
        </div>
      </main>

      <footer> 
      <PaginationPage
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleDeleteSelected={handleDeleteSelected}
      /></footer>
    </div>
  );
};

export default TableData;
