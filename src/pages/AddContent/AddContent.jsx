import React from 'react'
import AddContentComp from '../../components/AddContent_comp/AddContentComp';
import Footer from '../../components/Footer/Footer';
import UserNav from '../../components/UserNav/UserNav';

const AddContent = () => {
  return (
    <>
    <UserNav/>
       <AddContentComp/>
    <Footer/> 
    </>
  )
}

export default AddContent;