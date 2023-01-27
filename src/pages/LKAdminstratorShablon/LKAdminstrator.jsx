import React from 'react';
import Footer from '../../components/Footer/Footer';
import Shablonla from '../../components/LKAminShablon/Shablonla';
import UserNav from '../../components/UserNav/UserNav';
import s from './LKAdminstrator.module.css';

const LKAdminstrator = () => {
  return (
    <>
       <UserNav/>
       <Shablonla/>
       <Footer/>
    </>
  )
}

export default LKAdminstrator