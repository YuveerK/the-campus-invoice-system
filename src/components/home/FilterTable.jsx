import React, { useState, useEffect } from "react";

const FilterTable = ({ data, returnFilteredData }) => {
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const filterData = () => {
    const newData = data.filter((item) => {
      const matchesComplexName = item.complexName
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const matchesStatus = statusFilter === "" || item.status === statusFilter;

      return matchesComplexName && matchesStatus;
    });

    setFilteredData(newData);

    // If you want to send the filtered data back to parent component immediately:
    returnFilteredData(newData);
  };

  useEffect(() => {
    filterData();
  }, [filterText, statusFilter]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4">
      <input
        type="text"
        placeholder="Filter by complex name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
      >
        <option value="">All Status</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Paid">Paid</option>
      </select>
    </div>
  );
};

export default FilterTable;
