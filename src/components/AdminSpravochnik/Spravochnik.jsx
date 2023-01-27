import React from "react";
import s from "./Spravochnik.module.css";
import search from "../../assets/icons/search.svg";
import { spravochnik } from "../../spravochnik";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const Spravochnik = () => {
  return (
    <>
      <section className={s.Spravochnik}>
        <div className={s.Spravochnik_container}>
          <div className={s.Spravochnik_label}>
            <h1>Справочники</h1>
            <button className={s.Spravochnik_label_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>Создать шаблон</span>
            </button>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder="Поиск" />
          </div>
          <div className={s.Spravochnik_cards_labels}>
            <p style={{ width: "3%" }}>№</p>
            <p style={{ width: "55%" }}>НАИМЕНОВАНИЕ СПРАВОЧНИКА</p>
            <p style={{ width: "27%" }}>КОЛИЧЕСТВО ЭЛЕМЕНТОВ</p>
            <p style={{ width: "7%" }}>ДЕЙСТВИЯ</p>
          </div>
          <div className={s.Spravochnik_sect_creators_parent}>
            {spravochnik?.map((el) => {
              return (
                <div className={s.Spravochnik_sect_creators_parent_cards} key={el.id}>
                  <span className={s.Spravochnik_twink}>
                    <p>{el.id}</p>
                    <p>{el.title}</p>
                  </span>
                  <p style={{width:"10%"}}>{el.elements}</p>
                  <div className={s.lkmain_sect_crud}>
                    <button className={s.lkmain_sect_crud_create}>
                      <img src={createIcon} alt="Copy" />
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

export default Spravochnik;
