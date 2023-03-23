import React, { createElement, useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "./AuthContext";
import Backlog from "./Backlog";
import "./index.css";
import Login from "./Login";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ authenticated: login, setAuthenticated: setLogin }}
      >
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route path="/backlog" element={<Backlog />}></Route>
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
};

// root.render(
//   <BrowserRouter>
//     <LoginContext.Provider
//       value={{ authenticated: login }}
//     ></LoginContext.Provider>
//     <Routes>
//       <Route path="" element={<Login />}></Route>
//       <Route path="/backlog" element={<Backlog />}></Route>
//       <Route path="/test" element={<Demo />}></Route>
//     </Routes>
//   </BrowserRouter>
// );

export default App;
