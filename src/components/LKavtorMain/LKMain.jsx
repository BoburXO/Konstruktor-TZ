import React from "react";
import { tzCreateDB } from "../../tzCreator";
import s from "../LKavtorMain/LKMain.module.css";
import date from "../../assets/icons/dateIcon.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const LKMain = () => {
  return (
    <>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <div className={s.lkmain_sect_labels}>
            <h1>Технические задания</h1>
            <button className={s.lkmain_sect_create_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>Создать техническое задание</span>
            </button>
          </div>
          <div className={s.lkmain_sect_creators_labels}>
            <p style={{width:"3%"}}>ID</p>
            <p style={{width:"55%"}}>НАИМЕНОВАНИЕ ТЕХНИЧЕСКОГО ЗАДАНИЯ</p>
            <p style={{width:"27%"}}>ДАТА СОЗДАНИЯ</p>
            <p style={{width:"7%"}}>ДЕЙСТВИЯ</p>
          </div>
          <div className={s.lkmain_sect_creators_parent}>
            {tzCreateDB?.map((el) => {
              return (
                <div className={s.lkmain_sect_creators_parent_card}>
                  <p style={{width:"3%"}}>#{el.id}</p>
                  <p style={{width:"55%"}}>{el.name}</p>
                  <span style={{width:"20%"}} className={s.lkmain_sect_dates}>
                    <img src={date} alt="" />
                    <p>{el.date}</p>
                  </span>
                  <div className={s.lkmain_sect_crud}>
                    <button className={s.lkmain_sect_crud_copy}>
                      <img src={copyIcon} alt="Copy" />
                    </button>
                    <button className={s.lkmain_sect_crud_create}>
                      <img src={createIcon} alt="Copy" />
                    </button>
                    <button className={s.lkmain_sect_crud_skacat}>
                      <img src={skacatIcon} alt="Download" />
                    </button>
                    <button className={s.lkmain_sect_crud_delete}>
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

export default LKMain;
