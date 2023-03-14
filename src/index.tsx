import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Data } from "./components/data";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Data>
      <App />
    </Data>
  </React.StrictMode>
);
