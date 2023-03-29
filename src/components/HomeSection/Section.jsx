import React, { useContext, useEffect } from "react";
import s from "../HomeSection/Section.module.css";
import download from "../../assets/icons/download.svg";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";

const Section = () => {
  const { t } = useTranslation();
  const { getTzHome, tzDB } = useContext(Context);

  useEffect(() => {
    getTzHome();
  }, []);

  return (
    <>
      <section className={s.home_section}>
        <div className={s.container}>
          <Fade bottom cascade>
            <h1 className={s.home_section_label}>{t("hsection")}</h1>
            <div className={s.home_section_parent}>
              {tzDB?.results?.map((el) => {
                return (
                  <div className={s.home_section_card} key={el.id}>
                    <div className={s.card_head}>
                      <div className={s.card_head_left_side}>
                        <h2>{el.header}</h2>
                        <p>{el.sphere}</p>
                      </div>
                      <a href={el.doc_file} target="_blank" download>
                        {" "}
                        <img src={download} alt="" />
                      </a>
                    </div>
                    <div className={s.home_section_card_body}>
                      <p>{el.description}</p>
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
