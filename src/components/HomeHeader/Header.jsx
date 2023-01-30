import React from 'react';
import s from "./Header.module.css";
import header from '../../assets/imgs/header.png';
import Fade from 'react-reveal/Fade';

const Header = () => {
  return (
    <>
    <header className={s.home_header}>
      <div className={s.container}>
      <Fade bottom cascade>
        <div className={s.header_parent}>
          <h1 className={s.header_label}>
          Система формирования технических заданий на разработку информационных систем и ресурсов
          </h1>
          <button className={s.header_btn}>Создать техническое задание</button>
          <img src={header} alt="" className={s.header_img} />
        </div>
        </Fade>
      </div>
    </header>
    </>
  )
}

export default Header