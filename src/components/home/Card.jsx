import React from "react";

const Card = ({ icon, title, amount }) => {
  return (
    <div className="bg-white p-6 rounded-lg m-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">{icon}</div>
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-800">{amount}</h1>
    </div>
  );
};

export default Card;
