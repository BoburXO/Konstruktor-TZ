import React from "react";
import s from "../HomeSection/Section.module.css";
import download from "../../assets/icons/download.svg";
import { tzDB } from "../../tzDB";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const Section = () => {
  return (
    <>
      <section className={s.home_section}>
        <div className={s.container}>
          <Fade bottom cascade>
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
          </Fade>
        </div>
      </section>
    </>
  );
};

export default Section;
