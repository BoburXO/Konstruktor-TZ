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
import RegOneId from "./pages/Reg/RegOneId";
import OneId from "./pages/oneid/RegOneId";
import IndexSpra from "./Params/IndexSpravochnik/IndexSpra";
import Sphere from "./pages/Sphere/Sphere";
import LKAvtorUser from "./pages/LKAvtorUser/LKAvtorUser";
import Organizations from "./pages/Organizations/Organizations";
import SuperTZ from "./pages/SuperTZ/SuperTZ";
import Profile from "./pages/Profile/Profile";
import { ProtectedAuthorRoute } from "./components/ProtectedRoutes/ProtectedAuthorRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegOneId />} />
        <Route path="/main" element={<Home />} />
        <Route path="/lkavtor" element={<LKavtor />} />
        <Route path="/tz/create/:tzId" element={<CreateTZ action="create" />} />
        <Route path="/tz/edit/:tzId" element={<CreateTZ action="edit" />} />
        <Route path="/tz/view/:tzId" element={<CreateTZ action="view" />} />
        <Route
          path="/tz/preview/:tzId"
          element={<CreateTZ action="preview" />}
        />
        <Route path="/createtz2" element={<CreateTZ2 />} />
        <Route path="/structure/edit/:id" element={<Structure />} />
        <Route path="/structure/:id" element={<Structure />} />
        <Route path="/oneid/:one" element={<OneId />} />
        <Route path="*" element={<PageNotFound />} />

        {localStorage.getItem("roleName") !== "Author" ? (
          <>
            <Route
              path="/lkadminspravochnik"
              element={<LKAdminSpravochnik />}
            />
            <Route path="/index-spravochnik/:id" element={<IndexSpra />} />
            <Route path="/contentofsite" element={<Content />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/:id" element={<SuperTZ />} />
            <Route path="/lkadminshablon" element={<LKAdminstrator />} />
            <Route path="/spravochnikId/:id" element={<SpravochnikId />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/createtz" element={<CreateTZ />} />
            <Route path="/createtz2" element={<CreateTZ2 />} />
            <Route path="/templatePunkt/:id" element={<Templates />} />
            <Route path="/addcontent" element={<AddContent />} />
            <Route path="/updateContent" element={<UpdContent />} />
            <Route path="/lkavtor-user" element={<LKAvtorUser />} />
            <Route path="/updateContent/:id" element={<UpdContent />} />
            <Route path="/sphere" element={<Sphere />} />
          </>
        ) : null}
        <Route
          path="/profile"
          element={
            <ProtectedAuthorRoute>
              <Profile />
            </ProtectedAuthorRoute>
          }
        />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
    </>
  );
}

export default App;
