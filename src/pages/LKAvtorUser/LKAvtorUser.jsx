import React from "react";
import Footer from "../../components/Footer/Footer";
import LkAvtorUserComp from "../../components/LkAvtorUserComp/LkAvtorUserComp";
import UserNav from "../../components/UserNav/UserNav";

const LKAvtorUser = () => {
  return (
    <>
      <UserNav />
      <LkAvtorUserComp />
      <Footer />
    </>
  );
};

export default LKAvtorUser;
