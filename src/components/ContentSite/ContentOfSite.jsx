import React from "react";
import s from "../ContentSite/ContentOfSite.module.css";
import search from "../../assets/icons/search.svg";
import { contentDB } from "../../contentDB";
import date from "../../assets/icons/dateIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const ContentOfSite = () => {
  return (
    <>
      <section className={s.content_of_site}>
        <div className={s.content_of_site_container}>
          <div className={s.content_of_site_label}>
            <h1>Контент сайта</h1>
            <button className={s.content_of_site_label_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>Добавить контент </span>
            </button>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder="Поиск" />
          </div>
          <div className={s.content_db_labels}>
            <p>ЗАГОЛОВОК</p>
            <p>СФЕРА</p>
            <p>ОПИСАНИЕ</p>
            <p>ДАТА</p>
            <p>ДЕЙСТВИЯ</p>
          </div>
          <div className={s.content_parent}>
            {contentDB?.map((el) => {
              return (
                <div className={s.content_parent_card} key={el.id}>
                  <b>{el.label}</b>
                  <p>{el.sfera}</p>
                  <p>{el.desc}</p>
                  <span className={s.content_dates}>
                    <img src={date} alt="" />
                    <p>{el.date}</p>
                  </span>
                  <div className={s.content_crud}>
                    <button className={s.content_crud_create}>
                      <img src={createIcon} alt="Copy" />
                    </button>
                    <button className={s.content_crud_delete}>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentOfSite;
