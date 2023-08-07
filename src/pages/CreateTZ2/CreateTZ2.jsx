import React from 'react'
import { useNavigate } from 'react-router-dom'
import Createtz2 from '../../components/CreateTZ2-component/Createtz2'
import Footer from '../../components/Footer/Footer'
import UserNav from '../../components/UserNav/UserNav'

const CreateTZ2 = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <UserNav/>
       <Createtz2/>
       <Footer/>
    </>
  )
}

export default CreateTZ2