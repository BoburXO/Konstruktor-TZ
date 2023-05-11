import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import s from "../LKMainUpdate/LKMainUpdate.module.css";
import createIcon from "../../assets/icons/createIcon.svg";

const LKMainUpdate = () => {
  const navigate = useNavigate();
  const {
    getCreateTz,
    createTz,
    updateCreateTz,
    tzCommentRu,
    setTzCommentRu,
    tzCommentUz,
    setTzCommentUz,
    tzNameRu,
    setTzNameRu,
    tzNameUz,
    setTzNameUz,
  } = useContext(Context);

  const { t } = useTranslation();
  const { id } = useParams();
  const lkavtorParams = createTz?.results?.find((el) => {
    return el?.id === id;
  });

  useEffect(() => {
    getCreateTz();
    setTzNameRu(lkavtorParams?.tz_name_ru);
    setTzNameUz(lkavtorParams?.tz_name_uz);
    setTzCommentRu(lkavtorParams?.comment_ru);
    setTzCommentUz(lkavtorParams?.comment_uz);
  }, []);

  return (
    <>
      <UserNav />
      <div className={s.lk_main_update}>
        <div className={s.lk_main_container}>
          <h1>{t("lkavtor8")}:</h1>
          <br />
          <br />
          <div className={s.lk_main_card_parent}>
            <div className={s.tz_name_left}>
              <p> {t("ru")}:</p>
              <br />
              <textarea
                value={tzNameRu}
                onChange={(e) => setTzNameRu(e.target.value)}
              ></textarea>
            </div>
            <div className={s.tz_name_right}>
              <p> {t("uz")}:</p>
              <br />
              <textarea
                value={tzNameUz}
                onChange={(e) => setTzNameUz(e.target.value)}
              ></textarea>
            </div>
          </div>
          <br />
          <br />
          <h4>{t("lkavtor7")}:</h4>
          <br />
          <div className={s.lk_main_sub_card_parent}>
            <div className={s.tz_name_left}>
              <p> {t("ru")}:</p>
              <br />
              <textarea
                value={tzCommentRu}
                onChange={(e) => setTzCommentRu(e.target.value)}
              ></textarea>
            </div>
            <div className={s.tz_name_right}>
              <p> {t("uz")}:</p>
              <br />
              <textarea
                value={tzCommentUz}
                onChange={(e) => setTzCommentUz(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={s.lk_main_card_btns}>
            <button
              onClick={() => updateCreateTz(lkavtorParams?.id)}
              className={s.Temp_update}
            >
              <img src={createIcon} alt="Update" />
            </button>
            <button className={s.Temp_back} onClick={() => navigate(-1)}>
              {t("btn.1")}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LKMainUpdate;
