import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import s from "../Templates/Templates.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../../templates";
import { useTranslation } from "react-i18next";

const UserTemplate = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  const { id } = useParams();
  const paramsFind = templates?.find((el) => {
    return el.id === +id;
  });
  const { t } = useTranslation();
  return (
    <>
      <UserNav />
      <section className={s.templates_parent}>
        <div className={s.templates_container}>
          <div className={s.templates_card}>
            <h1>
              {t("struc5")} {paramsFind?.punkt}
            </h1>
            <br />
            <br />
            <p>{paramsFind?.desc}</p>
          </div>
          <button onClick={() => navigate(-1)}>{t("btn.1")}</button>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default UserTemplate;
