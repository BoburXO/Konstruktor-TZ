import React, { useContext, useEffect } from "react";
import s from "../LKavtorMain/LKMain.module.css";
import date from "../../assets/icons/dateIcon.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";
import search from "../../assets/icons/search.svg";
import LkAvtorPagination from "../../Pagination/LkAvtorPagination";
import Select from "react-select";

const LKMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    getCreateTz,
    createTz,
    setTzSearch,
    tzSearch,
    getCreateTzSelectType,
  } = useContext(Context);

  useEffect(() => {
    getCreateTz();
  }, [tzSearch]);

  const options = [
    { value: "", label: t("filter.1") },
    { value: 1, label: t("lkavtor5") },
    { value: 2, label: t("lkavtor6") },
  ];

  return (
    <>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <h1>{t("lkavtor")}</h1>
          <br />
          <div className={s.lkmain_sect_labels}>
            <div
              style={{
                width: "35%",
                display: "flex",
                height: "60px",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className={s.input_field}>
                <img className={s.S_icon} src={search} alt="Search" />
                <input
                  onChange={(e) => setTzSearch(e.target.value)}
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
              <div>
                <Select
                  placeholder={t("filter.4")}
                  onChange={(value) => getCreateTzSelectType(value.value)}
                  className={s.selecttt}
                  options={options}
                />
              </div>
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
                <div className={s.lkmain_sect_creators_parent_card} key={el.id}>
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
                      <a
                        rel="noopener"
                        href={el?.pdf_file}
                        download
                        target="_blank"
                      >
                        {" "}
                        <img src={skacatIcon} alt="Download" />
                      </a>
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
        </div>
      </section>
    </>
  );
};

export default LKMain;
