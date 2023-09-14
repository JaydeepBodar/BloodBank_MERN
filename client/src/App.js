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
import Donorlist from "./Pages/Dashbordlist/Userlist";
import Hospitallist from "./Pages/Dashbordlist/Hospitallist";
import Singleuser from "./Component/Singleuser";
import Consumer from "./Pages/Dashbordlist/Consumer";
import Userlist from "./Pages/Dashbordlist/Userlist";
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
                <Userlist />
              </ProtectRoutes>
            }
          />
          <Route
            path="organizationlist"
            element={
              <ProtectRoutes>
                <Userlist />
              </ProtectRoutes>
            }
          />
          <Route
            path="hospitallist"
            element={
              <ProtectRoutes>
                <Userlist />
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
          <Route
            path="consumer"
            element={
              <ProtectRoutes>
                <Consumer />
              </ProtectRoutes>
            }
          />
          <Route path="donor/:id" element={<Singleuser />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
