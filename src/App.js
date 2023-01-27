import React from "react";
import { Routes, Route } from "react-router-dom";
import Content from "./pages/ContentOfSite/Content";
import Home from "./pages/Home/Home";
import LKAdminSpravochnik from "./pages/LKAdminSpravochnik/LKAdminSpravochnik";
import LKAdminstrator from "./pages/LKAdminstratorShablon/LKAdminstrator";
import LKavtor from "./pages/LKavtor/LKavtor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lkavtor" element={<LKavtor />} />
        <Route path="/lkadminshablon" element={<LKAdminstrator />} />
        <Route path="/lkadminspravochnik" element={<LKAdminSpravochnik />} />
        <Route path="/contentofsite" element={<Content />} />
      </Routes>
    </>
  );
}

export default App;
