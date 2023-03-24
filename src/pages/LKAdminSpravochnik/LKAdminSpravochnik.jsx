import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spravochnik from '../../components/AdminSpravochnik/Spravochnik'
import Footer from '../../components/Footer/Footer'
import UserNav from '../../components/UserNav/UserNav'

const LKAdminSpravochnik = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <UserNav/>
       <Spravochnik/>
       <Footer/>
    </>
  )
}

export default LKAdminSpravochnik