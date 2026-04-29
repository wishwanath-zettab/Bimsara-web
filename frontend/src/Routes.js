import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./screens/about/About";
import Services from "./screens/services/Services";
import Buyers from "./screens/serviceScreen/buyers/buyers";
import Landlords from "./screens/serviceScreen/landlords/landloards";
import Sellers from "./screens/serviceScreen/sellers/sellers";
import Tenants from "./screens/serviceScreen/tenants/tenants";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Services />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/sellers" element={<Sellers />}></Route>
        <Route exact path="/buyers" element={<Buyers />}></Route>
        <Route exact path="/landlords" element={<Landlords />}></Route>
        <Route exact path="/tenants" element={<Tenants />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
