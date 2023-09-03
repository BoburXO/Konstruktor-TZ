import React, { useState } from "react";
import s from "../UserNav/UserNav.module.css";

import logofff from "../../assets/imgs/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import ava from "../../assets/icons/ava.png";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import Select from "react-select";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const options = [
  { label: "Русский", value: "ru" },
  { label: "O'zbek", value: "uz" },
  { label: "Ўзбек", value: "kr" },
];

const UserNav = () => {
  //drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  //drawer

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    window.location.reload();
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
                <span id={s.extra_logo_txt} className={s.logo_txt}>
                  {t("siteName")}
                </span>
              </Link>
            </li>
            <li className={s.userNav_right_lists}>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor:
                      state.isFocused && state.menuIsOpen ? "white" : "white",
                    outlineColor: "white",
                    background: "transparent",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                  }),
                }}
                className={s.select_nav}
                options={options}
                placeholder={
                  localStorage.getItem("i18nextLng") === "ru"
                    ? "Русский"
                    : localStorage.getItem("i18nextLng") === "uz"
                    ? "O'zbek"
                    : "Ўзбек"
                }
                onChange={({ value }) => changeLanguage(value)}
                isSearchable={false}
              />
              <span className={s.nav_avtor_content}>
                <b>{localStorage.getItem("roleUserName")}</b>
                <p>{localStorage.getItem("roleName")}</p>
              </span>

              <Link
                className={s.avatar_link}
                to={
                  localStorage.getItem("roleName") === "Author"
                    ? "/profile"
                    : null
                }
              >
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
                <span> {t("logOut.1")}</span>
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
              <button className={s.drawer} onClick={toggleDrawer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>

              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className="bla bla bla"
                size={"75%"}
              >
                <div className={s.mobile_nav}>
                  <div className={s.mobile_container}>
                    <div className={s.mobile_lists}>
                      <span className={s.logofff_list}>
                        <Link to="/main">
                          <img src={logofff} alt="logofff" />
                          <span className={s.logo_txt}>
                          {t("siteName")}
                          </span>
                        </Link>
                      </span>
                      <span className={s.select_side_bar}>
                        <Select
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor:
                                state.isFocused && state.menuIsOpen
                                  ? "white"
                                  : "white",
                              outlineColor: "white",
                              background: "transparent",
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "white",
                            }),
                          }}
                          className={s.select_side_bar}
                          options={options}
                          placeholder={
                            localStorage.getItem("i18nextLng") === "ru"
                              ? "Русский"
                              : localStorage.getItem("i18nextLng") === "uz"
                              ? "O'zbek"
                              : "Ўзбек"
                          }
                          onChange={({ value }) => changeLanguage(value)}
                          isSearchable={false}
                        />
                      </span>
                      <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/structure"
                        >
                          {t("usernav")}
                        </NavLink>
                      </span>
                      <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/lkadminspravochnik"
                        >
                          {t("usernav1")}
                        </NavLink>
                      </span>
                      <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/lkadminshablon"
                        >
                          {t("usernav2")}
                        </NavLink>
                      </span>
                      <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/contentofsite"
                        >
                          {t("usernav3")}
                        </NavLink>
                      </span>
                      {localStorage.getItem("roleName") === "SuperAdmin" ? (
                        <span>
                          <NavLink
                            style={({ isActive }) =>
                              isActive ? activeStyle : undefined
                            }
                            to="/organizations"
                          >
                            {t("super.1")}
                          </NavLink>
                        </span>
                      ) : (
                        <span>
                          <NavLink
                            style={({ isActive }) =>
                              isActive ? activeStyle : undefined
                            }
                            to="/lkavtor"
                          >
                            {t("lkavtor1")}
                          </NavLink>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Drawer>
              {localStorage.getItem("roleName") === "SuperAdmin" ? (
                <li>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    to="/organizations"
                  >
                    {t("super.1")}
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    to="/lkavtor"
                  >
                    {t("lkavtor1")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className={s.userNav_container}>
            <ul className={s.author_routes}>
              <li>
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  to="/lkavtor"
                >
                  {t("lkavtor1")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  to="/profile"
                >
                  {t("profile.1")}
                </NavLink>
              </li>
              <button className={s.drawer} onClick={toggleDrawer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className="bla bla bla"
                size={"75%"}
              >
                <div className={s.mobile_nav}>
                  <div className={s.mobile_container}>
                    <div className={s.mobile_lists}>
                      <span className={s.logofff_list}>
                        <Link to="/main">
                          <img src={logofff} alt="logofff" />
                          <span className={s.logo_txt}>
                          {t("siteName")}
                          </span>
                        </Link>
                      </span>
                      <span className={s.select_side_bar}>
                        <Select
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor:
                                state.isFocused && state.menuIsOpen
                                  ? "white"
                                  : "white",
                              outlineColor: "white",
                              background: "transparent",
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: "white",
                            }),
                          }}
                          className={s.select_side_bar}
                          options={options}
                          placeholder={
                            localStorage.getItem("i18nextLng") === "ru"
                              ? "Русский"
                              : localStorage.getItem("i18nextLng") === "uz"
                              ? "O'zbek"
                              : "Ўзбек"
                          }
                          onChange={({ value }) => changeLanguage(value)}
                          isSearchable={false}
                        />
                      </span>
                      {/* <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/lkadminspravochnik"
                        >
                          {t("usernav1")}
                        </NavLink>
                      </span> */}
                      {/* <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/contentofsite"
                        >
                          {t("usernav3")}
                        </NavLink>
                      </span> */}
                      <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/lkavtor"
                        >
                          {t("lkavtor1")}
                        </NavLink>
                      </span>
                      <span>
                        <NavLink
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          to="/profile"
                        >
                          {t("profile.1")}
                        </NavLink>
                      </span>
                    </div>
                  </div>
                </div>
              </Drawer>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default UserNav;
