import React, { useState } from "react";
import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { Dropdown } from "rsuite";
import { NavLink, useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import CreateTZ1right from "../Layout/CreateTZ1right";
import toast from "react-hot-toast";
import { templates } from "../../templates";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import { useRef } from "react";

const CreateTZ = () => {
  const ref = useRef([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [arr, setArr] = useState([]);

  const notify = () =>
    toast.success(t("toast"), {
      style: { background: "white", color: "black" },
    });

  const copy = (id, e) => {
    const currentPunkt = templates?.find((punkt) => {
      setArr([...arr, punkt.desc]);
      return punkt?.id === id;
    });
    navigator.clipboard.writeText(currentPunkt.desc);
    notify();
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png";
  };

  console.log(ref);
  console.log(arr);

  return (
    <>
      <section className={s.create1_parent}>
        <Fade bottom cascade>
          <div className={s.create2_left}>
            <h2>{t("createtz")}</h2>
            <br />
            <br />
            <Dropdown className={s.create2_dropdown} title="1- Общие сведения">
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown
              className={s.create2_dropdown}
              title="2- Назначение и цели создания ИС"
            >
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown
              className={s.create2_dropdown}
              title="3- Характеристики объекта информатизации"
            >
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown className={s.create2_dropdown} title="4- Требования к ИС">
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown
              className={s.create2_dropdown}
              title="5- Состав и содержание работ по созданию ИС"
            >
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown
              className={s.create2_dropdown}
              title="6- Порядок контроля и приёмки ИС"
            >
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown
              className={s.create2_dropdown}
              title="7- Требования к составу и содержанию работ по подготовке ИС к вводу в действие"
            >
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
            <Dropdown
              className={s.create2_dropdown}
              title="8- Требования к документированию"
            >
              <NavLink>
                <p>1.1 Полное наименование ИС и её условное обозначение</p>
              </NavLink>
              <NavLink>
                <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
              </NavLink>
              <NavLink>
                <p>
                  1.3 Перечень документов, на основании которых создаётся ИС
                </p>
              </NavLink>
              <NavLink>
                <p>1.4 Плановые сроки начала и окончания работ</p>
              </NavLink>
              <NavLink>
                <p>1.5 Порядок оформления и предъявления результатов работ</p>
              </NavLink>
            </Dropdown>
          </div>
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
                <textarea
                  ref={(el) => ref.current[0] === el}
                  required
                  placeholder={t("createtz3")}
                ></textarea>
              </div>
              {/* 
                <div className={s.create1_form_card_from_templates}>
                  <p>{t("createtz2")}</p>
                  <textarea
                    value={punktId}
                    onChange={(e) => setPunktId(e.target.value)}
                    required
                    placeholder={t("createtz3")}
                  ></textarea>
                </div> */}
              <div className={s.create1_form_card}>
                <p>{t("createtz4")}</p>
                <input
                  ref={(el) => ref.current[1] === el}
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
                    <input
                      required
                      type="number"
                      placeholder={t("createtz10")}
                    />
                  </div>
                  <div>
                    <p>{t("createtz11")}</p>
                    <input
                      required
                      type="email"
                      placeholder={t("createtz11")}
                    />
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
                1.4. Плановые сроки начала и окончания работы по разработке
                Системы
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
                1.6. Порядок оформления и предъявления заказчику результатов
                работ
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
          <CreateTZ1right copy={copy} />
        </Fade>
      </section>
    </>
  );
};

export default CreateTZ;
