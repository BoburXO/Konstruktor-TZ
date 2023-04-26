import React from 'react'
import Footer from '../../components/Footer/Footer'
import HistoryStructureComp from '../../components/HistoryStructureComp/HistoryStructureComp'
import UserNav from '../../components/UserNav/UserNav'

const HistoryStructure = () => {
  return (
    <>
    <UserNav/>
       <HistoryStructureComp/>
       <Footer/>
    </>
  )
}

export default HistoryStructure