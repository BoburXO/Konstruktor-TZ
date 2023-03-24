import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";
import logo1 from "../../assets/imgs/logo1.svg";
import { useTranslation } from "react-i18next";

const Nav = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <nav className={s.home_navbar}>
        <div className={s.container}>
          <ul className={s.nav_ul}>
            <li>
              <NavLink>
                <img className={s.nav_logo1} src={logo1} alt="" />
              </NavLink>
            </li>
            <li className={s.nav_links}>
              <NavLink to="/" className={s.contact_link}>
                {t("nav1")}
              </NavLink>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className={s.til}
                name="language"
              >
                <option className={s.til__opt} value="ru">
                  Русский
                </option>
                <option className={s.til_opt} value="uz">
                  O'zbek
                </option>
              </select>
              <NavLink to="/lkavtor">
                {" "}
                <button className={s.nav_btn}>{t("nav2")}</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
