import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import s from "../../components/CreateTZ1-component/CreateTZ1.module.css";
import Fade from "react-reveal/Fade";

const CreateTZ1center = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Fade bottom cascade>
      <div className={s.craete1_center}>
        <span
          onClick={() => navigate(-1)}
          className={s.craete1_center_navigate}
        >
          <img src={arrowleft} alt="←" />
          <p>{t("createtz1")}</p>
        </span>
        <h1>1. Общие сведения</h1>
        <br />
        <h3>1.1 Полное наименование ИС и её условное обозначение</h3>
        <form className={s.craete1_center_form_parent}>
          <div className={s.create1_form_card}>
            <p>{t("createtz2")}</p>
            <textarea required placeholder={t("createtz3")}></textarea>
          </div>
          <div className={s.create1_form_card}>
            <p>{t("createtz4")}</p>
            <input
              required
              type="text"
              maxLength={15}
              placeholder={t("createtz5")}
            />
          </div>
          <br />
          <h3>
            1.2. Наименование организаций разработчика и заказчика Системы
            и их реквизиты
          </h3>
          <div className={s.create1_form_card}>
            <p>{t("createtz6")}</p>
            <input required type="text" placeholder={t("createtz7")} />
            <p>{t("createtz8")}</p>
            <input required type="text" placeholder={t("createtz9")} />
            <div className={s.create1_form_card_twink}>
              <div>
                <p>{t("createtz10")}</p>
                <input required type="number" placeholder={t("createtz10")} />
              </div>
              <div>
                <p>{t("createtz11")}</p>
                <input required type="email" placeholder={t("createtz11")} />
              </div>
            </div>
            <p>{t("createtz12")}</p>
            <input required type="text" placeholder={t("createtz13")} />
          </div>
          <br />
          <h3>1.3. Основание для разработки Системы</h3>
          <div className={s.create1_form_card_from_templates}>
            <p>{t("createtz14")}</p>
            <textarea required placeholder={t("createtz15")}></textarea>
          </div>
          <br />
          <h3>
            1.4. Плановые сроки начала и окончания работы по разработке Системы
          </h3>
          <div className={s.create1_form_card}>
            <div className={s.create1_form_card_twink}>
              <div>
                <p>{t("createtz16")}</p>
                <input type="text" placeholder={t("createtz17")} />
              </div>
              <div>
                <p>{t("createtz18")}</p>
                <input type="text" placeholder={t("createtz19")} />
              </div>
            </div>
          </div>
          <br />
          <h3>1.5. Сведения об источниках финансирования</h3>
          <div className={s.create1_form_card}>
            <p>{t("createtz20")}</p>
            <textarea required placeholder={t("createtz21")}></textarea>
          </div>
          <br />
          <h3>
            1.6. Порядок оформления и предъявления заказчику результатов работ
          </h3>
          <div className={s.create1_form_card_from_templates}>
            <p>{t("createtz22")}</p>
            <textarea required placeholder={t("createtz23")}></textarea>
          </div>
          <br />
          <h3>1.7. Порядок внесения изменений и их характер</h3>
          <div className={s.create1_form_card_from_templates}>
            <p>{t("createtz24")}</p>
            <textarea required placeholder={t("createtz25")}></textarea>
          </div>
          <div className={s.create1_form_route_btn}>
            <button onClick={() => navigate(-1)}>{t("btn.1")}</button>
            <input
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/createtz2")}
              value={t("btn.2")}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default CreateTZ1center;
