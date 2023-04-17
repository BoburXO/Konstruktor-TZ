import React from "react";
import s from "../Structure/Structure.module.css";
import { Dropdown } from "rsuite";
import { Link, NavLink } from "react-router-dom";
import pen from "../../assets/icons/pen.svg";
import add from "../../assets/icons/plus-add.svg";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 0,
  width: 360,
};

const StructureComponent = () => {
  //default modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Type modal
  const [openType, setOpenType] = React.useState(false);
  const handleOpenType = () => setOpenType(true);
  const handleCloseType = () => setOpenType(false);
  const { t } = useTranslation();
  return (
    <>
      <div className={s.structure_parent}>
        <Fade bottom cascade>
          <div className={s.structure_left_siderbar}>
            <h2>{t("struc")}</h2>
            <br />
            <br />
            <Dropdown
              className={s.structure_dropdown}
              title="1- Общие сведения"
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
              className={s.structure_dropdown}
              title="4- Требования к ИС"
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
          <div className={s.structure_right_contents}>
            <h1 className={s.structure_right_contents_label}>{t("struc1")}</h1>
            <span className={s.structure_right_contents_update}>
              <h2>{t("struc2")}</h2>
              <img src={pen} alt="Update" />
            </span>
            <div className={s.structure_right_contents_form_parent}>
              <div className={s.structure_right_contents_card_punkt}>
                <span>
                  <p>{t("struc5")} 1</p>
                  <Link>
                    <img src={pen} alt="Изменить" />
                  </Link>
                </span>
                <p className={s.structure_right_contents_input_label}>
                  {t("struc3")}
                </p>
                <br />
                {t("ru")}:
                <input
                  type="text"
                  value="Общие сведения"
                  className={s.structure_right_contents_input_punkt}
                />
                <br />
                <br />
                {t("uz")}:
                <input
                  type="text"
                  value="Umumiy nomlar"
                  className={s.structure_right_contents_input_punkt}
                />
              </div>
              <div className={s.structure_right_contents_card_insidePunkt}>
                <span>
                  <p>{t("struc5")} 1.1</p>
                  <div>
                    <Link>
                      <img src={pen} alt="Изменить" />
                    </Link>
                    <Link>
                      <img onClick={handleOpenType} src={add} alt="Add" />
                    </Link>
                    <Modal
                      slotProps={{
                        backdrop: {
                          style: { opacity: "0.3", boxShadow: 24 },
                        },
                      }}
                      open={openType}
                      onClose={handleCloseType}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div className={s.structure_modalType}>
                          <button>Заголовок пункта</button>
                          <br />
                          <button>Поле ввода</button>
                          <br />
                          <button>Радиокнопка</button>
                          <br />
                          <button>Чекбокс</button>
                          <br />
                          <button>Селект</button>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </span>
                <p className={s.structure_right_contents_input_label}>
                  {t("struc3")}
                </p>
                <br />
                {t("ru")}:
                <input
                  type="text"
                  value="Полное наименование ИС и её условное обозначение"
                  className={s.structure_right_contents_input_punkt}
                />
                <br />
                <br />
                {t("uz")}:
                <input
                  type="text"
                  value="IP-ning to'liq nomi va uning belgisi"
                  className={s.structure_right_contents_input_punkt}
                />
                <div className={s.structure_right_contents_input_polya_vvoda}>
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
                  </p>
                  <br />
                  {t("ru")}:
                  <input
                    type="text"
                    value="Полное наименование ИС"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <br />
                  <br />
                  {t("uz")}:
                  <input
                    type="text"
                    value="IP-ning to'liq nomi"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
                  </p>
                  <br />
                  {t("ru")}:
                  <input
                    type="text"
                    value="Условное обозначение"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <br />
                  <br />
                  {t("uz")}:
                  <input
                    type="text"
                    value="Belgi"
                    className={s.structure_right_contents_input_punkt}
                  />
                </div>
              </div>
              <div className={s.structure_right_contents_card_insidePunkt}>
                <span>
                  <p>{t("struc5")} 1.2</p>
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
                    {t("struc4")}
                  </p>
                  <input
                    type="text"
                    value="Заказчик"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
                  </p>
                  <input
                    type="text"
                    value="Адрес"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
                  </p>
                  <input
                    type="text"
                    value="Телефон"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
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
                  <p>{t("struc5")} 1.3</p>
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
                    {t("struc4")}
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
                  <p>{t("struc5")} 1.4</p>
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
                    {t("struc4")}
                  </p>
                  <input
                    type="text"
                    value="Плановые сроки начала и окончания работы по разработке Системы"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
                  </p>
                  <input
                    type="text"
                    value="Срок начала"
                    className={s.structure_right_contents_input_punkt}
                  />
                  <p className={s.structure_right_contents_input_label}>
                    {t("struc4")}
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
                  <p>{t("struc5")} 1.5</p>
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
                    {t("struc4")}
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
              <button onClick={handleOpen}>+</button>
              <Modal
                slotProps={{
                  backdrop: {
                    style: { opacity: "0.3", boxShadow: 24 },
                  },
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className={s.structure_modal}>
                    <button>Добавить новый пункт</button>
                    <br />
                    <button>Добавить подпункт</button>
                    <br />
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default StructureComponent;
