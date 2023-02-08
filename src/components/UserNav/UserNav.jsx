import React from "react";
import s from "../UserNav/UserNav.module.css";
import logofff from "../../assets/imgs/logofff.svg";
import { Link, NavLink } from "react-router-dom";
import ava from "../../assets/icons/ava.png";
import { useTranslation } from "react-i18next";

const UserNav = () => {
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

  const activeStyle = {
    background: " rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
  };
  return (
    <>
      <nav className={s.userNav}>
        <div className={s.userNav_container}>
          <ul className={s.userNav_lists}>
            <li className={s.logofff_list}>
              <Link to="/">
                <img src={logofff} alt="logofff" />
              </Link>
            </li>
            <li className={s.userNav_right_lists}>
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
              <span className={s.nav_avtor_content}>
                <b>Фамилия Имя</b>
                <p>Автор</p>
              </span>
              <Link className={s.avatar_link}>
                <img src={ava} alt="Avatar" />
              </Link>
            </li>
          </ul>
        </div>

        <div className={s.userNav_container}>
          <ul className={s.admin_routes}>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/structure"
              >
                {t("usernav")}
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/lkadminspravochnik"
              >
                {t("usernav1")}
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/lkadminshablon"
              >
                {t("usernav2")}
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/contentofsite"
              >
                {t("usernav3")}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default UserNav;
