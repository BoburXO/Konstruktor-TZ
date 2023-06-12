import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import OrganizationsComp from "../../components/OrganizationsComp/OrganizationsComp";
import UserNav from "../../components/UserNav/UserNav";

const Organizations = () => {
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
      <OrganizationsComp />
      <Footer />
    </>
  );
};

export default Organizations;
