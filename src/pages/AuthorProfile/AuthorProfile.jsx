import React from "react";
import { useNavigate } from "react-router-dom";
import AuthorProfileComp from "../../components/AuthorProfileComp/AuthorProfileComp";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";

const AuthorProfile = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <UserNav />
      <AuthorProfileComp />
      <Footer />
    </>
  );
};

export default AuthorProfile;
