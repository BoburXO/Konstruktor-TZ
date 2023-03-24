import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddContentComp from '../../components/AddContent_comp/AddContentComp';
import Footer from '../../components/Footer/Footer';
import UserNav from '../../components/UserNav/UserNav';

const AddContent = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <UserNav/>
       <AddContentComp/>
    <Footer/> 
    </>
  )
}

export default AddContent;