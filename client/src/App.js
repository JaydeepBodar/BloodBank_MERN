import logo from "./logo.svg";
import "./custom.css";
import React from "react";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Header from "./Component/header/Header";
import Signup from "./Pages/Signup";
import Dashbord from "./Pages/Dashbord";
import ProtectRoutes from "./utils/ProtectRoutes";
import Loginprotect from "./utils/Loginprotect";
import Error from "./Component/Error";
import Inventory from "./Pages/Dashbordlist/Inventory";
import Donorlist from "./Pages/Dashbordlist/Donorlist";
import Hospitallist from "./Pages/Dashbordlist/Hospitallist";
import Singleuser from "./Component/Singleuser";
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route
          path="/"
          index
          element={
            <Loginprotect>
              <Home />
            </Loginprotect>
          }
        />
        <Route path="home" element={<Header />}>
          <Route
            path="login"
            element={
              <Loginprotect>
                <Login />
              </Loginprotect>
            }
          />
          <Route
            path="register"
            element={
              <Loginprotect>
                <Signup />
              </Loginprotect>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectRoutes>
                <Dashbord />
              </ProtectRoutes>
            }
          />
          <Route
            path="inventory"
            element={
              <ProtectRoutes>
                <Inventory />
              </ProtectRoutes>
            }
          />
          <Route
            path="donorlist"
            element={
              <ProtectRoutes>
                <Donorlist />
              </ProtectRoutes>
            }
          />
          <Route
            path="Hospitallist"
            element={
              <ProtectRoutes>
                <Hospitallist />
              </ProtectRoutes>
            }
          />
          <Route path="donor/:id" element={<Singleuser/>}/>
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
