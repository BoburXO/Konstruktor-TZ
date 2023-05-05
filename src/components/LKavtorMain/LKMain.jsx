import React, { useContext, useEffect } from "react";
import s from "../LKavtorMain/LKMain.module.css";
import date from "../../assets/icons/dateIcon.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";
import search from "../../assets/icons/search.svg";
import LkAvtorPagination from "../../Pagination/LkAvtorPagination";

const LKMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getCreateTz, createTz, setTzSearch, tzSearch } = useContext(Context);
  useEffect(() => {
    getCreateTz();
  }, [tzSearch]);
  return (
    <>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <Fade bottom cascade>
            <h1>{t("lkavtor")}</h1>
            <br />
            <div className={s.lkmain_sect_labels}>
              <div className={s.input_field}>
                <img className={s.S_icon} src={search} alt="Search" />
                <input
                  onChange={(e) => setTzSearch(e.target.value)}
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
              <button
                onClick={() => navigate("/createtz")}
                className={s.lkmain_sect_create_btn}
              >
                <span style={{ fontSize: "25px" }}>+</span>
                <span>{t("lkavtor1")}</span>
              </button>
            </div>
            <div className={s.lkmain_sect_creators_labels}>
              <p style={{ width: "3%" }}>ID</p>
              <p style={{ width: "55%" }}>{t("lkavtor2")}</p>
              <p style={{ width: "27%" }}>{t("lkavtor3")}</p>
              <p style={{ width: "7%" }}>{t("lkavtor4")}</p>
            </div>
            <div className={s.lkmain_sect_creators_parent}>
              {createTz?.results?.map((el) => {
                return (
                  <div
                    className={s.lkmain_sect_creators_parent_card}
                    key={el.id}
                  >
                    <p style={{ width: "3%" }}>#{el?.row_number}</p>
                    <p style={{ width: "55%" }}>{el?.tz_name}</p>
                    <span
                      style={{ width: "20%" }}
                      className={s.lkmain_sect_dates}
                    >
                      <img src={date} alt="" />
                      <p>{el?.created_at}</p>
                    </span>
                    <div className={s.lkmain_sect_crud}>
                      <button className={s.lkmain_sect_crud_copy}>
                        <img src={copyIcon} alt="Copy" />
                      </button>
                      <button className={s.lkmain_sect_crud_create}>
                        <img src={createIcon} alt="Copy" />
                      </button>
                      <button className={s.lkmain_sect_crud_skacat}>
                        <img src={skacatIcon} alt="Download" />
                      </button>
                      <button className={s.lkmain_sect_crud_delete}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
            <br />
            <div className={s.content_pagination}>
              <LkAvtorPagination createTz={createTz?.total_pages} />
            </div>  
          </Fade>
        </div>
      </section>
    </>
  );
};

export default LKMain;
