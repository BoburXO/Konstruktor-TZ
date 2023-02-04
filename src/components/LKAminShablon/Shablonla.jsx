import React from "react";
import s from "../LKAminShablon/Shablonla.module.css";
import search from "../../assets/icons/search.svg";
import { templates } from "../../templates";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import backX from "../../assets/icons/backX.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 664,
  height: 625,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  p: 2,
};

const Shablonla = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <section className={s.templates_sect}>
        <div className={s.templates_sect_container}>
          <div className={s.templates_sect_label}>
            <h1>Шаблоны</h1>
            <button
              onClick={handleOpen}
              className={s.templates_sect_create_btn}
            >
              <span style={{ fontSize: "25px" }}>+</span>
              <span>Создать шаблон</span>
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
                <div className={s.modal_parent}>
                  <h1>Создание шаблона</h1>
                  <p>Пункт технического задания</p>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Выберите пункт
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Выберите пункт"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <p>Текст шаблона</p>
                  <textarea placeholder="Введите текст шаблона"></textarea>
                  <div className={s.shablon_empty}></div>
                  <div className={s.shablon_btns}>
                    <button className={s.shablon_cancel_btn}>Отмена</button>
                    <button className={s.shablon_save_btn}>Сохранить</button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder="Поиск" />
          </div>
          <div className={s.templates_sect_parent}>
            {templates?.map((el) => {
              return (
                <Link to={`/templatePunkt/${el.id}`} key={el.id}>
                  <Fade top cascade>
                    <div className={s.templates_sect_parent_card}>
                      <span
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#222",
                        }}
                      >
                        <h1>{el.punkt}</h1>
                        <b>...</b>
                      </span>
                      <br />
                      <p>
                        {el.desc.slice(0, 250)}
                        {"..."}
                      </p>
                    </div>
                  </Fade>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shablonla;
