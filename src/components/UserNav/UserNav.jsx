import React, { useState } from "react";
import s from "../UserNav/UserNav.module.css";
import logofff from "../../assets/imgs/logofff.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ava from "../../assets/icons/ava.png";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const UserNav = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const { LogOut } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("roleName"));

  const activeStyle = {
    background: " rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
  };

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsAdmin(localStorage.getItem("roleName"));
  }, []);

  return (
    <>
      <nav className={s.userNav}>
        <div className={s.userNav_container}>
          <ul className={s.userNav_lists}>
            <li className={s.logofff_list}>
              <Link to="/main">
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
                <b>{localStorage.getItem("roleUserName")}</b>
                <p>{localStorage.getItem("roleName")}</p>
              </span>

              <Link className={s.avatar_link}>
                <img src={ava} alt="Avatar" />
              </Link>
              <button onClick={() => LogOut()} className={s.logoutBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                Выйти
              </button>
            </li>
          </ul>
        </div>
        {isAdmin !== "Author" ? (
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
        ) : null}
      </nav>
    </>
  );
};

export default UserNav;
