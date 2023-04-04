import React, { useContext, useEffect } from "react";
import s from "../ContentSite/ContentOfSite.module.css";
import search from "../../assets/icons/search.svg";
import date from "../../assets/icons/dateIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import download from "../../assets/icons/skacatIcon.svg";
import Fade from "react-reveal/Fade";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Context } from "../../Context/Context";

const ContentOfSite = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    getContentSearchFilter,
    contentSite,
    contentSearch,
    setContentSearch,
    deleteContent,
  } = useContext(Context);

  useEffect(() => {
    getContentSearchFilter();
  }, [contentSearch]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <section className={s.content_of_site}>
        <div className={s.content_of_site_container}>
          <div className={s.content_of_site_label}>
            <h1>{t("content-site.1")}</h1>
            {localStorage.getItem("roleName") !== "Author" ? (
              <button
                onClick={() => navigate("/addcontent")}
                className={s.content_of_site_label_btn}
              >
                <span style={{ fontSize: "25px" }}>+</span>
                <span>{t("content-site.2")}</span>
              </button>
            ) : null}
          </div>
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
                onChange={(e) => setContentSearch(e.target.value)}
                value={contentSearch}
                type="text"
                placeholder={t("content-site.3")}
              />
            </div>
            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    className={s.filter}
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem onClick={() => getContentSearchFilter()} value="">
                      {t("filter.1")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => getContentSearchFilter(true)}
                      value={15}
                    >
                      {t("filter.2")}
                    </MenuItem>
                    <MenuItem
                      onClick={() => getContentSearchFilter(false)}
                      value={16}
                    >
                      {t("filter.3")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <div className={s.content_db_labels}>
            <p style={{ textAlign: "start" }}>{t("content-site.4")}</p>
            <p style={{ textAlign: "start" }}>{t("content-site.5")}</p>
            <p style={{ textAlign: "start" }}>{t("content-site.6")}</p>
            <p style={{ textAlign: "end" }}>{t("content-site.7")}</p>
            <p style={{ textAlign: "end" }}>{t("content-site.8")}</p>
          </div>
          <div className={s.content_parent}>
            {contentSite.count === 0 ? (
              <h1 className={s.notFound}>Not found...</h1>
            ) : (
              contentSite?.results?.map((el, index) => {
                return (
                  <div className={s.content_parent_card} key={index}>
                    <Fade top cascade>
                      <p>
                        <b>{el.header_ru}</b>
                      </p>
                      <p className={s.sphere}>
                        {el.sphere.name_ru.slice(0, 27)}
                      </p>
                      <p className={s.Content_description}>
                        {el.description_ru.slice(0, 40)} {"..."}
                      </p>
                      <span className={s.content_dates}>
                        <img src={date} alt="" />
                        <p>{el.created_at.slice(0, 10)}</p>
                      </span>
                      {localStorage.getItem("roleName") !== "Author" ? (
                        <div className={s.content_crud}>
                          <Link to={`/updateContent/${el?.slug}`}>
                            <button className={s.content_crud_create}>
                              <img src={createIcon} alt="Copy" />
                            </button>
                          </Link>
                          <button className={s.content_crud_download}>
                            <a href={el?.doc_file_ru} download target="_blank">
                              <img src={download} alt="Download" />
                            </a>
                          </button>
                          <button
                            onClick={() => deleteContent(el?.slug)}
                            className={s.content_crud_delete}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </div>
                      ) : (
                        <div className={s.content_crud}>
                          <button className={s.content_crud_download}>
                            <a rel="noopener" href={el?.doc_file_ru} download target="_blank">
                              <img src={download} alt="Download" />
                            </a>
                          </button>
                          <Link to={`/content-of-site-index/${el?.slug}`}>
                            <button className={s.content_crud_create}>
                              <img src={createIcon} alt="Show" />
                            </button>
                          </Link>
                        </div>
                      )}
                    </Fade>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentOfSite;
