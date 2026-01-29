import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Table() {
  const data = useSelector((state) => state.table.data);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const rowsPerPage = 10;

  // Search filter
  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.email.toLowerCase().includes(search.toLowerCase()) ||
    row.phone.includes(search) ||
    row.city.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    return b.name.localeCompare(a.name);
  });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Excel Download
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "accounts.xlsx");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Account List</h2>

      <input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setSortOrder("asc")}>Sort A-Z</button>
        <button onClick={() => setSortOrder("desc")} style={{ marginLeft: "10px" }}>
          Sort Z-A
        </button>
        <button onClick={downloadExcel} style={{ marginLeft: "10px" }}>
          Download Excel
        </button>
      </div>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
