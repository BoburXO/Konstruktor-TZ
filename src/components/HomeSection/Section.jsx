import React from "react";
import s from "../HomeSection/Section.module.css";
import download from "../../assets/icons/download.svg";
import { tzDB } from "../../tzDB";
import { Link } from "react-router-dom";

const Section = () => {
  return (
    <>
      <section className={s.home_section}>
        <div className={s.container}>
          <h1 className={s.home_section_label}>Национальные стандарты</h1>
          <div className={s.home_section_parent}>
            {tzDB?.map((el) => {
              return (
                <div className={s.home_section_card} key={el.id}>
                  <div className={s.card_head}>
                    <div className={s.card_head_left_side}>
                      <h2>{el.date}</h2>
                      <p>Информационная технология</p>
                    </div>
                    <Link>
                      {" "}
                      <img src={download} alt="" />
                    </Link>
                  </div>
                  <div className={s.home_section_card_body}>
                    <h3>{el.title}</h3>
                    <p>{el.desc}</p>
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

export default Section;
