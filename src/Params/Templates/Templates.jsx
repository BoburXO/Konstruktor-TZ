import React from "react";
import Footer from "../../components/Footer/Footer";
import s from "../Templates/Templates.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../../templates";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const Templates = () => {
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
    <UserNav/>
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
          <button className={s.Temp_update}><img src={createIcon} alt="Update" /></button>
          <button className={s.Temp_delete}><img src={deleteIcon} alt="Delete" /></button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Templates;
