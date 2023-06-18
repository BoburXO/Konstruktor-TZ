import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import s from "../LKMainUpdate/LKMainUpdate.module.css";
import createIcon from "../../assets/icons/createIcon.svg";
import Loader from "../../components/Loader/Loader";

const LKMainUpdate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getDetailTzId, detailIdTz, updateCreateTz } = useContext(Context);

  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    getDetailTzId(id).then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <UserNav />
      <div className={s.lk_main_update}>
        <form
          onSubmit={(e) => updateCreateTz(e, detailIdTz?.id)}
          className={s.lk_main_container}
        >
          <h1>{t("lkavtor8")}:</h1>
          <br />
          <br />
          <div className={s.lk_main_card_parent}>
            <div className={s.tz_name_left}>
              <p> {t("ru")}:</p>
              <br />
              <textarea defaultValue={detailIdTz?.tz_name_uz}></textarea>
            </div>
            <div className={s.tz_name_right}>
              <p> {t("uz")}:</p>
              <br />
              <textarea defaultValue={detailIdTz?.tz_name_uz}></textarea>
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
              <textarea defaultValue={detailIdTz?.comment_ru}></textarea>
            </div>
            <div className={s.tz_name_right}>
              <p> {t("uz")}:</p>
              <br />
              <textarea defaultValue={detailIdTz?.comment_uz}></textarea>
            </div>
          </div>
          <div className={s.lk_main_card_btns}>
            <button type="submit" className={s.Temp_update}>
              <img src={createIcon} alt="Update" />
            </button>
            <button
              type="button"
              className={s.Temp_back}
              onClick={() => navigate(-1)}
            >
              {t("btn.1")}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LKMainUpdate;
