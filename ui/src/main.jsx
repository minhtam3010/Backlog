import React, { createElement } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Backlog from "./Backlog";
import "./index.css";
import Login from "./Login";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<Login />}></Route>
            <Route path="/backlog" element={<Backlog />}></Route>
        </Routes>
    </BrowserRouter>
);
