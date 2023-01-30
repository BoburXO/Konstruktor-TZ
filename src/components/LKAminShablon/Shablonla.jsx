import React from "react";
import s from "../LKAminShablon/Shablonla.module.css";
import search from "../../assets/icons/search.svg";
import { templates } from "../../templates";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const Shablonla = () => {
  return (
    <>
      <section className={s.templates_sect}>
        <div className={s.templates_sect_container}>
          <div className={s.templates_sect_label}>
            <h1>Шаблоны</h1>
            <button className={s.templates_sect_create_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>Создать шаблон</span>
            </button>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder="Поиск" />
          </div>
          <div className={s.templates_sect_parent}>
            {templates?.map((el) => {
              return (
                <Link key={el.id}>
                  <Fade top cascade>
                    <div className={s.templates_sect_parent_card}>
                      <h1>{el.punkt}</h1>
                      <br />
                      <p>
                        {el.desc.slice(0, 250)}
                        {"..."}
                      </p>
                    </div>
                  </Fade>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shablonla;
