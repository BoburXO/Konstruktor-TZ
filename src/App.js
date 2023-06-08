import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Templates from "./Params/Templates/Template";
import UpdContent from "./Params/UpdContent/UpdContent";
import UserTemplate from "./Params/Templates/UserTemplate";
import RegOneId from "./pages/Reg/RegOneId";
import OneId from "./pages/oneid/RegOneId";
import IndexSpra from "./Params/IndexSpravochnik/IndexSpra";
import ContentOfSiteUser from "./Params/ContentOfSiteUser/ContentOfSiteUser";
import Sphere from "./pages/Sphere/Sphere";
import HistoryStructure from "./pages/HistoryStructure/HistoryStructure";
import LKMainUpdate from "./Params/LKMainUpdate/LKMainUpdate";
import LKAvtorUser from "./pages/LKAvtorUser/LKAvtorUser";
import AuthorProfile from "./pages/AuthorProfile/AuthorProfile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegOneId />} />
        <Route path="/main" element={<Home />} />
        <Route path="/lkavtor" element={<LKavtor />} />
        <Route path="/createtz" element={<CreateTZ />} />
        <Route path="/createtz2" element={<CreateTZ2 />} />
        <Route path="/contentofsite" element={<Content />} />
        <Route path="/lkadminspravochnik" element={<LKAdminSpravochnik />} />
        <Route path="/index-spravochnik/:slug" element={<IndexSpra />} />
        <Route path="/user-samplePunkt/:id" element={<UserTemplate />} />
        <Route path="/lkavtor/:id" element={<LKMainUpdate />} />
        <Route path="/role-profile" element={<AuthorProfile />} />
        <Route
          path="/content-of-site-index/:slug"
          element={<ContentOfSiteUser />}
        />
        {localStorage.getItem("roleName") !== "Author" ? (
          <>
            <Route path="/lkadminshablon" element={<LKAdminstrator />} />
            <Route path="/spravochnikId/:slug" element={<SpravochnikId />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/createtz" element={<CreateTZ />} />
            <Route path="/createtz2" element={<CreateTZ2 />} />
            <Route path="/templatePunkt/:id" element={<Templates />} />
            <Route path="/addcontent" element={<AddContent />} />
            <Route path="/updateContent" element={<UpdContent />} />
            <Route path="/lkavtor-user" element={<LKAvtorUser />} />
            <Route path="/updateContent/:slug" element={<UpdContent />} />
            <Route path="/sphere" element={<Sphere />} />
            <Route path="/history-structure" element={<HistoryStructure />} />
          </>
        ) : null}
        <Route path="/oneid/:one" element={<OneId />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "red",
            color: "#FFF",
          },
        }}
      />
    </>
  );
}

export default App;
