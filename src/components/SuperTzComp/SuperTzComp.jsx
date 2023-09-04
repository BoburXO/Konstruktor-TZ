import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
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
import LkAvtorUserPagination from "../../Pagination/LkAvtorUserPagination";
import { FaEye } from "react-icons/fa";
import { setRowNumberForTz } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { doubleStructure } from "../../pages/LKavtor/lkavtor_slice";

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
  const [isAuthor, setIsAuthor] = useState("");
  const [own, setOwn] = useState(false);
  const [draft, setDraft] = useState(false);
  const [type, setType] = useState("");
  //modal
  const [delId, setDelId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  //modal
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    organization,
    SuperOrganizations,
    superTz,
    SuperTzGet,
    deleteTz,
    superTzSearch,
    setSuperTzSearch,
    DuplicateTz,
    SuperAuthor,
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const orgParams = organization?.results?.find((el) => {
    return el?.id === id;
  });

  useEffect(() => {
    SuperOrganizations().then(() => setIsLoading(false));
    SuperTzGet({ id, draft, owner: own, type }).then(() => setIsLoading(false));
  }, [superTzSearch]);

  if (isLoading) return <Loader />;

  const options = [
    { value: "", label: t("filter.1") },
    { value: 1, label: t("lkavtor5") },
    { value: 2, label: t("lkavtor6") },
  ];

  const optionsDraft = [
    { value: false, label: t("filter.2") },
    { value: true, label: t("filter.3") },
  ];

  const optionsAuthor = [
    { value: "All", label: t("super.7") },
    { value: "Author", label: t("super.8") },
  ];

  const optionOwner = [
    { value: true, label: t("super.2") },
    { value: false, label: t("filter.1") },
  ];

  const handleChange = (value, { owner, draft, type, id }) => {
    value === "All"
      ? SuperTzGet({ owner: owner, draft: draft, type: type, id })
      : SuperAuthor({ owner: owner, draft: draft, type: type, id });
  };

  return (
    <div>
      <section className={s.lkmain_sect}>
        <div className={s.lkmain_sect_container}>
          <div className={s.lkmain_sect_labels}>
            <h1>{orgParams?.name}</h1>
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
                  value={superTzSearch}
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
              <div>
                <Select
                  placeholder={t("filter.1")}
                  onChange={(value) => {
                    SuperTzGet({
                      type: value.value,
                      id,
                      owner: own,
                      draft: draft,
                    });
                    setType(value.value);
                  }}
                  className={s.selecttt}
                  options={options}
                />
              </div>
              {orgParams?.name === localStorage.getItem("organizationName") ? (
                <div>
                  <Select
                    placeholder={t("filter.1")}
                    onChange={(value) => {
                      setOwn(value.value);
                      SuperTzGet({
                        owner: value.value,
                        type: type,
                        id,
                        draft: value.value === false ? false : draft,
                      });
                    }}
                    className={s.selecttt}
                    options={optionOwner}
                  />
                </div>
              ) : null}
              {own ? (
                <div>
                  <Select
                    placeholder={t("filter.2")}
                    onChange={(value) => {
                      setDraft(value.value);
                      SuperTzGet({
                        draft: value.value,
                        id,
                        type: type,
                        owner: own,
                      });
                    }}
                    className={s.selecttt}
                    options={optionsDraft}
                  />
                </div>
              ) : null}
              <div>
                <Select
                  placeholder={t("super.7")}
                  onChange={(value) => {
                    handleChange(value.value, {
                      id,
                      owner: own,
                      draft: draft,
                      type: type,
                    });
                    setIsAuthor(value.value);
                  }}
                  className={s.selecttt}
                  options={optionsAuthor}
                />
              </div>
            </div>
          </div>
          <br />
          {superTz?.results?.length ? (
            <>
              <TableContainer component={Paper} classes={{ root: s.table }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <p>№</p>
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
                    {superTz?.results?.map((tz, i) => (
                      <TableRow
                        key={tz?.id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell align="left">
                          <p>
                            # {setRowNumberForTz(superTz?.current_page, 8, i)}
                          </p>
                        </TableCell>
                        <TableCell align="left">
                          {" "}
                          <p>{tz?.user?.username}</p>
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
                          {tz?.user?.username ===
                          localStorage.getItem("roleUserName") ? (
                            <div className={s.lkmain_sect_crud}>
                              {(localStorage.getItem("roleName") === "Admin" ||
                                localStorage.getItem("roleName") ===
                                  "SuperAdmin") &&
                              !draft ? (
                                <button
                                  className={s.lkmain_sect_crud_copy}
                                  style={{
                                    borderColor: "green",
                                    color: "green",
                                    fontWeight: "500",
                                  }}
                                  onClick={() => {
                                    dispatch(
                                      doubleStructure({
                                        id: tz?.id,
                                        data: { is_double: true },
                                      })
                                    );
                                  }}
                                >
                                  Fill
                                </button>
                              ) : null}
                              <button
                                onClick={() => DuplicateTz(tz?.id)}
                                className={s.lkmain_sect_crud_copy}
                              >
                                <img src={copyIcon} alt="Copy" />
                              </button>
                              <Link to={`/structure/edit/${tz?.id}`}>
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
                              <Link to={`/structure/${tz?.id}`}>
                                <button className={s.content_crud_create}>
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <br />
              <div className={s.content_pagination}>
                {isAuthor !== "Author" ? (
                  <SuperTzPagination
                    own={own}
                    draft={draft}
                    type={type}
                    paramsID={id}
                    superTz={superTz?.total_pages}
                  />
                ) : (
                  <LkAvtorUserPagination
                    paramsID={id}
                    type={type}
                    own={own}
                    draft={draft}
                    superTz={superTz?.total_pages}
                  />
                )}
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
