import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import StructureComponent from "../../components/Structure/StructureComponent";
import UserNav from "../../components/UserNav/UserNav";

const Structure = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <UserNav/>
      <StructureComponent />
      <Footer />
    </>
  );
};

export default Structure;
