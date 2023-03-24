import React, { useState, useRef } from "react";
import s from "../UpdContent/UpdContent.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";
import UserNav from "../UserNav/UserNav";

const UpdContent = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { t } = useTranslation();

  //table start
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    setCol(event.target[0].value);
    setRow(event.target[1].value);
  };

  const colArr = Array.from({ length: col }, () => 0);
  const rowArr = Array.from({ length: row }, () => 0);

  //table end
  return (
    <>
    <UserNav/>
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
                <input type="text" value="O‘z DSt 1987:2018" />
                <br />
                <br />
                <p>{t("uz")}:</p>
                <input type="text" value="O‘z DSt 1987:2018" />
                <div className={s.AddContent_sfera}>
                  <p>{t("add-content.4")}</p>
                  <div className={s.AddContent_sfera_routes}>
                    <button>{t("add-content.5")}</button>
                    <button>{t("add-content.6")}</button>
                    <button>{t("add-content.7")}</button>
                    <button>{t("add-content.8")}</button>
                  </div>
                </div>
                <div className={s.AddContent_left_desc}>
                  <p>{t("add-content.9")}</p>
                  <br />
                  <p>{t("ru")}:</p>
                  <input
                    type="text"
                    value="Техническое задание на создание информационной системы"
                  />
                  <br />
                  <br />
                  <p>{t("uz")}:</p>
                  <input
                    type="text"
                    value="Axborot tizimini yaratish bo'yicha texnik topshiriq"
                  />
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
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                  className={s.JoditEditor}
                />
                <br />
                <p>{t("uz")}:</p>
                <br />
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
                  className={s.JoditEditor}
                />
              </div>
              <div className={s.AddContent_right}>
                <h4>{t("add-content.14")}</h4>
                <input type="datetime-local" />
                <button className={s.chernovik}>{t("add-content.15")}</button>
                <button className={s.share}>{t("add-content.16")}</button>
              </div>
            </div>
            <form className={s.table_head} onSubmit={handleSubmit}>
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
            </table>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default UpdContent;
