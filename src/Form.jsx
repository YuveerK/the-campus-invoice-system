import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { viewInvoiceState } from "./atoms/viewInvoiceAtom";
import Invoice from "./Invoice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
const Form = () => {
  const [complexName, setComplexName] = useState("Princeton");
  const [invoices, setInvoices] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [editedIndex, setEditedIndex] = useState(-1);
  const [viewInvoice, setViewInvoice] = useRecoilState(viewInvoiceState);
  const handleEdit = (index) => {
    setEditedIndex(index);
  };

  const addItem = () => {
    let data = {
      description,
      quantity,
      amount,
    };

    setList([...list, data]);
  };

  const handleDelete = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };
  const handleSaves = (index, updatedItem) => {
    const newList = [...list];
    newList[index] = updatedItem;
    setList(newList);
  };
  const handleSave = () => {
    setEditedIndex(-1);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const fetchedInvoices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(fetchedInvoices);
    };
    fetchInvoices();
  }, []);

  return (
    <>
      {viewInvoice === false ? (
        <FormContainer>
          <div className="form">
            <h1 className="heading">Client Information</h1>
            <div className="row">
              <div className="field">
                <label htmlFor="">Complex Name</label>
                <select onChange={(e) => setComplexName(e.target.value)}>
                  <option value="Princeton">Princeton</option>
                  <option value="UCLA">UCLA</option>
                  <option value="Oxford">Oxford</option>
                  <option value="Harvard">Harvard</option>
                  <option value="NYU">NYU</option>
                  <option value="Stamford">Stamford</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Yale">Yale</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="">Invoice Number</label>
                <input
                  value={invoices && invoices.length}
                  type="text"
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className="field">
                <label htmlFor="">Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="">Invoice Due Date</label>
                <input
                  type="date"
                  value={invoiceDueDate}
                  onChange={(e) => setInvoiceDueDate(e.target.value)}
                />
              </div>
            </div>

            <h1 className="heading">Item Description</h1>
            <div className="row">
              <div className="field">
                <label htmlFor="">Description</label>
                <input
                  value={description}
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="">Quantity</label>
                <input
                  value={quantity}
                  type="text"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="">Amount</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <button className="add_item_button" onClick={addItem}>
              Add Item
            </button>
            <div className="table_container">
              <table cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr key={index}>
                      <td>
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
                          />
                        ) : (
                          item.description
                        )}
                      </td>
                      <td>
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
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td>
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
                          />
                        ) : (
                          item.amount
                        )}
                      </td>
                      <td>
                        {index === editedIndex ? (
                          <button onClick={() => handleSave(index, item)}>
                            Save
                          </button>
                        ) : (
                          <div className="flex items-center bg-red-50">
                            <AiFillEdit
                              className="icons"
                              color="orange"
                              onClick={() => handleEdit(index)}
                            />
                            <AiFillDelete
                              className="icons"
                              color="red"
                              style={{ marginLeft: "1rem" }}
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

            <button
              className="add_item_button"
              onClick={() => setViewInvoice(true)}
            >
              View Invoice
            </button>
          </div>
        </FormContainer>
      ) : (
        <Invoice
          complexName={complexName}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          invoiceDueDate={invoiceDueDate}
          description={description}
          quantity={quantity}
          amount={amount}
          list={list}
        />
      )}
    </>
  );
};

const FormContainer = styled.div`
  width: 1000px;
  height: 100vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 5px;
  background-color: white;
  padding: 2rem;
  overflow-y: scroll;

  input,
  select {
    padding: 1rem;
    outline-color: #699eff;
    border: 1px solid lightgrey;
    border-radius: 5px;
  }
  label {
    font-weight: bolder;
    font-size: 20px;
    margin-bottom: 1rem;
  }
  .form_subheading {
    margin: 1rem 0;
    font-weight: 300;
  }

  .heading {
    margin: 4rem 0 2rem 0;
  }

  .form {
    .row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px;

      .field {
        display: flex;
        flex-direction: column;
      }

      @media (max-width: 680px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 520px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .add_item_button {
      background-color: #699eff;
      color: white;
      font-size: 1rem;
      padding: 10px;
      border-radius: 5px;
      border: none;
      margin-top: 3rem;
      cursor: pointer;

      :hover {
        background-color: #3577f3;
      }
    }
    .table_container {
      width: 100%;
      overflow-x: scroll;
      table {
        width: 100%;
        margin-top: 2rem;
        overflow-x: scroll;
        thead {
          tr {
            text-align: left;
            background-color: #f1f1f1;

            th {
              padding: 1rem;
            }
          }
        }
        tbody {
          tr {
            :nth-child(even) {
              background-color: #dadada;
            }
            td {
              padding: 1rem;

              .icons {
                font-size: 1.5rem;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
`;
export default Form;
