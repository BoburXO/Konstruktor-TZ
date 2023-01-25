import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LKAdminstrator from "./pages/LKAdminstrator/LKAdminstrator";
import LKavtor from "./pages/LKavtor/LKavtor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lkavtor" element={<LKavtor/>}/>
        <Route path="/lkadminstrator" element={<LKAdminstrator/>}/>
      </Routes>
    </>
  );
}

export default App;
