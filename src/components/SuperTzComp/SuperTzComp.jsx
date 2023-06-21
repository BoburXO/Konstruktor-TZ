import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import Loader from "../Loader/Loader";
import s from "../SuperTzComp/superTz.module.css";
import search from "../../assets/icons/search.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import date from "../../assets/icons/dateIcon.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import SuperTzPagination from "../../Pagination/SuperTzPagination";
import Select from "react-select";

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

const SuperTzComp = () => {
  //modal
  const [delId, setDelId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  //modal

  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    superTz,
    SuperTzGet,
    deleteTz,
    superTzSearch,
    setSuperTzSearch,
    getSuperTzSelect,
    DuplicateTz,
    getSuperTzDraft,
    SuperAuthor,
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    SuperTzGet(id).then(() => setIsLoading(false));
  }, [superTzSearch]);

  if (isLoading) return <Loader />;

  const options = [
    { value: "", label: t("filter.1") },
    { value: 1, label: t("lkavtor5") },
    { value: 2, label: t("lkavtor6") },
  ];

  const optionsDraft = [
    { value: "", label: t("filter.1") },
    { value: false, label: t("filter.2") },
    { value: true, label: t("filter.3") },
  ];

  const optionsAuthor = [
    { value: "All", label: "Admin/Moderator" },
    { value: "Author", label: t("filter.5") },
  ];

  const handleChange = (value, id) => {
    value === "All" ? SuperTzGet(id) : SuperAuthor();
  };

  return (
    <div>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <div className={s.lkmain_sect_labels}>
            <h1>{superTz?.name}</h1>
            <button
              onClick={() => navigate("/createtz")}
              className={s.lkmain_sect_create_btn}
            >
              <span style={{ fontSize: "25px" }}>+</span>
              <span>{t("lkavtor1")}</span>
            </button>
          </div>
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
                  onChange={(e) => setSuperTzSearch(e.target.value)}
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
              <div>
                <Select
                  placeholder={t("filter.1")}
                  onChange={(value) => getSuperTzSelect(value.value, id)}
                  className={s.selecttt}
                  options={options}
                />
              </div>
              {superTz?.user_organization?.find((_, index) => index === 0)
                ?.username === localStorage.getItem("roleUserName") ? (
                <div>
                  <Select
                    placeholder={t("filter.1")}
                    onChange={(value) => getSuperTzDraft(value.value, id)}
                    className={s.selecttt}
                    options={optionsDraft}
                  />
                </div>
              ) : null}
              <div>
                <Select
                  placeholder={t("filter.1")}
                  onChange={(value) => handleChange(value.value, id)}
                  className={s.selecttt}
                  options={optionsAuthor}
                />
              </div>
            </div>
          </div>
          <br />
          {superTz?.user_organization[0]?.paginated_results?.results?.length ? (
            <>
              <TableContainer component={Paper} classes={{ root: s.table }}>
                {superTz?.user_organization?.map((user) => (
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
                          <TableCell component="th" scope="row" align="left">
                            <p>{tz?.tz_name}</p>
                          </TableCell>
                          <TableCell align="left">
                            {" "}
                            <span className={s.lkmain_sect_dates}>
                              <img src={date} alt="" />
                              <p>{tz?.created_at.slice(0, 10)}</p>
                            </span>{" "}
                          </TableCell>
                          <TableCell align="right">
                            {user?.username ===
                            localStorage.getItem("roleUserName") ? (
                              <div className={s.lkmain_sect_crud}>
                                <button
                                  onClick={() => DuplicateTz(tz?.id)}
                                  className={s.lkmain_sect_crud_copy}
                                >
                                  <img src={copyIcon} alt="Copy" />
                                </button>
                                <Link to={`/lkavtor/${tz.id}/`}>
                                  <button className={s.lkmain_sect_crud_create}>
                                    <img src={createIcon} alt="Copy" />
                                  </button>
                                </Link>
                                <button className={s.lkmain_sect_crud_skacat}>
                                  <a
                                    rel="noopener"
                                    href={tz?.pdf_file}
                                    download
                                    target="_blank"
                                  >
                                    <img src={skacatIcon} alt="Download" />
                                  </a>
                                </button>
                                <button
                                  onClick={() => {
                                    handleOpenDel();
                                    setDelId(tz?.id);
                                  }}
                                  className={s.lkmain_sect_crud_delete}
                                >
                                  <img src={deleteIcon} alt="Delete" />
                                </button>
                                <Modal
                                  slotProps={{
                                    backdrop: {
                                      style: {
                                        opacity: "0.4",
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
                                <button
                                  onClick={() => DuplicateTz(tz?.id)}
                                  className={s.lkmain_sect_crud_copy}
                                >
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
              <br />
              <br />
              <div className={s.content_pagination}>
                <SuperTzPagination
                  paramsID={id}
                  superTz={
                    superTz?.user_organization?.find((_, index) => index === 0)
                      ?.paginated_results?.total_pages
                  }
                />
              </div>
            </>
          ) : (
            <>
              <h1 className={s.notFound}>{t("toast404")}</h1>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SuperTzComp;
