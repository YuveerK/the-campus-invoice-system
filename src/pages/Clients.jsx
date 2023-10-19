import React from "react";

const Clients = () => {
  return (
    <div className="flex w-full h-full bg-[#f5f8fd] rounded-lg">
      <div className="flex-[0.8] h-full p-10">
        <h1 className="text-3xl font-bold mt-10">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4"></div>
        <div className="grid grid-cols-2 gap-4"></div>
      </div>
      <div className="flex-[0.2] h-full "></div>
    </div>
  );
};

export default Clients;
