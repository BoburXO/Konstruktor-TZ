import React, { useContext, useEffect, useState } from "react";
import s from "../LKavtorMain/LKMain.module.css";
import date from "../../assets/icons/dateIcon.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Context } from "../../Context/Context";
import search from "../../assets/icons/search.svg";
import LkAvtorPagination from "../../Pagination/LkAvtorPagination";
import Select from "react-select";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 0,
  p: 4,
};

const LKMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  //modal
  const [delId, setDelId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  //modal
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    getCreateTzOwner,
    getCreateTz,
    createTz,
    setTzSearch,
    tzSearch,
    getCreateTzSelectType,
    deleteTz,
  } = useContext(Context);

  useEffect(() => {
    getCreateTz().then(() => setIsLoading(false));
  }, [tzSearch]);

  if (isLoading) return <Loader />;

  const options = [
    { value: "", label: t("filter.1") },
    { value: 1, label: t("lkavtor5") },
    { value: 2, label: t("lkavtor6") },
  ];

  const optionOwner = [
    { value: true, label: "My" },
    { value: false, label: "All" },
  ];

  return (
    <>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <h1>{t("lkavtor")}</h1>
          <br />
          <div className={s.lkmain_sect_labels}>
            <div
              style={{
                width: "35%",
                display: "flex",
                height: "60px",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className={s.input_field}>
                <img className={s.S_icon} src={search} alt="Search" />
                <input
                  onChange={(e) => setTzSearch(e.target.value)}
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
              <div>
                <Select
                  placeholder={t("filter.4")}
                  onChange={(value) => getCreateTzSelectType(value.value)}
                  className={s.selecttt}
                  options={options}
                />
              </div>
              {localStorage.getItem("roleName") === "Admin" ||
              localStorage.getItem("roleName") === "SuperAdmin" ? (
                <div>
                  <Select
                    placeholder={"Owner"}
                    onChange={(value) => getCreateTzOwner(value.value)}
                    className={s.selecttt}
                    options={optionOwner}
                  />
                </div>
              ) : null}
            </div>
            <button
              onClick={() => navigate("/createtz")}
              className={s.lkmain_sect_create_btn}
            >
              <span style={{ fontSize: "25px" }}>+</span>
              <span>{t("lkavtor1")}</span>
            </button>
          </div>
          {createTz?.results?.length ? (
            <div>
              {createTz?.results?.map((el) => (
                <div key={el?.id}>
                  <br />
                  <br />
                  <div className={s.organization_label}>
                    <p>{el?.name}</p>
                    <p>№{el?.count_of_result}</p>
                    <br />
                    <br />
                  </div>
                  <TableContainer component={Paper} classes={{ root: s.table }}>
                    {el?.user_organization?.map((user) => (
                      <Table
                        key={user.id}
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">
                              <p>ID</p>
                            </TableCell>
                            <TableCell align="left">
                              <p>{t("lkavtor10")}</p>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <p>{t("lkavtor2")}</p>
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <p>{t("lkavtor3")}</p>
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              <p>{t("lkavtor4")}</p>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody classes={{ root: s.tbody_root }}>
                          {user?.paginated_results?.results?.map((tz) => (
                            <TableRow
                              key={tz?.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">
                                <p>#{tz?.row_number}</p>
                              </TableCell>
                              <TableCell align="left">
                                {" "}
                                <p>{user?.username}</p>
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                <p>{tz?.tz_name}</p>
                              </TableCell>
                              <TableCell align="left">
                                {" "}
                                <span className={s.lkmain_sect_dates}>
                                  <img src={date} alt="" />
                                  <p>{tz?.created_at}</p>
                                </span>{" "}
                              </TableCell>
                              <TableCell align="right">
                                {user?.username ===
                                localStorage.getItem("roleUserName") ? (
                                  <div className={s.lkmain_sect_crud}>
                                    <button className={s.lkmain_sect_crud_copy}>
                                      <img src={copyIcon} alt="Copy" />
                                    </button>
                                    <Link to={`/lkavtor/${tz.id}/`}>
                                      <button
                                        className={s.lkmain_sect_crud_create}
                                      >
                                        <img src={createIcon} alt="Copy" />
                                      </button>
                                    </Link>
                                    <button
                                      className={s.lkmain_sect_crud_skacat}
                                    >
                                      <a
                                        rel="noopener"
                                        href={el?.pdf_file}
                                        download
                                        target="_blank"
                                      >
                                        {" "}
                                        <img src={skacatIcon} alt="Download" />
                                      </a>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleOpenDel();
                                        setDelId(el?.id);
                                      }}
                                      className={s.lkmain_sect_crud_delete}
                                    >
                                      <img src={deleteIcon} alt="Delete" />
                                    </button>
                                    <Modal
                                      slotProps={{
                                        backdrop: {
                                          style: {
                                            opacity: "0.7",
                                            boxShadow: 24,
                                          },
                                        },
                                      }}
                                      open={openDel}
                                      onClose={handleCloseDel}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                    >
                                      <Box sx={style}>
                                        <form
                                          style={{ textAlign: "center" }}
                                          className={s.createElementForm}
                                        >
                                          <h2>{t("sfera.3")}</h2>
                                          <br />
                                          <p>{t("sfera.6")}</p>
                                          <br />
                                          <div
                                            className={s.createElementFormBtns}
                                          >
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
                                              onClick={() =>
                                                deleteTz(delId).then(() =>
                                                  setIsLoading(false)
                                                )
                                              }
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
                                    <button className={s.lkmain_sect_crud_copy}>
                                      <img src={copyIcon} alt="Copy" />
                                    </button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ))}
                  </TableContainer>
                </div>
              ))}
            </div>
          ) : (
            <>
              <h1 className={s.notFound}>{t("toast404")}</h1>
            </>
          )}
          <br />
          <br />
          <div className={s.content_pagination}>
            <LkAvtorPagination
              createTz={
                createTz?.results[0]?.user_organization[0]?.paginated_results
                  ?.total_pages
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LKMain;
