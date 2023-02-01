import React from 'react';
import Footer from '../../components/Footer/Footer';
import UserNav from '../../components/UserNav/UserNav';
import s from '../Templates/Templates.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { templates } from '../../templates';

const Templates = () => {
       const navigate = useNavigate()
      const {id} = useParams()
       const paramsFind = templates?.find((el) => {
              return el.id ===+id
       })
  return (
    <>
    <UserNav/>
       <section className={s.templates_parent}>
              <div className={s.templates_container}>
                   <div className={s.templates_card}>
                     <h1>{paramsFind?.punkt}</h1>
                     <br />
                     <br />
                     <p>{paramsFind?.desc}</p>
                     </div>  
                     <button onClick={() => navigate(-1)}>Назад</button>
              </div>
       </section>
    <Footer/>
    </>
  )
}

export default Templates