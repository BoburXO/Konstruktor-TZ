import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import HistoryStructureComp from "../../components/HistoryStructureComp/HistoryStructureComp";
import UserNav from "../../components/UserNav/UserNav";

const HistoryStructure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <UserNav />
      <HistoryStructureComp />
      <Footer />
    </>
  );
};

export default HistoryStructure;
