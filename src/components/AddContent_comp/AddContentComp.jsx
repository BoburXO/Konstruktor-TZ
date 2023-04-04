import React, { useState, useRef, useContext } from "react";
import s from "../AddContent_comp/AddContent.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";

const AddContentComp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sfera, setSfera] = useState(1);

  //table start
  
  // const [col, setCol] = useState(0);
  // const [row, setRow] = useState(0);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   setCol(event.target[0].value);
  //   setRow(event.target[1].value);
  // };

  // const colArr = Array.from({ length: col }, () => 0);
  // const rowArr = Array.from({ length: row }, () => 0);

  //table end

  //context
  const {
    createContentOfSite,
    headerUz,
    setHeaderUz,
    headerRu,
    setHeaderRu,
    sphereUz,
    setSphereUz,
    sphereRu,
    setSphereRu,
    descriptionUz,
    setDescriptionUz,
    descriptionRu,
    setDescriptionRu,
    docFileUz,
    setDocFileUz,
    docFileRu,
    setDocFileRu,
    textUz,
    setTextUz,
    textRu,
    setTextRu,
  } = useContext(Context);
  //context
  return (
    <>
      <div className={s.AddContent}>
        <Fade bottom cascade>
          <div className={s.AddContent_container}>
            <div className={s.AddContent_labels}>
              <span onClick={() => navigate("/contentofsite")}>
                <img src={arrowLeft} alt="←" />
                <p>{t("add-content.1")}</p>
              </span>
              <h1>{t("add-content.2")}</h1>
            </div>
            <div className={s.AddContent_parent}>
              <div className={s.AddContent_left}>
                <p>{t("add-content.3")}</p>
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
                  value={headerUz}
                  onChange={(e) => setHeaderUz(e.target.value)}
                  type="text"
                />
                <div className={s.AddContent_sfera}>
                  <p>{t("add-content.4")}</p>
                  <div className={s.AddContent_sfera_routes}>
                    <button
                      className={sfera === 1 ? s.active : ""}
                      onClick={() => {
                        setSfera(1);
                      }}
                    >
                      Информационные технологии
                    </button>
                    <button
                      className={sfera === 2 ? s.active : ""}
                      onClick={() => {
                        setSfera(2);
                      }}
                    >
                      Экспертиза
                    </button>
                    <button
                      className={sfera === 3 ? s.active : ""}
                      onClick={() => {
                        setSfera(3);
                      }}
                    >
                      Проекты
                    </button>
                    <button
                      className={sfera === 4 ? s.active : ""}
                      onClick={() => {
                        setSfera(4);
                      }}
                    >
                      Инфраструктура
                    </button>
                  </div>
                  <br />
                  <div className={s.AddContent_sfera_routes}>
                    <button
                      className={sfera === 1 ? s.active : ""}
                      onClick={() => {
                        setSfera(1);
                      }}
                    >
                      Axborot texnologiyalari
                    </button>
                    <button
                      className={sfera === 2 ? s.active : ""}
                      onClick={() => {
                        setSfera(2);
                      }}
                    >
                      Ekspertiza
                    </button>
                    <button
                      className={sfera === 3 ? s.active : ""}
                      onClick={() => {
                        setSfera(3);
                      }}
                    >
                      Loyihalar
                    </button>
                    <button
                      className={sfera === 4 ? s.active : ""}
                      onClick={() => {
                        setSfera(4);
                      }}
                    >
                      Infratuzilma
                    </button>
                  </div>
                </div>
                <div className={s.AddContent_left_desc}>
                  <p>{t("add-content.9")}</p>
                  <br />
                  <p>{t("ru")}:</p>
                  <input
                    value={descriptionRu}
                    onChange={(e) => setDescriptionRu(e.target.value)}
                    type="text"
                  />
                  <br />
                  <br />
                  <p>{t("uz")}:</p>
                  <input
                    value={descriptionUz}
                    onChange={(e) => setDescriptionUz(e.target.value)}
                    type="text"
                  />
                </div>
                <p>{t("add-content.10")}</p>
                {localStorage.getItem("i18nextLng") === "uz" ? (
                  <div className={s.AddContent_left_file}>
                    <input
                      onChange={(e) => {
                        setDocFileUz(e.target.files[0]);
                      }}
                      type="file"
                      id="file"
                    />
                    <label htmlFor="file">
                      {t("add-content.11")} <span>{t("add-content.12")}</span>{" "}
                      {t("add-content.13")}
                    </label>
                  </div>
                ) : (
                  <div className={s.AddContent_left_file}>
                    <input
                      onChange={(e) => {
                        setDocFileRu(e.target.files[0]);
                      }}
                      type="file"
                      id="file"
                    />
                    <label htmlFor="file">
                      {t("add-content.11")} <span>{t("add-content.12")}</span>{" "}
                      {t("add-content.13")}
                    </label>
                  </div>
                )}

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


            {/* <form className={s.table_head} onSubmit={handleSubmit}>
              <p>{t("add-content.17")}</p>
              <br />
              <input type="number" required placeholder={t("add-content.18")} />
              <input
                className={s.vertical_inp}
                type="number"
                required
                placeholder={t("add-content.19")}
              />
              <button type="submit">{t("btn.4")}</button>
            </form>
            <table>
              {rowArr?.map((index) => (
                <tr key={index}>
                  {colArr?.map((i) => (
                    <td key={i}>
                      <input type="text" placeholder={t("add-content.20")} />
                    </td>
                  ))}
                </tr> 
              ))}
            </table> */}
          </div>
        </Fade>
      </div>
    </>
  );
};

export default AddContentComp;
