import React, { useContext, useEffect, useState } from "react";
import s from "../HomeSection/Section.module.css";
import download from "../../assets/icons/download.svg";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";

const Section = () => {
  const { t } = useTranslation();
  const { getTzHome, tzDB } = useContext(Context);
  const [more, setMore] = useState(6);

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
              {tzDB?.results?.slice(0, more).map((el) => {
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
                      {el.description.length < 70 ? (
                        <h3>{el.description}</h3>
                      ) : (
                        <h3>
                          {el.description.slice(0, 80)}
                          {"..."}
                        </h3>
                      )}
                      {el.text.length < 390 ? (
                        <p>{el.text}</p>
                      ) : (
                        <p>
                          {el.text.slice(0, 400)}
                          {"..."}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={s.moreDiv}>
              <button
                onClick={() => setMore((defaultState) => defaultState + 6)}
                style={{ display: more >= tzDB?.results?.length ? "none" : null }}
              >
                Загрузить ещё
              </button>
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
};

export default Section;
