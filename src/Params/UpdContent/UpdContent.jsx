import React, { useState, useRef } from "react";
import s from "./UpdContent.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate, useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import Footer from "../../components/Footer/Footer";

const UpdContent = () => {
  const { contentSite, getContentSearchFilter } = useContext(Context);
  const { slug } = useParams();
  const ParamsContent = contentSite?.results?.find((el) => {
    return el?.slug === slug;
  });

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    getContentSearchFilter();
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <UserNav />
      <div className={s.AddContent}>
        <Fade bottom cascade>
          <div className={s.AddContent_container}>
            <div className={s.AddContent_labels}>
              <span onClick={() => navigate("/contentofsite")}>
                <img src={arrowLeft} alt="←" />
                <p>{t("add-content.1")}</p>
              </span>
              <h1>{t("updContent")}</h1>
            </div>
            <div className={s.AddContent_parent}>
              <div className={s.AddContent_left}>
                <p>{t("add-content.3")}</p>
                <br />
                <p>{t("ru")}:</p>
                <input type="text" defaultValue={ParamsContent?.header_ru} />
                <br />
                <br />
                <p>{t("uz")}:</p>
                <input type="text" defaultValue={ParamsContent?.header_uz} />
                <div className={s.AddContent_sfera}>
                  <p>{t("add-content.4")}</p>
                  <div className={s.AddContent_sfera_routes}>
                    <button>Информационные технологии</button>
                    <button>Экспертиза</button>
                    <button>Проекты</button>
                    <button>Инфраструктура</button>
                  </div>
                  <br />
                  <div className={s.AddContent_sfera_routes}>
                    <button>Axborot texnologiyalari</button>
                    <button>Ekspertiza</button>
                    <button>Loyihalar</button>
                    <button>Infratuzilma</button>
                  </div>
                </div>
                <div className={s.AddContent_left_desc}>
                  <p>{t("add-content.9")}</p>
                  <br />
                  <p>{t("ru")}:</p>
                  <textarea defaultValue={ParamsContent?.description_ru} />
                  <br />
                  <br />
                  <p>{t("uz")}:</p>
                  <textarea defaultValue={ParamsContent?.description_uz} />
                </div>
                <p>{t("add-content.10")}</p>
                <div className={s.AddContent_left_file}>
                  <input type="file" id="file" />
                  <label htmlFor="file">
                    {t("add-content.11")} <span>{t("add-content.12")}</span>{" "}
                    {t("add-content.13")}
                  </label>
                </div>
                <br />
                <p>{t("ru")}:</p>
                <br />
                <JoditEditor className={s.JoditEditor} />
                <br />
                <p>{t("uz")}:</p>
                <br />
                <JoditEditor className={s.JoditEditor} />
              </div>
              <div className={s.AddContent_right}>
                <h4>{t("add-content.14")}</h4>
                <input type="datetime-local" />
                <button className={s.chernovik}>{t("add-content.15")}</button>
                <button className={s.share}>{t("add-content.16")}</button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <Footer />
    </>
  );
};

export default UpdContent;
