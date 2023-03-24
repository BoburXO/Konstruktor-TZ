import React, { useContext } from "react";
import s from "../Spravochnik/spravochnik.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";

const SpravochnikId = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, []);
  const { spravochnik } = useContext(Context);
  const { t } = useTranslation();
  const { slug } = useParams();
  const ParamsSlug = spravochnik?.find((el) => {
    return el?.slug === slug;
  });
  console.log(ParamsSlug);
  return (
    <>
      <UserNav />
      <div className={s.spravochnikId_head}>
        <div className={s.container}>
          <h2>{t("spra_id")}</h2>
          <br />
          <br />
          <h3>{ParamsSlug?.title}</h3>
          <div className={s.spravochnik_params}>
            <input type="text" placeholder={t("spra_id1")} />
            <button className={s.createParams}>
              <img src={createIcon} alt="" />
            </button>
            <button className={s.deleteParams}>
              <img src={deleteIcon} alt="" />
            </button>
          </div>
          <br />
          <div>
            {ParamsSlug?.elements?.map((el) => {
              return (
                <div key={el.id}>
                  <h3>{el.element}</h3>
                  <div className={s.spravochnik_params}>
                    <input type="text" placeholder={t("spra_id2")} />
                    <button className={s.createParams}>
                      <img src={createIcon} alt="" />
                    </button>
                    <button className={s.deleteParams}>
                      <img src={deleteIcon} alt="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpravochnikId;
