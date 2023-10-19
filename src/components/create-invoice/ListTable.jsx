import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ListTable = ({ data, handleListUpdate }) => {
  const [editedIndex, setEditedIndex] = useState(-1);

  const handleDelete = (index) => {
    const newList = [...data];
    newList.splice(index, 1);
    handleListUpdate(newList);
  };

  const handleSaves = (index, updatedItem) => {
    const newList = [...data];
    newList[index] = updatedItem;
    handleListUpdate(newList);
  };

  const handleSave = () => {
    setEditedIndex(-1);
  };

  const handleEdit = (index) => {
    setEditedIndex(index);
  };

  return (
    <div className="table_container p-4 bg-white shadow-md rounded-md">
      <table className="mt-4 w-full" cellSpacing={0}>
        <thead>
          <tr className="text-left bg-gray-50">
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="px-4 py-2">
                  {index === editedIndex ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleSaves(index, {
                          ...item,
                          description: e.target.value,
                        })
                      }
                      className="form-input w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="px-4 py-2">
                  {index === editedIndex ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleSaves(index, {
                          ...item,
                          quantity: e.target.value,
                        })
                      }
                      className="form-input w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="px-4 py-2">
                  {index === editedIndex ? (
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) =>
                        handleSaves(index, {
                          ...item,
                          amount: e.target.value,
                        })
                      }
                      className="form-input w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  ) : (
                    item.amount
                  )}
                </td>
                <td className="px-4 py-2 flex items-center">
                  {index === editedIndex ? (
                    <button
                      className="text-blue-500 hover:text-blue-600 mr-2"
                      onClick={() => handleSave(index, item)}
                    >
                      Save
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <AiFillEdit
                        className="cursor-pointer mr-4"
                        size={20}
                        color="orange"
                        onClick={() => handleEdit(index)}
                      />
                      <AiFillDelete
                        className="cursor-pointer"
                        size={20}
                        color="red"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTable;
