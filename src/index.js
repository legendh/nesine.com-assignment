require("file-loader?name=[name].[ext]!./index.html");

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import { MainContextProvider } from "./store/main-context";

const root = createRoot(document.getElementById("app"));
root.render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
);
