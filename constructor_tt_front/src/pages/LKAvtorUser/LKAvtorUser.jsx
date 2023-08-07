import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import LkAvtorUserComp from "../../components/LkAvtorUserComp/LkAvtorUserComp";
import UserNav from "../../components/UserNav/UserNav";

const LKAvtorUser = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <UserNav />
      <LkAvtorUserComp />
      <Footer />
    </>
  );
};

export default LKAvtorUser;
