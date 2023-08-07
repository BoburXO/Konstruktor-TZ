import React from 'react'
import { useNavigate } from 'react-router-dom'
import ContentOfSite from '../../components/ContentSite/ContentOfSite'
import Footer from '../../components/Footer/Footer'
import UserNav from '../../components/UserNav/UserNav'

const Content = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <UserNav/>
    <ContentOfSite/>
    <Footer/>
    </>
  )
}

export default Content;