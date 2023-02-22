import React, { useState, useRef } from "react";
import s from "../AddContent_comp/AddContent.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";

const AddContentComp = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {t} = useTranslation();
  const navigate = useNavigate();
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
                <input type="text" defaultValue="O‘z DSt 1987:2018" />
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
                  <input
                    type="text"
                    defaultValue="Техническое задание на создание информационной системы"
                  />
                </div>
                <p>{t("add-content.10")}</p>
                <div className={s.AddContent_left_file}>
                  <input type="file" id="file" />
                  <label htmlFor="file">
                    {t("add-content.11")} <span>{t("add-content.12")}</span> {t("add-content.13")}
                  </label>
                </div>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={newContent => setContent(newContent)}
                  className={s.JoditEditor}
                />
              </div>
              <div className={s.AddContent_right}>
                <h4>{t("add-content.14")}</h4>
                <input type="datetime-local" />
                <button className={s.chernovik}>{t("add-content.15")}</button>
                <button className={s.share}>{t("add-content.15")}</button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default AddContentComp;
