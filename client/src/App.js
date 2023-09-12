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
function App() {
  return (
    <React.Fragment>
      <Routes>  
        <Route path="*" element={<Error/>}/>
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
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
