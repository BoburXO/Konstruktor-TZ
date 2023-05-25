import React, { useContext, useEffect } from "react";
import s from "./Spravochnik.module.css";
import search from "../../assets/icons/search.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import download from "../../assets/icons/skacatIcon.svg";
import Fade from "react-reveal/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import backX from "../../assets/icons/backX.svg";
import { addTodo, deleteTodo } from "../../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import accept from "../../assets/imgs/accept.png";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import SpravochnikPagination from "../../Pagination/SpravochnikPagination";
import { FaEye } from "react-icons/fa";

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

const styleDel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 664,
  height: "max-content",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  p: 4,
};

const Spravochnik = () => {
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  const [spraSlug, setSpraSlug] = React.useState("");
  //modal
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const todos = useSelector((note) => note.todoList);
  const { t } = useTranslation();
  const {
    spravochnik,
    removeSlug,
    getAllSpraSearch,
    setSpraSearch,
    spraSearch,
    isActiveClassificator,
    createClassificator,
    setNameClassUz,
    nameClassUz,
    nameClassRu,
    setNameClassRu,
    SpravochnikExcel,
    ref,
  } = useContext(Context);

  useEffect(() => {
    getAllSpraSearch();
  }, [spraSearch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        content_uz: value,
      })
    );
    setValue("");
  };

  const setRemove = (e, content_uz) => {
    e.preventDefault();
    dispatch(deleteTodo(content_uz));
  };

  setTimeout(() => {
    const reloadWindow = () => {
      window.location.reload();
    };
  }, 2000);
  return (
    <>
      <section className={s.Spravochnik}>
        <Fade top cascade>
          <div className={s.Spravochnik_container}>
            <div className={s.Spravochnik_label}>
              <h1>{t("spra")}</h1>
              {localStorage.getItem("roleName") !== "Author" ? (
                <span>
                  <button
                    onClick={handleOpen}
                    className={s.Spravochnik_label_btn}
                  >
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
                        <p>{t("ru")}:</p>
                        <input
                          value={nameClassRu}
                          onChange={(e) => setNameClassRu(e.target.value)}
                          type="text"
                        />
                        <p>{t("uz")}:</p>
                        <input
                          value={nameClassUz}
                          onChange={(e) => setNameClassUz(e.target.value)}
                          type="text"
                        />
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
                          {todos?.map((el) => {
                            return (
                              <li key={el.id}>
                                <p>{el.content_uz}</p>
                                <img
                                  onClick={() => dispatch(deleteTodo(el.id))}
                                  src={backX}
                                  alt="X"
                                />
                              </li>
                            );
                          })}
                        </ol>
                        <div className={s.spravochnik_empty}></div>
                        <div className={s.spravochnik_btns}>
                          <button
                            onClick={handleClose}
                            className={s.spravochnik_cancel_btn}
                          >
                            {t("btn.5")}
                          </button>
                          {!todos.length <= 0 ? (
                            <button
                              onClick={() => createClassificator()}
                              className={s.spravochnik_save_btn}
                            >
                              {t("btn.4")}
                            </button>
                          ) : (
                            <button className={s.spravochnik_save_btn}>
                              {t("btn.4")}
                            </button>
                          )}
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </span>
              ) : null}
            </div>
            <div className={s.input_field}>
              <img className={s.S_icon} src={search} alt="Search" />
              <input
                onChange={(e) => setSpraSearch(e.target.value.trim())}
                value={spraSearch}
                type="text"
                placeholder={t("spra5")}
              />
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
              {localStorage.getItem("roleName") !== "Author" ? (
                <p className={s.checkbox_active}>{t("active")}</p>
              ) : null}
              <p style={{ width: "27%" }}>{t("spra7")}</p>
              <p style={{ width: "9%" }}>{t("spra8")}</p>
            </div>
            <div className={s.Spravochnik_sect_creators_parent}>
              {spravochnik?.length === 0 ? (
                <h1 className={s.notFound}>{t("toast404")}</h1>
              ) : (
                spravochnik?.results?.map((el) => {
                  return (
                    <div
                      className={s.Spravochnik_sect_creators_parent_cards}
                      key={el.id}
                    >
                      <span className={s.Spravochnik_twink}>
                        <p>{el?.row_number}</p>
                        <br />
                        <p>{el.title}</p>
                      </span>
                      {localStorage.getItem("roleName") !== "Author" ? (
                        <div className={s.switch_toggle}>
                          <Switch
                            defaultChecked={el?.is_active}
                            onChange={() =>
                              isActiveClassificator(el?.slug, el?.is_active)
                            }
                          />
                        </div>
                      ) : null}
                      <p style={{ width: "17%" }}>
                        {el.elements.length} {t("spra9")}
                      </p>
                      {localStorage.getItem("roleName") !== "Author" ? (
                        <div className={s.lkmain_sect_crud}>
                          <Link to={`/spravochnikId/${el?.slug}`}>
                            <button className={s.lkmain_sect_crud_create}>
                              <img src={createIcon} alt="Copy" />
                            </button>
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              SpravochnikExcel("uz", el?.id, el?.title)
                            }
                            className={s.lkmain_sect_crud_download}
                          >
                            <img src={download} alt="Download" />
                            <a ref={ref}></a>
                          </button>
                          <button
                            onClick={() => {
                              handleOpenDel();
                              setSpraSlug(el?.slug);
                            }}
                            className={s.lkmain_sect_crud_delete}
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                          <Modal
                            slotProps={{
                              backdrop: {
                                style: { opacity: "0.3", boxShadow: 24 },
                              },
                            }}
                            open={openDel}
                            onClose={handleCloseDel}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={styleDel}>
                              <form
                                style={{ textAlign: "center" }}
                                className={s.createElementForm}
                              >
                                <h2>{t("sfera.3")}</h2>
                                <br />
                                <p>{t("sfera.6")}</p>
                                <br />
                                <div className={s.createElementFormBtns}>
                                  {" "}
                                  <button
                                    type="button"
                                    onClick={() => handleCloseDel()}
                                    className={s.shablon_save_btn}
                                  >
                                    {t("btn.5")}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeSlug(spraSlug)}
                                    className={s.shablon_delete_btn}
                                  >
                                    {t("btn.6")}
                                  </button>
                                </div>
                              </form>
                            </Box>
                          </Modal>
                        </div>
                      ) : (
                        <div className={s.lkmain_sect_crud}>
                          <button className={s.lkmain_sect_crud_download}>
                            <img src={download} alt="Download" />
                          </button>
                          <Link to={`/index-spravochnik/${el?.slug}`}>
                            <button className={s.lkmain_sect_crud_create}>
                              <FaEye
                                style={{ color: "#2f80ed", fontSize: "16px" }}
                              />
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <br />
            <br />
            <div className={s.spra_pagination}>
              <SpravochnikPagination spravochnik={spravochnik?.total_pages} />
            </div>
          </div>
        </Fade>
      </section>
    </>
  );
};

export default Spravochnik;
