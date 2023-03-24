import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/HomeNav/Nav";
import UserNav from "./components/UserNav/UserNav";
import PageNotFound from "./pages/404/PageNotFound";
import AddContent from "./pages/AddContent/AddContent";
import Content from "./pages/ContentOfSite/Content";
import CreateTZ from "./pages/CreateTZ/CreateTZ";
import CreateTZ2 from "./pages/CreateTZ2/CreateTZ2";
import Home from "./pages/Home/Home";
import LKAdminSpravochnik from "./pages/LKAdminSpravochnik/LKAdminSpravochnik";
import LKAdminstrator from "./pages/LKAdminstratorShablon/LKAdminstrator";
import LKavtor from "./pages/LKavtor/LKavtor";
import Structure from "./pages/StructureTZ/Structure";
import SpravochnikId from "./Params/Spravochnik/SpravochnikId";
import Templates from "./Params/Templates/Templates";
import UpdContent from "./components/UpdContent/UpdContent";
import Chernovek from "./pages/Chernovek/Chernovek";
import UserTemplate from "./Params/Templates/UserTemplate";
import RegOneId from "./pages/Reg/RegOneId";
import OneId from "./pages/oneid/RegOneId";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegOneId />} />
        <Route path="/main" element={<Home />} />
        <Route path="/lkavtor" element={<LKavtor />} />
        {localStorage.getItem("roleName") !== "Author" ? (
          <>
            <Route path="/lkadminshablon" element={<LKAdminstrator />} />
            <Route
              path="/lkadminspravochnik"
              element={<LKAdminSpravochnik />}
            />
            <Route path="/spravochnikId/:slug" element={<SpravochnikId />} />
            <Route path="/contentofsite" element={<Content />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/createtz" element={<CreateTZ />} />
            <Route path="/createtz2" element={<CreateTZ2 />} />
            <Route path="/templatePunkt/:id" element={<Templates />} />
            <Route path="/addcontent" element={<AddContent />} />
            <Route path="/updateContent" element={<UpdContent />} />
            <Route path="/chernovek" element={<Chernovek />} />
            <Route path="/user-samplePunkt/:id" element={<UserTemplate />} />
          </>
        ) : null}
        <Route path="/oneid/:one" element={<OneId />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
