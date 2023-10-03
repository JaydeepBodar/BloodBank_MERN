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
import Inventory from "./Pages/Inventory";
import Hospitallist from "./Pages/Dashbordlist/Hospitallist";
import Singleuser from "./Component/Singleuser";
import Userlist from "./Pages/Dashbordlist/Userlist";
import Donorinventory from "./Pages/Donorinventory";
import Organizationdata from "./Component/Organizationdata";
import Anaylitic from "./Pages/Dashbordlist/Anaylitic";
import Adminauth from "./Pages/Adminauth";
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
            path="Adminsignup"
            element={
              <Loginprotect>
                <Adminauth />
              </Loginprotect>
            }
          />
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
          {/* dashboard */}
          <Route
            path="dashboard"
            element={
              <ProtectRoutes>
                <Dashbord />
              </ProtectRoutes>
            }
          />
          {/* All user list */}
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
          {/* hospital inventory */}
          <Route
            path="inventory"
            element={
              <ProtectRoutes>
                <Inventory />
              </ProtectRoutes>
            }
          />
          <Route
            path="hospitalinventory"
            element={
              <ProtectRoutes>
                <Inventory />
              </ProtectRoutes>
            }
          />
          <Route
            path="donorinventory"
            element={
              <ProtectRoutes>
                <Inventory />
              </ProtectRoutes>
            }
          />
          <Route
            path="donor/:id"
            element={
              <ProtectRoutes>
                <Singleuser />
              </ProtectRoutes>
            }
          />
          {/* donor inventory */}
          <Route
            path="donordatainventory"
            element={
              <ProtectRoutes>
                <Donorinventory />
              </ProtectRoutes>
            }
          />
          <Route
            path="anyalitic"
            element={
              <ProtectRoutes>
                <Anaylitic />
              </ProtectRoutes>
            }
          />
          <Route
            path="donororganization"
            element={
              <ProtectRoutes>
                <Organizationdata />
              </ProtectRoutes>
            }
          />
          <Route
            path="hospitalorganization"
            element={
              <ProtectRoutes>
                <Organizationdata />
              </ProtectRoutes>
            }
          />
          <Route
            path="hospitaloutinventory"
            element={
              <ProtectRoutes>
                <Donorinventory />
              </ProtectRoutes>
            }
          />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
