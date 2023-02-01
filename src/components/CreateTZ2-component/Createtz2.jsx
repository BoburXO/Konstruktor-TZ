import React from "react";
import s from "../CreateTZ2-component/CreateTZ2.module.css";
import create2 from "../../assets/imgs/create2.png";
import { Dropdown } from "rsuite";
import { NavLink, useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/icons/arrowLeft.svg";

const Createtz2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={s.create2_parent}>
        <div className={s.create2_left}>
          <h2>Структура справочника</h2>
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
              <p>1.3 Перечень документов, на основании которых создаётся ИС</p>
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
        <div className={s.create2_center}>
          <button
            onClick={() => navigate("/createtz")}
            className={s.create2_center_back_btn}
          >
            <img src={arrowLeft} alt="" />
            Назад к списку справочников
          </button>
          <h1 className={s.create2_center_title}>9. Источники разработки</h1>
          <div className={s.create2_source}>
            <p>Источники разработки</p>
            <textarea rows="15">
              — O’z DSt 1985:2018 «Информационная технология. Виды,
              комплектность и обозначение документов при создании информационных
              систем»; — O’z DSt 1986:2018 «Информационная технология.
              Информационные системы. Стадии создания»; — O’z DSt 1987:2018
              «Информационная технология. Техническое задание на создание
              информационной системы»; — O'z DSt 1270:2009 «Электронный
              документооборот. Взаимодействие систем электронного
              документооборота»; — O'z DSt 2298:2009 «Электронный
              документооборот. Типовые требования»; — O’z DSt 2590:2012
              «Требования к интеграции и взаимодействию информационных систем
              государственных органов, используемых в рамках формирования
              Национальной информационной системы».
            </textarea>
          </div>
          <div className={s.prev_save_btns}>
            <button onClick={() => navigate(-1)} className={s.create2_prev}>
              Назад
            </button>
            <button className={s.create2_save}>Сохранить</button>
          </div>
        </div>
        <div className={s.create2_right}>
          <h2>Компоненты технического задания</h2>
          <h4>В данном блоке нет доступных компонентов</h4>
          <img src={create2} alt="Create-Templates" />
        </div>
      </section>
    </>
  );
};

export default Createtz2;
