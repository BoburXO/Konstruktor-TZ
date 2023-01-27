import React from 'react'
import Spravochnik from '../../components/AminSpravochnik/Spravochnik'
import Footer from '../../components/Footer/Footer'
import UserNav from '../../components/UserNav/UserNav'

const LKAdminSpravochnik = () => {
  return (
    <>
       <UserNav/>
       <Spravochnik/>
       <Footer/>
    </>
  )
}

export default LKAdminSpravochnik