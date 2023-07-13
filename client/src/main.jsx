import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </React.StrictMode>
);