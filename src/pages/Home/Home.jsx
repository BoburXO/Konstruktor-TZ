import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/HomeHeader/Header';
import Nav from '../../components/HomeNav/Nav';
import Section from '../../components/HomeSection/Section';
import "../Home/Home.module.css";

const Home = () => {
  return (
    <>
    <Nav/>
    <Header/>
    <Section/>
    <Footer/>
    </>
  )
}

export default Home