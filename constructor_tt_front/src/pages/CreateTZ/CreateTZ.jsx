import React from 'react'
import Footer from '../../components/Footer/Footer'
import Createtz1 from '../../components/CreateTZ1-component/CreateTZ1'
import UserNav from '../../components/UserNav/UserNav'
import { useNavigate } from 'react-router-dom'

const CreateTZ = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <UserNav/>
    <Createtz1/>
    <Footer/>
    </>
  )
}

export default CreateTZ