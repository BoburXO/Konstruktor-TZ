import React, { useContext } from "react";
import s from "./Spravochnik.module.css";
import search from "../../assets/icons/search.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import Fade from "react-reveal/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import backX from "../../assets/icons/backX.svg";
import { addTodo, deleteTodo } from "../../redux/todoSlice";
import { useDispatch } from "react-redux";
import accept from "../../assets/imgs/accept.png";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";


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
  const [value, setValue] = React.useState("");
  const { t } = useTranslation();
  const { spravochnik } = useContext(Context);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title: value,
      })
    );
    setValue("");
  };

  const setRemove = (e, title) => {
    e.preventDefault();
    dispatch(deleteTodo(title));
  };

  const dispatch = useDispatch();
  return (
    <>
      <section className={s.Spravochnik}>
        <div className={s.Spravochnik_container}>
          <div className={s.Spravochnik_label}>
            <h1>{t("spra")}</h1>
            <button onClick={handleOpen} className={s.Spravochnik_label_btn}>
              <span style={{ fontSize: "25px" }}>+</span>
              <span>{t("spra1")}</span>
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
                  <h1>{t("spra2")}</h1>
                  <p>{t("spra3")}</p>
                  <input type="text" />
                  <p>{t("spra4")}</p>
                  <div className={s.two_in_one}>
                    <button
                      className={s.accept}
                      disabled={!value}
                      onClick={onSubmit}
                    >
                      <img src={accept} alt="Accept" />
                    </button>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>

                  <ol>
                    {JSON.parse(localStorage.getItem("todos"))?.map(
                      (el, index) => {
                        return (
                          <li key={index}>
                            <p>{el.title}</p>
                            <img
                              onClick={(e) => setRemove(e, el.title)}
                              src={backX}
                              alt="X"
                            />
                          </li>
                        );
                      }
                    )}
                  </ol>
                  <div className={s.spravochnik_empty}></div>
                  <div className={s.spravochnik_btns}>
                    <button
                      onClick={handleClose}
                      className={s.spravochnik_cancel_btn}
                    >
                      {t("btn.5")}
                    </button>
                    <button className={s.spravochnik_save_btn}>
                      {t("btn.4")}
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className={s.input_field}>
            <img className={s.S_icon} src={search} alt="Search" />
            <input type="text" placeholder={t("spra5")} />
          </div>
          {/* <table>
            <thead>
              <tr className={s.Spravochnik_cards_labels}>
                <th>
                  {" "}
                  <p>№</p>
                </th>
                <th>
                  <p>{t("spra6")}</p>
                </th>
                <th>
                  <p>{t("active")}</p>
                </th>
                <th>
                  <p>{t("spra7")}</p>
                </th>
                <th>
                  <p>{t("spra8")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {spravochnik?.map((el) => {
                return (
                  <tr key={el.id}>
                    <td>
                      {" "}
                      <p>{el.id}</p>
                    </td>
                    <td>
                      <p>{el.title}</p>
                    </td>
                    <td>
                      {" "}
                      <div className={s.switch_toggle}>
                        <Switch defaultChecked />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <p>
                        {" "}
                        {el.element_count} {t("spra9")}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <div className={s.lkmain_sect_crud}>
                        <Link to={`/spravochnikId/${el?.id}`}>
                          <button className={s.lkmain_sect_crud_create}>
                            <img src={createIcon} alt="Copy" />
                          </button>
                        </Link>

                        <button className={s.lkmain_sect_crud_delete}>
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          <div className={s.Spravochnik_cards_labels}>
            <p style={{ width: "3%" }}>№</p>
            <p style={{ width: "52%" }}>{t("spra6")}</p>
            <p className={s.checkbox_active}>{t("active")}</p>
            <p style={{ width: "27%" }}>{t("spra7")}</p>
            <p style={{ width: "7%" }}>{t("spra8")}</p>
          </div>
          <div className={s.Spravochnik_sect_creators_parent}>
            {spravochnik?.map((el,index) => {
              return (
                <div
                  className={s.Spravochnik_sect_creators_parent_cards}
                  key={el.id}
                >
                  <Fade top cascade>
                    <span className={s.Spravochnik_twink}>
                      <p>{index}</p>
                      <p>{el.title}</p>
                    </span>
                    <div className={s.switch_toggle}>
                      <Switch defaultChecked />
                    </div>
                    <p style={{ width: "20%" }}>
                      {el.element_count}  {t("spra9")}
                    </p>
                    <div className={s.lkmain_sect_crud}>
                      <Link to={`/spravochnikId/${el?.slug}`}>
                        <button className={s.lkmain_sect_crud_create}>
                          <img src={createIcon} alt="Copy" />
                        </button>
                      </Link>

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
