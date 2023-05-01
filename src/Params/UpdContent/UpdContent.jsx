import React, { useState, useRef } from "react";
import s from "./UpdContent.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import Footer from "../../components/Footer/Footer";

const UpdContent = () => {
  const {
    contentSite,
    getContentSearch,
    sphere,
    getSphere,
    updateContentTrue,
    updateContentFalse,
    headerUz,
    setHeaderUz,
    headerRu,
    setHeaderRu,
    setSphereContent,
    descriptionUz,
    setDescriptionUz,
    descriptionRu,
    setDescriptionRu,
    setDocFileUz,
    setDocFileRu,
    docFileRu,
    docFileUz,
    textUz,
    setTextUz,
    textRu,
    setTextRu,
  } = useContext(Context);

  const { slug } = useParams();
  const ParamsContent = contentSite?.results?.find((el) => {
    return el?.slug === slug;
  });

  const [sfera, setSfera] = useState(ParamsContent?.sphere?.id);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    getSphere();
    getContentSearch();
    setHeaderRu(ParamsContent?.header_ru);
    setHeaderUz(ParamsContent?.header_uz);
    setDescriptionRu(ParamsContent?.description_ru);
    setDescriptionUz(ParamsContent?.description_uz);
  }, []);
  const { t } = useTranslation();
  //*****
  //*****
  return (
    <>
      <UserNav />
      <div className={s.AddContent}>
      
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
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  {t("add-content.3")}
                </p>
                <br />
                <p>{t("ru")}:</p>
                <input
                  value={headerRu}
                  onChange={(e) => setHeaderRu(e.target.value)}
                  type="text"
                />
                <br />
                <br />
                <p>{t("uz")}:</p>
                <input
                  type="text"
                  value={headerUz}
                  onChange={(e) => setHeaderUz(e.target.value)}
                />
                <div className={s.AddContent_sfera}>
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    {t("add-content.4")}
                  </p>
                  <div className={s.AddContent_sfera_routes}>
                    <p>{t("ru")}:</p>
                    {sphere?.map((el) => {
                      return (
                        <button
                          key={el.id}
                          onClick={() => {
                            setSfera(el.id);
                            setSphereContent(el.id);
                          }}
                          className={sfera === el.id ? s.active : ""}
                        >
                          {el.name_ru}
                        </button>
                      );
                    })}
                  </div>
                  <br />
                  <div className={s.AddContent_sfera_routes}>
                    <p>{t("uz")}:</p>
                    {sphere?.map((el) => {
                      return (
                        <button
                          key={el.id}
                          onClick={() => {
                            setSfera(el.id);
                            setSphereContent(el.id);
                          }}
                          className={sfera === el.id ? s.active : ""}
                        >
                          {el.name_uz}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className={s.AddContent_left_desc}>
                  <p style={{ fontSize: "16px", fontWeight: "600" }}>
                    {t("add-content.9")}
                  </p>
                  <br />
                  <p>{t("ru")}:</p>
                  <textarea
                    value={descriptionRu}
                    onChange={(e) => setDescriptionRu(e.target.value)}
                  />
                  <br />
                  <br />
                  <p>{t("uz")}:</p>
                  <textarea
                    value={descriptionUz}
                    onChange={(e) => setDescriptionUz(e.target.value)}
                  />
                </div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  {t("add-content.10")}
                </p>
                <br />
                <p>{t("ru")}:</p>
                <div className={s.AddContent_left_file}>
                  <input
                    onChange={(e) => {
                      setDocFileRu(e.target.files[0]);
                    }}
                    type="file"
                    id="file"
                  />
                  <label style={{ textAlign: "center" }} htmlFor="file">
                    {t("add-content.11")} <span>{t("add-content.12")}</span>{" "}
                    {t("add-content.13")}
                    <br />
                    <br />
                    {docFileRu !== null || undefined
                      ? docFileRu.name
                      : ParamsContent?.doc_file_ru}
                  </label>
                </div>
                <br />
                <p>{t("uz")}:</p>
                <div
                  style={{ textAlign: "center" }}
                  className={s.AddContent_left_file}
                >
                  <input
                    onChange={(e) => {
                      setDocFileUz(e.target.files[0]);
                    }}
                    type="file"
                    id="file1"
                  />
                  <label htmlFor="file1">
                    {t("add-content.11")} <span>{t("add-content.12")}</span>{" "}
                    {t("add-content.13")}
                    <br />
                    <br />
                    {docFileUz !== null || undefined
                      ? docFileUz.name
                      : ParamsContent?.doc_file_uz}
                  </label>
                </div>
                <br />
                <p>{t("ru")}:</p>
                <br />
                <JoditEditor
                  defaultValue={ParamsContent?.text_ru}
                  className={s.JoditEditor}
                />
                <br />
                <p>{t("uz")}:</p>
                <br />
                <JoditEditor
                  defaultValue={ParamsContent?.text_uz}
                  className={s.JoditEditor}
                />
              </div>
              <div className={s.AddContent_right}>
                <h4>{t("add-content.14")}</h4>
                <input
                  defaultValue={ParamsContent?.created_at}
                  type="datetime-local"
                />
                <button
                  onClick={() => updateContentFalse(ParamsContent?.slug)}
                  className={s.chernovik}
                >
                  {t("add-content.15")}
                </button>
                <button
                  onClick={() => updateContentTrue(ParamsContent?.slug)}
                  className={s.share}
                >
                  {t("add-content.16")}
                </button>
              </div>
            </div>
          </div>
       
      </div>
      <Footer />
    </>
  );
};

export default UpdContent;
