import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Minesweeper from "./components/page/classicGame/Minesweeper";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Minesweeper />);

reportWebVitals();
