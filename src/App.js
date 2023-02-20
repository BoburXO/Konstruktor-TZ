import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/HomeNav/Nav";
import UserNav from "./components/UserNav/UserNav";
import AddContent from "./pages/AddContent/AddContent";
import Content from "./pages/ContentOfSite/Content";
import CreateTZ from "./pages/CreateTZ/CreateTZ";
import CreateTZ2 from "./pages/CreateTZ2/CreateTZ2";
import Home from "./pages/Home/Home";
import LKAdminSpravochnik from "./pages/LKAdminSpravochnik/LKAdminSpravochnik";
import LKAdminstrator from "./pages/LKAdminstratorShablon/LKAdminstrator";
import LKavtor from "./pages/LKavtor/LKavtor";
import Structure from "./pages/StructureTZ/Structure";
import Templates from "./Params/Templates/Templates";

function App() {
  const [isUser,setIsUser] = React.useState(true);
  return (
    <>
   {isUser ? (
     <UserNav/>
   ):(
    <Nav/>
   )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lkavtor" element={<LKavtor />} />
        <Route path="/lkadminshablon" element={<LKAdminstrator />} />
        <Route path="/lkadminspravochnik" element={<LKAdminSpravochnik />} />
        <Route path="/contentofsite" element={<Content />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/createtz" element={<CreateTZ />} />
        <Route path="/createtz2" element={<CreateTZ2 />} />
        <Route path="/templatePunkt/:id" element={<Templates/>}/>
        <Route path="/addcontent" element={<AddContent/>}/>
      </Routes>
    </>
  );
}

export default App;
