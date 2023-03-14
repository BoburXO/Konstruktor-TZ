import React from "react";
import s from "../Chernovek/chernovek.module.css";
import search from "../../assets/icons/search.svg";
import { contentDB } from "../../contentDB";
import date from "../../assets/icons/dateIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Chernovek = () => {
  const navigate = useNavigate()
  const {t} = useTranslation();
  return (
    <>
      <section className={s.content_of_site}>
        <div className={s.content_of_site_container}>
          <div className={s.content_of_site_label}>
            <h1>{t("usernav5")}</h1>
            <button onClick={() => navigate("/addcontent")} className={s.content_of_site_label_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>{t("content-site.2")}</span>
            </button>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder={t("content-site.3")} />
          </div>
          <div className={s.content_db_labels}>
            <p style={{ textAlign: "start" }}>{t("content-site.4")}</p>
            <p style={{ textAlign: "start" }}>{t("content-site.5")}</p>
            <p style={{ textAlign: "start" }}>{t("content-site.6")}</p>
            <p style={{ textAlign: "end" }}>{t("content-site.7")}</p>
            <p style={{ textAlign: "end" }}>{t("content-site.8")}</p>
          </div>
          <div className={s.content_parent}>
            {contentDB?.map((el) => {
              return (
                <div className={s.content_parent_card} key={el.id}>
                  <Fade top cascade>
                    <p>
                      <b>{el.label}</b>
                    </p>
                    <p>{el.sfera}</p>
                    <p>{el.desc}</p>
                    <span className={s.content_dates}>
                      <img src={date} alt="" />
                      <p>{el.date}</p>
                    </span>
                    <div className={s.content_crud}>
                      <button onClick={() => navigate("/updateContent")} className={s.content_crud_create}>
                        <img src={createIcon} alt="Copy" />
                      </button>
                      <button className={s.content_crud_delete}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </Fade>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Chernovek;
