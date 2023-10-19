import React, { useState } from "react";
import InvoiceDataTable from "../components/invoices/InvoiceDataTable";
import { GrAddCircle } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

const Invoices = () => {
  return (
    <div className="w-full h-full bg-[#f5f8fd] rounded-lg">
      <div className=" h-full p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold  ">Invoices</h1>
           
          </div>
          <div className="flex items-center bg-white rounded-lg p-2 w-[400px]">
            <div className="mr-2">
              <BiSearchAlt size={20} />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none bg-transparent flex-grow"
            />
          </div>
        </div>
        <InvoiceDataTable />
      </div>
    </div>
  );
};

export default Invoices;
