import React from "react";
import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { Dropdown } from "rsuite";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { templates } from "../../templates";
import arrowBottom from "../../assets/icons/arrowBottom.svg";
import Fade from "react-reveal/Fade";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import { useTranslation } from "react-i18next";

const CreateTZ = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
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
                  required
                  placeholder={t("createtz3")}
                ></textarea>
              </div>
              <div className={s.create1_form_card}>
                <p>Условное обозначение</p>
                <input
                  required
                  type="text"
                  maxLength={15}
                  placeholder="Введите условное обозначение (максимум 15 символов)"
                />
              </div>
              <br />
              <h3>
                1.2. Наименование организаций разработчика и заказчика Системы
                и их реквизиты
              </h3>
              <div className={s.create1_form_card}>
                <p>Заказчик</p>
                <input
                  required
                  type="text"
                  placeholder="Введите наименование разработчика"
                />
                <p>Адрес</p>
                <input
                  required
                  type="text"
                  placeholder="Введите адрес разработчика"
                />
                <div className={s.create1_form_card_twink}>
                  <div>
                    <p>Номер телефона</p>
                    <input
                      required
                      type="number"
                      placeholder="Номер телефона"
                    />
                  </div>
                  <div>
                    <p>Электронная почта</p>
                    <input
                      required
                      type="email"
                      placeholder="Электронная почта"
                    />
                  </div>
                </div>
                <p>Исполнитель</p>
                <input
                  required
                  type="text"
                  placeholder="Введите адрес разработчика"
                />
              </div>
              <br />
              <h3>1.3. Основание для разработки Системы</h3>
              <div className={s.create1_form_card_from_templates}>
                <p>Основание для разработки системы</p>
                <textarea
                  required
                  placeholder="Введите основание для разработки системы"
                ></textarea>
              </div>
              <br />
              <h3>
                1.4. Плановые сроки начала и окончания работы по разработке
                Системы
              </h3>
              <div className={s.create1_form_card}>
                <div className={s.create1_form_card_twink}>
                  <div>
                    <p>Срок начала</p>
                    <input type="text" placeholder="Введите срок начала" />
                  </div>
                  <div>
                    <p>Срок окончания</p>
                    <input type="text" placeholder="Введите срок окончания" />
                  </div>
                </div>
              </div>
              <br />
              <h3>1.5. Сведения об источниках финансирования</h3>
              <div className={s.create1_form_card}>
                <p>Сведения об источниках финансирования</p>
                <textarea
                  required
                  placeholder="Введите  сведения об источниках финансирования"
                ></textarea>
              </div>
              <br />
              <h3>
                1.6. Порядок оформления и предъявления заказчику результатов
                работ
              </h3>
              <div className={s.create1_form_card_from_templates}>
                <p>
                  Порядок оформления и предъявления заказчику результатов работ
                </p>
                <textarea
                  required
                  placeholder="Введите порядок оформления и предъявления заказчику результатов работ"
                ></textarea>
              </div>
              <br />
              <h3>1.7. Порядок внесения изменений и их характер</h3>
              <div className={s.create1_form_card_from_templates}>
                <p>Порядок внесения изменений и их характер</p>
                <textarea
                  required
                  placeholder="Введите орядок внесения изменений и их характер"
                ></textarea>
              </div>
              <div className={s.create1_form_route_btn}>
                <button onClick={() => navigate(-1)}>Назад</button>
                <input
                  value="Далее"
                  type="submit"
                  onClick={() => navigate("/createtz2")}
                />
              </div>
            </form>
          </div>
          <div className={s.craete1_right}>
            <h2>Компоненты технического задания</h2>
            <p>
              Перетащите компонент на соответствующее ему поле
              для автоматического заполнения
            </p>
            <div className={s.create1_punktlar}>
              {templates?.slice(0, 3).map((el) => {
                return (
                  <div className={s.create1_punktlar_card} key={el.id}>
                    <h3>{el.punkt}</h3>
                    <p>
                      {el.desc.slice(0, 189)}
                      {"..."}
                    </p>
                    <div className={s.center}>
                      <Link to={`/templatePunkt/${el.id}`}>
                        <button className={s.craete1_right_btn}>
                          Показать полностью
                          <img src={arrowBottom} alt="Arrow-Bottom" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Fade>
      </section>
    </>
  );
};

export default CreateTZ;
