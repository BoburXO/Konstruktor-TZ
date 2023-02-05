import React from "react";
import s from "./Spravochnik.module.css";
import search from "../../assets/icons/search.svg";
import { spravochnik } from "../../spravochnik";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import Fade from "react-reveal/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import backX from "../../assets/icons/backX.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 664,
  height: "max-content",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  p: 2,
};

const Spravochnik = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <section className={s.Spravochnik}>
        <div className={s.Spravochnik_container}>
          <div className={s.Spravochnik_label}>
            <h1>Справочники</h1>
            <button   onClick={handleOpen} className={s.Spravochnik_label_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>Создать справочник</span>
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ textAlign: "end", cursor: "pointer" }}>
                  <img onClick={handleClose} src={backX} alt="" />
                </div>
                <div className={s.spravochnik_modal_parent}>
                  <h1>Создание справочника</h1>
                  <p>Наименование справочника</p>
                  <input type="text" />
                  <p>Добавьте элементы справочника</p>
                  <input type="text" />
                  <ol>
                    <li>
                      <p>1. Государственный налоговый комитет</p>
                      <img src={backX} alt="" />
                    </li>
                    <li>
                      <p>2. Государственный таможенный комитет</p>
                      <img src={backX} alt="" />
                    </li>
                    <li>
                      <p>3. Министерство финансов</p>
                      <img src={backX} alt="" />
                    </li>
                    <li>
                      <p>4. Министерство юстиций</p>
                      <img src={backX} alt="" />
                    </li>
                    <li>
                      <p>5. Министерство здравоохранения</p>
                      <img src={backX} alt="" />
                    </li>
                    <li>
                      <p>6. Узинфоком</p>
                      <img src={backX} alt="" />
                    </li>
                  </ol>
                  <div className={s.spravochnik_empty}></div>
                  <div className={s.spravochnik_btns}>
                    <button className={s.spravochnik_cancel_btn}>Отмена</button>
                    <button className={s.spravochnik_save_btn}>Сохранить</button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder="Поиск" />
          </div>
          <div className={s.Spravochnik_cards_labels}>
            <p style={{ width: "3%" }}>№</p>
            <p style={{ width: "55%" }}>НАИМЕНОВАНИЕ СПРАВОЧНИКА</p>
            <p style={{ width: "27%" }}>КОЛИЧЕСТВО ЭЛЕМЕНТОВ</p>
            <p style={{ width: "7%" }}>ДЕЙСТВИЯ</p>
          </div>
          <div className={s.Spravochnik_sect_creators_parent}>
            {spravochnik?.map((el) => {
              return (
                <div
                  className={s.Spravochnik_sect_creators_parent_cards}
                  key={el.id}
                >
                  <Fade top cascade>
                    <span className={s.Spravochnik_twink}>
                      <p>{el.id}</p>
                      <p>{el.title}</p>
                    </span>
                    <p style={{ width: "10%" }}>{el.elements}</p>
                    <div className={s.lkmain_sect_crud}>
                      <button className={s.lkmain_sect_crud_create}>
                        <img src={createIcon} alt="Copy" />
                      </button>

                      <button className={s.lkmain_sect_crud_delete}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </Fade>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Spravochnik;
