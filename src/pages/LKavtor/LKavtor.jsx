import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import LKMain from "../../components/LKavtorMain/LKMain";

const LKavtor = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    // if (localStorage.getItem("roleName") === "SuperAdmin") {
    //   navigate(-1);
    // }
  }, []);
  return (
    <>
      <UserNav />
      <LKMain />
      <Footer />
    </>
  );
};

export default LKavtor;
