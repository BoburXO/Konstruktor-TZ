import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";
import logo1 from "../../assets/imgs/logo1.svg";

const Nav = () => {
  return (
    <>
      <nav className={s.home_navbar}>
        <div className={s.container}>
          <ul className={s.nav_ul}>
            <li>
              <NavLink to="/">
                <img className={s.nav_logo1} src={logo1} alt="" />
              </NavLink>
            </li>
            <li className={s.nav_links}>
              <NavLink to="/" className={s.contact_link}>
                Контакты
              </NavLink>
              <select className={s.til} name="language">
                <option className={s.til__opt} value="ru">
                  Русский
                </option>
                <option className={s.til_opt} value="uz">
                  O'zbek
                </option>
              </select>
              <NavLink to="/lkavtor">
                {" "}
                <button className={s.nav_btn}>Личный кабинет</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
