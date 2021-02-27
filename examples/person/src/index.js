import { StrictMode } from "react";
import ReactDOM from "react-dom";

import app from "./app";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
