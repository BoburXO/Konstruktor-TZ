import React from "react";
import Footer from "../../components/Footer/Footer";
import s from "../Templates/Templates.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../../templates";
import { useTranslation } from "react-i18next";

const Templates = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const paramsFind = templates?.find((el) => {
    return el.id === +id;
  });
  const { t } = useTranslation();
  return (
    <>
      <section className={s.templates_parent}>
        <div className={s.templates_container}>
          <div className={s.templates_card}>
            <h1>
              {t("struc5")} {paramsFind?.punkt}
            </h1>
            <br />
            <textarea value={paramsFind?.desc}></textarea>
          </div>
          <button className={s.Temp_back} onClick={() => navigate(-1)}>
            {t("btn.1")}
          </button>
          <button className={s.Temp_update}>{t("btn.7")}</button>
          <button className={s.Temp_delete}>{t("btn.6")}</button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Templates;
