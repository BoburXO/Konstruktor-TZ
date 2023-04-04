import React, { useEffect } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import Fade from "react-reveal/Fade";
import s from "../ContentOfSiteUser/ContentOfSiteUser.module.css";
import download from "../../assets/icons/skacatIcon.svg";
import JoditEditor from "jodit-react";

const ContentOfSiteUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getContentSearchFilter, contentSearch, contentSite } =
    useContext(Context);
  const { slug } = useParams();
  const contentParams = contentSite?.results?.find((el) => {
    return el?.slug === slug;
  });

  useEffect(() => {
    getContentSearchFilter();
  }, [contentSearch]);
  return (
    <>
      <UserNav />
      <div className={s.AddContent}>
        <Fade bottom cascade>
          <div className={s.AddContent_container}>
            <div className={s.AddContent_labels}>
              <h1>{t("add-content.2")}</h1>
            </div>
            <div className={s.AddContent_parent}>
              <div className={s.AddContent_left}>
                <p>{t("add-content.3")}</p>
                <input defaultValue={contentParams?.header} type="text" />
                <div className={s.AddContent_sfera}>
                  <p>{t("add-content.4")}</p>
                  <br />
                  <button className={s.active}>
                    {contentParams?.sphere?.name}
                  </button>
                </div>
                <div className={s.AddContent_left_desc}>
                  <p>{t("add-content.9")}</p>
                  <input
                    defaultValue={contentParams?.description}
                    type="text"
                  />
                </div>
                <p>{t("add-content.10")}</p>
                <br />
                <a
                  rel="noopener"
                  href={contentParams?.doc_file}
                  download
                  target="_blank"
                >
                  <button className={s.content_crud_download}>
                    <img src={download} alt="Download" />
                  </button>
                </a>
                <br />
                <br />
                <br />
                <JoditEditor
                  defaultValue={contentParams?.text}
                  className={s.JoditEditor}
                />
                <br />
              </div>
              <div className={s.AddContent_right}>
                <h4>
                  {t("add-content.14")}:{" "}
                  {contentParams?.created_at.slice(0, 10)}
                </h4>
              </div>
            </div>
          </div>
        </Fade>
        <br />
        <br />
        <div className={s.back}>
          <button
            onClick={() => navigate(-1)}
            className={s.shablon_cancel_btn}
          >
            {t("btn.1")}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContentOfSiteUser;
