import React from "react";
import s from "../Structure/Structure.module.css";
import { Dropdown } from "rsuite";
import { Link, NavLink } from "react-router-dom";
import pen from "../../assets/icons/pen.svg";
import add from "../../assets/icons/plus-add.svg";

const StructureComponent = () => {
  return (
    <>
      <div className={s.structure_parent}>
        <div className={s.structure_left_siderbar}>
          <h2>Структура</h2>
          <br />
          <br />
          <Dropdown className={s.structure_dropdown} title="1- Общие сведения">
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown
            className={s.structure_dropdown}
            title="2- Назначение и цели создания ИС"
          >
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown
            className={s.structure_dropdown}
            title="3- Характеристики объекта информатизации"
          >
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown className={s.structure_dropdown} title="4- Требования к ИС">
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown
            className={s.structure_dropdown}
            title="5- Состав и содержание работ по созданию ИС"
          >
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown
            className={s.structure_dropdown}
            title="6- Порядок контроля и приёмки ИС"
          >
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown
            className={s.structure_dropdown}
            title="7- Требования к составу и содержанию работ по подготовке ИС к вводу в действие"
          >
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
          <Dropdown
            className={s.structure_dropdown}
            title="8- Требования к документированию"
          >
            <NavLink>
              <p>1.1 Полное наименование ИС и её условное обозначение</p>
            </NavLink>
            <NavLink>
              <p>1.2 Наименование организаций заказчика и разработчика ИС</p>
            </NavLink>
            <NavLink>
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
            </NavLink>
            <NavLink>
              <p>1.4 Плановые сроки начала и окончания работ</p>
            </NavLink>
            <NavLink>
              <p>1.5 Порядок оформления и предъявления результатов работ</p>
            </NavLink>
          </Dropdown>
        </div>
        <div className={s.structure_right_contents}>
          <h1 className={s.structure_right_contents_label}>
            Структура технического задания
          </h1>
          <span className={s.structure_right_contents_update}>
            <h2>Наименование технического задания</h2>
            <img src={pen} alt="Update" />
          </span>
          <div className={s.structure_right_contents_form_parent}>
            <div className={s.structure_right_contents_card_punkt}>
              <span>
                <p>Пункт 1</p>
                <Link>
                  <img src={pen} alt="Изменить" />
                </Link>
              </span>
              <p className={s.structure_right_contents_input_label}>
                Заголовок пункта
              </p>
              <input
                type="text"
                value="Общие сведения"
                className={s.structure_right_contents_input_punkt}
              />
            </div>
            <div className={s.structure_right_contents_card_insidePunkt}>
              <span>
                <p>Пункт 1.1</p>
                <div>
                  <Link>
                    <img src={pen} alt="Изменить" />
                  </Link>
                  <Link>
                    <img src={add} alt="Add" />
                  </Link>
                </div>
              </span>
              <p className={s.structure_right_contents_input_label}>
                Заголовок пункта
              </p>
              <input
                type="text"
                value="Полное наименование ИС и её условное обозначение"
                className={s.structure_right_contents_input_punkt}
              />
              <div className={s.structure_right_contents_input_polya_vvoda}>
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Полное наименование ИС"
                  className={s.structure_right_contents_input_punkt}
                />
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Условное обозначение"
                  className={s.structure_right_contents_input_punkt}
                />
              </div>
            </div>
            <div className={s.structure_right_contents_card_insidePunkt}>
              <span>
                <p>Пункт 1.2</p>
                <div>
                  <Link>
                    <img src={pen} alt="Изменить" />
                  </Link>
                  <Link>
                    <img src={add} alt="Add" />
                  </Link>
                </div>
              </span>
              <input
                type="text"
                value="Наименование организаций заказчика и разработчика ИС"
                className={s.structure_right_contents_input_punkt}
              />
              <div className={s.structure_right_contents_input_polya_vvoda}>
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Заказчик"
                  className={s.structure_right_contents_input_punkt}
                />
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Адрес"
                  className={s.structure_right_contents_input_punkt}
                />
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Телефон"
                  className={s.structure_right_contents_input_punkt}
                />
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Исполнитель"
                  className={s.structure_right_contents_input_punkt}
                />
              </div>
            </div>
            <div className={s.structure_right_contents_card_insidePunkt}>
              <span>
                <p>Пункт 1.3</p>
                <div>
                  <Link>
                    <img src={pen} alt="Изменить" />
                  </Link>
                  <Link>
                    <img src={add} alt="Add" />
                  </Link>
                </div>
              </span>
              <input
                type="text"
                value="Основание для разработки Системы"
                className={s.structure_right_contents_input_punkt}
              />
              <div className={s.structure_right_contents_input_polya_vvoda}>
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Основание для разработки Системы"
                  className={s.structure_right_contents_input_punkt}
                />
              </div>
            </div>
            <div className={s.structure_right_contents_card_insidePunkt}>
              <span>
                <p>Пункт 1.4</p>
                <div>
                  <Link>
                    <img src={pen} alt="Изменить" />
                  </Link>
                  <Link>
                    <img src={add} alt="Add" />
                  </Link>
                </div>
              </span>
              <input
                type="text"
                value="Плановые сроки начала и окончания работы по разработке Системы"
                className={s.structure_right_contents_input_punkt}
              />
              <div className={s.structure_right_contents_input_polya_vvoda}>
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Плановые сроки начала и окончания работы по разработке Системы"
                  className={s.structure_right_contents_input_punkt}
                />
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Срок начала"
                  className={s.structure_right_contents_input_punkt}
                />
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Срок окончания"
                  className={s.structure_right_contents_input_punkt}
                />
              </div>
            </div>
            <div className={s.structure_right_contents_card_insidePunkt}>
              <span>
                <p>Пункт 1.5</p>
                <div>
                  <Link>
                    <img src={pen} alt="Изменить" />
                  </Link>
                  <Link>
                    <img src={add} alt="Add" />
                  </Link>
                </div>
              </span>
              <input
                type="text"
                value="Сведения об источниках финансирования"
                className={s.structure_right_contents_input_punkt}
              />
              <div className={s.structure_right_contents_input_polya_vvoda}>
                <p className={s.structure_right_contents_input_label}>
                  Поле ввода
                </p>
                <input
                  type="text"
                  value="Сведения об источниках финансирования"
                  className={s.structure_right_contents_input_punkt}
                />
              </div>
            </div>
          </div>
          <div className={s.structure_add_plus}>
            <button>+</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StructureComponent;
