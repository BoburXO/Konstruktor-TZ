import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LKavtor from "./pages/LKavtor/LKavtor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lkavtor" element={<LKavtor/>}/>
      </Routes>
    </>
  );
}

export default App;
