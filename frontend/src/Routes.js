import React, { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import About from "./screens/about/About";
import Services from "./screens/services/Services";
import Buyers from "./screens/serviceScreen/buyers/buyers";
import Landlords from "./screens/serviceScreen/landlords/landloards";
import Sellers from "./screens/serviceScreen/sellers/sellers";
import Tenants from "./screens/serviceScreen/tenants/tenants";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const Routers = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Services />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/sellers" element={<Sellers />}></Route>
        <Route exact path="/buyers" element={<Buyers />}></Route>
        <Route exact path="/landlords" element={<Landlords />}></Route>
        <Route exact path="/tenants" element={<Tenants />}></Route>
        <Route exact path="/admin" element={<AdminLogin />}></Route>
        <Route exact path="/admin/dashboard" element={<AdminDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
