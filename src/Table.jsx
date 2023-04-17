import React, { useState } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
const Table = ({ list }) => {
  const [items, setItems] = useState(list);
  const handleDelete = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setItems(newList);
  };

  console.log(items);
  return <></>;
};

const TableContainer = styled.div``;
export default Table;
