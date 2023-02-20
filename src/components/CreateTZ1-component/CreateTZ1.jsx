import React from "react";
import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { Dropdown } from "rsuite";
import { NavLink } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import CreateTZ1center from "../Layout/CreateTZ1center";
import CreateTZ1right from "../Layout/CreateTZ1right";

const CreateTZ = () => {
  const { t } = useTranslation();
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
          <CreateTZ1center/>
          <CreateTZ1right/>
        </Fade>
      </section>
    </>
  );
};

export default CreateTZ;
