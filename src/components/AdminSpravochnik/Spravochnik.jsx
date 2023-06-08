import React, { useContext, useEffect, useState } from "react";
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
import Loader from "../Loader/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  const [isLoading, setIsLoading] = useState(true);
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
    getAllSpraSearch().then(() => setIsLoading(false));
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

  if (isLoading) return <Loader />;
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
          </div>
          <br />
          <div className={s.Spravochnik_container}>
            {spravochnik?.results?.length > 0 ? (
              <TableContainer component={Paper} classes={{ root: s.table }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>№ </TableCell>
                      <TableCell align="left">{t("spra6")}</TableCell>
                      <TableCell align="left">{t("spra7")}</TableCell>
                      {localStorage.getItem("roleName") !== "Author" ? (
                        <TableCell>{t("active")}</TableCell>
                      ) : null}
                      <TableCell align="right">{t("spra8")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody classes={{ root: s.tbody_root }}>
                    {spravochnik?.results?.map((row) => (
                      <>
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{row.row_number}</TableCell>
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          {localStorage.getItem("roleName") !== "Author" ? (
                            <TableCell align="left">
                              <Switch
                                defaultChecked={row?.is_active}
                                onChange={() =>
                                  isActiveClassificator(
                                    row?.slug,
                                    row?.is_active
                                  )
                                }
                              />
                            </TableCell>
                          ) : null}
                          <TableCell align="left">
                            {row.elements.length} {t("spra9")}
                          </TableCell>
                          <TableCell>
                            {localStorage.getItem("roleName") !== "Author" ? (
                              <div className={s.lkmain_sect_crud}>
                                <Link to={`/spravochnikId/${row?.slug}`}>
                                  <button className={s.lkmain_sect_crud_create}>
                                    <img src={createIcon} alt="Copy" />
                                  </button>
                                </Link>

                                <button
                                  type="button"
                                  onClick={() =>
                                    SpravochnikExcel("uz", row?.id, row?.title)
                                  }
                                  className={s.lkmain_sect_crud_download}
                                >
                                  <img src={download} alt="Download" />
                                  <a ref={ref}></a>
                                </button>
                                <button
                                  onClick={() => {
                                    handleOpenDel();
                                    setSpraSlug(row?.slug);
                                  }}
                                  className={s.lkmain_sect_crud_delete}
                                >
                                  <img src={deleteIcon} alt="Delete" />
                                </button>
                                <Modal
                                  slotProps={{
                                    backdrop: {
                                      style: { opacity: "0.5", boxShadow: 24 },
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
                                <button
                                  type="button"
                                  onClick={() =>
                                    SpravochnikExcel("uz", row?.id, row?.title)
                                  }
                                  className={s.lkmain_sect_crud_download}
                                >
                                  <img src={download} alt="Download" />
                                  <a ref={ref}></a>
                                </button>
                                <Link to={`/index-spravochnik/${row?.slug}`}>
                                  <button className={s.lkmain_sect_crud_create}>
                                    <FaEye
                                      style={{
                                        color: "#2f80ed",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </button>
                                </Link>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <>
                <h1 className={s.notFound}>{t("toast404")}</h1>
              </>
            )}
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
