import React, { useState, useRef } from "react";
import s from "../AddContent_comp/AddContent.module.css";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import JoditEditor from "jodit-react";

const AddContentComp = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");


  const navigate = useNavigate();
  return (
    <>
      <div className={s.AddContent}>
        <Fade bottom cascade>
          <div className={s.AddContent_container}>
            <div className={s.AddContent_labels}>
              <span onClick={() => navigate("/contentofsite")}>
                <img src={arrowLeft} alt="←" />
                <p>Назад к списку контента</p>
              </span>
              <h1>Добавить контент</h1>
            </div>
            <div className={s.AddContent_parent}>
              <div className={s.AddContent_left}>
                <p>Заголовок</p>
                <input type="text" defaultValue="O‘z DSt 1987:2018" />
                <div className={s.AddContent_sfera}>
                  <p>Сфера</p>
                  <div className={s.AddContent_sfera_routes}>
                    <button>Информационные технологии</button>
                    <button>Экспертиза</button>
                    <button>Проекты</button>
                    <button>Инфраструктура</button>
                  </div>
                </div>
                <div className={s.AddContent_left_desc}>
                  <p>Описание</p>
                  <input
                    type="text"
                    defaultValue="Техническое задание на создание информационной системы"
                  />
                </div>
                <p>Файл документа</p>
                <div className={s.AddContent_left_file}>
                  <input type="file" id="file" />
                  <label htmlFor="file">
                    Перетащите файл, или <span>выберите с</span> компьютера
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
                <h4>Дата</h4>
                <input type="datetime-local" />
                <button className={s.chernovik}>Сохранить черновик</button>
                <button className={s.share}>Опубликовать</button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default AddContentComp;
