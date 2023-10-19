import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsChevronCompactRight,
  BsClipboard2,
  BsBriefcase,
} from "react-icons/bs";

const Sidebar = () => {
  const location = useLocation().pathname;

  return (
    <div className="w-[300px] flex-col">
      <div className="flex items-center mb-8">
        <TbFileInvoice color="#3e58ca" size={50} />
        <h1 className="font-bold text-3xl ml-2">Invoicer.</h1>
      </div>
      <div className="pr-8">
        <Link to="/" className="text-black">
          <div
            className={`flex items-center justify-between font-bold text-xl text-black my-8 p-2 ${
              location === "/" && "bg-[#3e58ca] text-white rounded-md "
            }  hover:bg-[#3e58ca] hover:text-white hover:rounded-md`}
          >
            <div className="flex items-center">
              <AiOutlineHome
                size={30}
                className={`mr-4 ${location === "/" && "text-white"}`}
              />
              Invoices
            </div>
            <BsChevronCompactRight
              size={20}
              color={location === "/" ? "white" : "darkgrey"}
              className="hover:text-white"
            />
          </div>
        </Link>
        {/* <Link to="/invoices" className="text-black">
          <div
            className={`flex items-center justify-between font-bold text-xl text-black my-8 p-2 ${
              location === "/invoices" && "bg-[#3e58ca] text-white rounded-md "
            }  hover:bg-[#3e58ca] hover:text-white hover:rounded-md`}
          >
            <div className="flex items-center">
              <BsClipboard2
                size={30}
                className={`mr-4 ${location === "/invoices" && "text-white"}`}
              />
              Invoices
            </div>
            <BsChevronCompactRight
              size={20}
              color={location === "/invoices" ? "white" : "darkgrey"}
              className="hover:text-white"
            />
          </div>
        </Link> */}
        <Link to="/clients" className="text-black">
          <div
            className={`flex items-center justify-between font-bold text-xl text-black my-8 p-2 ${
              location === "/clients" && "bg-[#3e58ca] text-white rounded-md "
            }  hover:bg-[#3e58ca] hover:text-white hover:rounded-md`}
          >
            <div className="flex items-center">
              <BsBriefcase
                size={30}
                className={`mr-4 ${location === "/clients" && "text-white"}`}
              />
              Clients
            </div>
            <BsChevronCompactRight
              size={20}
              color={location === "/clients" ? "white" : "darkgrey"}
              className="hover:text-white"
            />
          </div>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
