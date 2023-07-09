import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import SuperTzComp from "../../components/SuperTzComp/SuperTzComp";
import UserNav from "../../components/UserNav/UserNav";

const SuperTZ = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    if (localStorage.getItem("roleName") !== "SuperAdmin") {
      navigate("/main");
    }
  }, []);
  return (
    <>
      <UserNav />
      <SuperTzComp />
      <Footer />
    </>
  );
};

export default SuperTZ;
