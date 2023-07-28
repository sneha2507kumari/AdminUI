import React from "react";
import TableData from "./TableData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TableData />
      <ToastContainer/>
    </div>
  );
}

export default App;



