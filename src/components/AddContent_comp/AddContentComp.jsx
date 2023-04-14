import React, { useState, useRef, useContext, useEffect } from "react";
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
  const [sfera, setSfera] = useState(0);

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
    createdAt,
    setCreatedAt,
    sphere,
    getSphere,
    createContentOfSiteFalse,
  } = useContext(Context);
  //context

  useEffect(() => {
    getSphere();
  }, []);

  return (
    <>
      <div className={s.AddContent}>
        {/* <Fade bottom cascade> */}
          <div className={s.AddContent_container}>
            <div className={s.AddContent_labels}>
              <span onClick={() => navigate("/contentofsite")}>
                <img src={arrowLeft} alt="←" />
                <p>{t("add-content.1")}</p>
              </span>
              <h1>{t("add-content.2")}</h1>
            </div>
            <form
              onSubmit={createContentOfSite}
              className={s.AddContent_parent}
            >
              <div className={s.AddContent_left}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  {t("add-content.3")}
                </p>
                <br />
                <p>{t("ru")}:</p>
                <input
                  required
                  value={headerRu}
                  onChange={(e) => setHeaderRu(e.target.value)}
                  type="text"
                />
                <br />
                <br />
                <p>{t("uz")}:</p>
                <input
                  required
                  value={headerUz}
                  onChange={(e) => setHeaderUz(e.target.value)}
                  type="text"
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
                        type="button"
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
                        type="button"
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
                    {" "}
                    {t("add-content.9")}
                  </p>
                  <br />
                  <p>{t("ru")}:</p>
                  <input
                    required
                    value={descriptionRu}
                    onChange={(e) => setDescriptionRu(e.target.value)}
                    type="text"
                  />
                  <br />
                  <br />
                  <p>{t("uz")}:</p>
                  <input
                    required
                    value={descriptionUz}
                    onChange={(e) => setDescriptionUz(e.target.value)}
                    type="text"
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
                    {docFileRu?.name}
                  </label>
                </div>
                <br />
                <p>{t("uz")}:</p>
                <div className={s.AddContent_left_file}>
                  <input
                    onChange={(e) => {
                      setDocFileUz(e.target.files[0]);
                    }}
                    type="file"
                    id="file1"
                  />
                  <label style={{ textAlign: "center" }} htmlFor="file1">
                    {t("add-content.11")} <span>{t("add-content.12")}</span>{" "}
                    {t("add-content.13")}
                    <br />
                    {docFileUz?.name}
                  </label>
                </div>
                <br />
                <p>{t("ru")}:</p>
                <br />
                <JoditEditor
                  // value={textRu}
                  // onChange={(e) =>  console.log(e)}
                  className={s.JoditEditor}
                />
                <br />
                <p>{t("uz")}:</p>
                <br />
                <JoditEditor
                  // value={textUz}
                  // onChange={(e) => console.log(e)}
                  className={s.JoditEditor}
                />
              </div>
              <div className={s.AddContent_right}>
                <h4>{t("add-content.14")}</h4>
                <input
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  type="datetime-local"
                />
                <button
                  type="button"
                  onClick={() => createContentOfSiteFalse()}
                  className={s.chernovik}
                >
                  {t("add-content.15")}
                </button>
                <button type="submit" className={s.share}>
                  {t("add-content.16")}
                </button>
              </div>
            </form>

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
        {/* </Fade> */}
      </div>
    </>
  );
};

export default AddContentComp;
