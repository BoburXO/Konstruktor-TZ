import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/HomeHeader/Header";
import Nav from "../../components/HomeNav/Nav";
import Section from "../../components/HomeSection/Section";
import UserNav from "../../components/UserNav/UserNav";
import "../Home/Home.module.css";
import { Dropdown } from "rsuite";

const Home = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {localStorage.getItem("ConstructorRoleAccessToken") ? (
        <UserNav />
      ) : (
        <Nav />
      )}
      <Header />
      <Section />
      <Footer />
    </>
  );
};

export default Home;
