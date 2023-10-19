import React from "react";

import { MdOutlineNotificationsActive } from "react-icons/md";
const Feed = () => {
  return (
    <div className="p-4">
      <div className="mt-16 bg-white p-4 rounded-lg">
        <div className="w-full flex items-center justify-between p-2 rounded-lg bg-[#3d54d8] text-white mb-4">
          <div className="flex items-center">
            <MdOutlineNotificationsActive size={20} className="mr-2" />
            <h3>Feed</h3>
          </div>
          <h3>Month</h3>
        </div>
        <div className="flex my-8 h-[70px] relative">
          <div className="flex-[0.1]  ">
            <div className="w-4 h-4 rounded-full mt-[5px] bg-blue-500"></div>
            <div className="w-[2px] h-[86px] z-10 left-[6.5px] top-[21px] bg-gray-300 absolute"></div>
          </div>
          <div className="flex-[0.9]">
            <h1 className="text-xl font-bold text-blue-400">New Client</h1>
            <h2>1 Hour Ago</h2>
          </div>
        </div>
        <div className="flex my-8 h-[70px] relative">
          <div className="flex-[0.1]  ">
            <div className="w-4 h-4 rounded-full mt-[5px] bg-blue-500"></div>
            <div className="w-[2px] h-[86px] z-10 left-[6.5px] top-[21px] bg-gray-300 absolute"></div>
          </div>
          <div className="flex-[0.9]">
            <h1 className="text-xl font-bold text-blue-400">Invoice Send</h1>
            <h2>1 Hour Ago</h2>
          </div>
        </div>
        <div className="flex my-8 h-[70px] relative">
          <div className="flex-[0.1]  ">
            <div className="w-4 h-4 rounded-full mt-[5px] bg-blue-500"></div>
            <div className="w-[2px] h-[86px] z-10 left-[6.5px] top-[21px] bg-gray-300 absolute"></div>
          </div>
          <div className="flex-[0.9]">
            <h1 className="text-xl font-bold text-blue-400">Create Invoice</h1>
            <h2>1 Hour Ago</h2>
          </div>
        </div>
        <div className="flex my-8 h-[70px] relative">
          <div className="flex-[0.1]  ">
            <div className="w-4 h-4 rounded-full mt-[5px] bg-blue-500"></div>
            <div className="w-[2px] h-[86px] z-10 left-[6.5px] top-[21px] bg-gray-300 absolute"></div>
          </div>
          <div className="flex-[0.9]">
            <h1 className="text-xl font-bold text-blue-400">Create User</h1>
            <h2>1 Hour Ago</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
