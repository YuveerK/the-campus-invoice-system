import React from "react";
import styled from "styled-components";
import "./App.css";
import Form from "./Form";
import Invoice from "./Invoice";
import { Route, Routes } from "react-router-dom";
import InvoicePdf from "./InvoicePdf";
import DownloadPdf from "./DownloadPdf";

function App() {
  return (
    <div className="App">
      <AppContainer>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/invoice" element={<DownloadPdf />} />
        </Routes>
      </AppContainer>
    </div>
  );
}

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;
export default App;
