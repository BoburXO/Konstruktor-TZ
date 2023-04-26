import React, { useContext, useEffect } from "react";
import s from "../HistoryStructureComp/historyStructure.module.css";
import search from "../../assets/icons/search.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import download from "../../assets/icons/skacatIcon.svg";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";

const HistoryStructureComp = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const {
    spravochnik,
    removeSlug,
    getAllSpraSearch,
    setSpraSearch,
    spraSearch,
    isActiveClassificator,
  } = useContext(Context);

  useEffect(() => {
    getAllSpraSearch();
  }, [spraSearch]);


  return (
    <>
      <section className={s.Spravochnik}>
        <div className={s.Spravochnik_container}>
          <div className={s.Spravochnik_label}>
            <h1>История структур</h1>      
              <span>
                <button className={s.Spravochnik_label_btn}>
                  <span style={{ fontSize: "25px" }}>+</span>
                  <span onClick={() => navigate("/structure")}>Создать структуру</span>
                </button>
              </span>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input
              onChange={(e) => setSpraSearch(e.target.value.trim())}
              value={spraSearch}
              type="text"
              placeholder={t("spra5")}
            />
          </div>
          <div className={s.Spravochnik_cards_labels}>
            <p style={{ width: "3%" }}>№</p>
            <p style={{ width: "52%" }}>{t("spra6")}</p>
            <p className={s.checkbox_active}>{t("active")}</p>
            <p style={{ width: "27%" }}>{t("spra7")}</p>
            <p style={{ width: "7%" }}>{t("spra8")}</p>
          </div>
          <div className={s.Spravochnik_sect_creators_parent}>
            {spravochnik.length === 0 ? (
              <h1 className={s.notFound}>{t("toast404")}</h1>
            ) : (
              spravochnik?.results?.map((el, index) => {
                return (
                  <div
                    className={s.Spravochnik_sect_creators_parent_cards}
                    key={el.id}
                  >
                    <Fade top cascade>
                      <span className={s.Spravochnik_twink}>
                        <p>{index}</p>
                        <p>{el.title_ru}</p>
                      </span>
                      <div className={s.switch_toggle}>
                        <Switch
                          defaultChecked={el?.is_active}
                          onChange={() =>
                            isActiveClassificator(el?.slug, el?.is_active)
                          }
                        />
                      </div>
                      <p style={{ width: "20%" }}>
                        {el.elements.length} {t("spra9")}
                      </p>
                      {localStorage.getItem("roleName") !== "Author" ? (
                        <div className={s.lkmain_sect_crud}>
                          <Link to={`/spravochnikId/${el?.slug}`}>
                            <button className={s.lkmain_sect_crud_create}>
                              <img src={createIcon} alt="Copy" />
                            </button>
                          </Link>
                          <button
                            onClick={() => removeSlug(el?.slug)}
                            className={s.lkmain_sect_crud_delete}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </div>
                      ) : (
                        <div className={s.lkmain_sect_crud}>
                          <button className={s.lkmain_sect_crud_download}>
                            <img src={download} alt="Download" />
                          </button>

                          <Link to={`/index-spravochnik/${el?.slug}`}>
                            <button className={s.lkmain_sect_crud_create}>
                              <img src={createIcon} alt="Copy" />
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

export default HistoryStructureComp;
