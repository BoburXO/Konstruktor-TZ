import React from "react";
import s from "./Header.module.css";
import header from "../../assets/imgs/header.png";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <header className={s.home_header}>
        <div className={s.container}>
          <Fade bottom cascade>
            <div className={s.header_parent}>
              <h1 className={s.header_label}>{t("hheader")}</h1>
              <button
                onClick={() =>
                  localStorage.getItem("roleName") === "SuperAdmin"
                    ? navigate("/organizations")
                    : navigate("/lkavtor")
                }
                className={s.header_btn}
              >
                {t("hheaderbtn")}
              </button>
              <img src={header} alt="" className={s.header_img} />
            </div>
          </Fade>
        </div>
      </header>
    </>
  );
};

export default Header;
