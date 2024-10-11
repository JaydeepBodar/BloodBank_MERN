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
        <Route path="/home" element={<Header />}>
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
          <Route path="dashboard" element={<Dashbord />} />
          {/* All user list */}
          <Route path="donorlist" element={<Userlist />} />
          <Route path="organizationlist" element={<Userlist />} />
          <Route path="hospitallist" element={<Userlist />} />
          <Route path="Hospitallist" element={<Hospitallist />} />
          {/* hospital inventory */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="hospitalinventory" element={<Inventory />} />
          <Route path="donorinventory" element={<Inventory />} />
          <Route path="donor/:id" element={<Singleuser />} />
          {/* donor inventory */}
          <Route path="donordatainventory" element={<Donorinventory />} />
          <Route path="anyalitic" element={<Anaylitic />} />
          <Route path="donororganization" element={<Organizationdata />} />
          <Route path="hospitalorganization" element={<Organizationdata />} />
          <Route path="hospitaloutinventory" element={<Donorinventory />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
