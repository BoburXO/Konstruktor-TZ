import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Shablonla from "../../components/LKAminShablon/Shablonla";
import UserNav from "../../components/UserNav/UserNav";
const LKAdminstrator = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <UserNav />
      <Shablonla />
      <Footer />
    </>
  );
};

export default LKAdminstrator;
