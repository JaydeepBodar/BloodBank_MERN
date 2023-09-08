import logo from "./logo.svg";
import "./custom.css";
import React from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Component/header/Header";
import Signup from "./Pages/Signup";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="home" element={<Header />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
