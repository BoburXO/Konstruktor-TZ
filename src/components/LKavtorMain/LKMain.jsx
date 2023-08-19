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
import LkAvtorUserPagination from "../../Pagination/LkAvtorUserPagination";
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
import {
  doubleStructure,
  duplicateTzForUser,
  setTzIdForFilling,
} from "../../pages/LKavtor/lkavtor_slice";
import { useSelector, useDispatch } from "react-redux";
import SuperTzPagination from "../../Pagination/SuperTzPagination";
import { FaEye } from "react-icons/fa";
import { setRowNumberForTz } from "../../helpers/helpers";
import { clearPdfStates, uploadPdf } from "../../redux/api/user/pdf_slice";
import { API } from "../../api/Api";

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
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // filters
  const [own, setOwn] = useState(false);
  const [draft, setDraft] = useState(false);
  const [type, setType] = useState("");
  //filters

  const [isAuthor, setIsAuthor] = useState("");
  const [userId, setUserId] = useState("");

  //modal
  const [delId, setDelId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  //modal
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    superTzSearch,
    setSuperTzSearch,
    superTz,
    SuperTzGet,
    DuplicateTz,
    deleteTz,
    SuperAuthor,
  } = useContext(Context);

  const {
    message,
    loading,
    duplicatedTz,
    duplicateLoading,
    doubledStructure,
    isDoubleStrucLoading,
  } = useSelector((state) => state.lkavtor);

  const { pdfLoading, pdf } = useSelector((state) => state.pdf);

  useEffect(() => {
    SuperTzGet({ draft, owner: own, type }).then(() => setIsLoading(false));
    setUserId(superTz?.user_organization?.find((_, index) => index === 0)?.id);
  }, [superTzSearch]);

  useEffect(() => {
    if (message?.id) {
      return navigate(`/tz/create/${message.id}`);
    }
  }, [message]);

  useEffect(() => {
    if (localStorage.getItem("roleName") === "Author" && duplicatedTz?.id) {
      return navigate(`/tz/create/${duplicatedTz?.id}`);
    }
  }, [duplicatedTz]);

  useEffect(() => {
    if (pdf.pdf_file) {
      window.open(pdf?.pdf_file, "_blank", "rel=noopener noreferrer");
      dispatch(clearPdfStates());
    }
  }, [pdf]);

  if (isLoading) return <Loader />;

  const options = [
    { value: "", label: t("filter.1") },
    { value: 1, label: t("lkavtor5") },
    { value: 2, label: t("lkavtor6") },
  ];

  const optionOwner = [
    { value: true, label: t("super.2") },
    { value: false, label: t("super.5") },
  ];

  const optionsDraft = [
    { value: false, label: t("filter.2") },
    { value: true, label: t("filter.3") },
  ];

  const optionsTzSructure = [
    { value: false, label: t("super.7") },
    { value: true, label: t("super.8") },
  ];

  const handleChange = (value, { owner, draft, type, id }) => {
    value === true
      ? SuperAuthor({ owner: owner, draft: draft, type: type, id }) &&
        setIsAuthor()
      : SuperTzGet({ owner: owner, draft: draft, type: type, id });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {duplicateLoading ? (
            <Loader />
          ) : (
            <section className={s.lkmain_sect}>
              <div className={s.lkmain_sect_container}>
                <div className={s.twink}>
                  <h1>{t("lkavtor")}</h1>
                  {/* {localStorage.getItem("roleName") === "Admin" ? (
                    <button
                      onClick={() => navigate("/createtz")}
                      className={s.lkmain_sect_create_btn}
                    >
                      <span style={{ fontSize: "25px" }}>+</span>
                      <span>{t("lkavtor1")}</span>
                    </button>
                    ) : null} */}
                </div>
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
                        onChange={(e) => setSuperTzSearch(e.target.value)}
                        type="text"
                        placeholder={t("content-site.3")}
                      />
                    </div>
                    <div>
                      <Select
                        placeholder={t("filter.4")}
                        onChange={(value) => {
                          SuperTzGet({
                            type: value.value,
                            owner: own,
                            draft: draft,
                          });
                          setType(value.value);
                        }}
                        className={s.selecttt}
                        options={options}
                      />
                    </div>
                    {localStorage.getItem("roleName") === "Admin" ? (
                      <div>
                        <Select
                          placeholder={t("super.5")}
                          onChange={(value) => {
                            SuperTzGet({
                              owner: value.value,
                              draft: value.value === false ? false : draft,
                              type: type,
                            });
                            setOwn(value.value);
                          }}
                          className={s.selecttt}
                          options={optionOwner}
                        />
                      </div>
                    ) : null}
                    {localStorage.getItem("roleName") === "Moderator" ? (
                      <div>
                        <Select
                          placeholder={t("filter.1")}
                          onChange={(value) => {
                            SuperTzGet({
                              owner: own,
                              draft: value.value,
                              type: type,
                            });
                            setDraft(value.value);
                          }}
                          className={s.selecttt}
                          options={optionsDraft}
                        />
                      </div>
                    ) : null}
                    {own ? (
                      <>
                        <div>
                          <Select
                            placeholder={t("filter.1")}
                            onChange={(value) => {
                              SuperTzGet({
                                owner: own,
                                draft: value.value,
                                type: type,
                              });
                              setDraft(value.value);
                            }}
                            className={s.selecttt}
                            options={optionsDraft}
                          />
                        </div>
                      </>
                    ) : null}
                    {localStorage.getItem("roleName") === "Admin" ? (
                      <div>
                        <Select
                          placeholder={t("filter.1")}
                          onChange={(value) => {
                            handleChange(value.value, {
                              owner: own,
                              draft: draft,
                              type: type,
                              id: userId,
                            });
                            setIsAuthor(value.value);
                          }}
                          className={s.selecttt}
                          options={optionsTzSructure}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                {superTz?.results?.length ? (
                  <>
                    <div className={s.org_name_div}>
                      <h4>{localStorage.getItem("organizationName")}</h4>
                      <h4>
                        {"№ "}
                        {superTz?.count}
                      </h4>
                    </div>
                    <TableContainer
                      component={Paper}
                      classes={{ root: s.table }}
                    >
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
                                  #
                                  {setRowNumberForTz(
                                    superTz?.current_page,
                                    8,
                                    i
                                  )}
                                </p>
                              </TableCell>
                              <TableCell align="left">
                                <p>{tz?.user?.username}</p>
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
                                  {/* <p>{tz?.created_at.slice(0, 10)}</p> */}
                                </span>{" "}
                              </TableCell>
                              <TableCell align="right">
                                {tz?.user?.username ===
                                localStorage.getItem("roleUserName") ? (
                                  <div className={s.lkmain_sect_crud}>
                                    {!isAuthor ? (
                                      <>
                                        {localStorage.getItem("roleName") ===
                                          "Admin" ||
                                        localStorage.getItem("roleName") ===
                                          "SuperAdmin" ? (
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
                                          onClick={() => {
                                            dispatch(
                                              duplicateTzForUser(tz?.id)
                                            );
                                          }}
                                          className={s.lkmain_sect_crud_copy}
                                        >
                                          <img src={copyIcon} alt="Copy" />
                                        </button>
                                      </>
                                    ) : null}
                                    {
                                      localStorage.getItem("roleName") !==
                                      "Author" ? (
                                        <>
                                          {" "}
                                          <Link
                                            to={
                                              !isAuthor
                                                ? `/structure/edit/${tz?.id}`
                                                : `/tz/edit/${tz?.id}`
                                            }
                                          >
                                            <button
                                              className={
                                                s.lkmain_sect_crud_create
                                              }
                                            >
                                              <img
                                                src={createIcon}
                                                alt="Edit"
                                              />
                                            </button>
                                          </Link>
                                          <button
                                            className={
                                              s.lkmain_sect_crud_skacat
                                            }
                                          >
                                            {/* <a
                                              rel="noopener"
                                              // href={tz?.pdf_file}
                                              // download
                                              target="_blank"
                                            > */}
                                            <img
                                              src={skacatIcon}
                                              alt="Download"
                                              onClick={() => {
                                                dispatch(uploadPdf(tz?.id));
                                              }}
                                            />
                                            {/* </a> */}
                                          </button>
                                          <button
                                            onClick={() => {
                                              handleOpenDel();
                                              setDelId(tz?.id);
                                            }}
                                            className={
                                              s.lkmain_sect_crud_delete
                                            }
                                          >
                                            <img
                                              src={deleteIcon}
                                              alt="Delete"
                                            />
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
                                                style={{
                                                  textAlign: "center",
                                                }}
                                                className={s.createElementForm}
                                              >
                                                <h2>{t("sfera.3")}</h2>
                                                <br />
                                                <p>{t("sfera.6")}</p>
                                                <br />
                                                <div
                                                  className={
                                                    s.createElementFormBtns
                                                  }
                                                >
                                                  {" "}
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      handleCloseDel()
                                                    }
                                                    className={
                                                      s.shablon_save_btn
                                                    }
                                                  >
                                                    {t("btn.5")}
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      deleteTz(delId)
                                                    }
                                                    className={
                                                      s.shablon_delete_btn
                                                    }
                                                  >
                                                    {t("btn.6")}
                                                  </button>
                                                </div>
                                              </form>
                                            </Box>
                                          </Modal>
                                        </>
                                      ) : null
                                      // <>
                                      //   <button
                                      //     className={s.lkmain_sect_crud_copy}
                                      //     style={{ borderColor: "#0ba9cc" }}
                                      //     onClick={() =>
                                      //       navigate(`/structure/${tz?.id}`)
                                      //     }
                                      //   >
                                      //     <i
                                      //       className="fa-regular fa-eye"
                                      //       style={{
                                      //         color: "#0ba9cc",
                                      //         fontSize: 20,
                                      //       }}
                                      //     ></i>
                                      //   </button>
                                      // </>
                                    }
                                  </div>
                                ) : (
                                  <div className={s.lkmain_sect_crud}>
                                    <button
                                      onClick={() => {
                                        // DuplicateTz(tz?.id);
                                        dispatch(duplicateTzForUser(tz?.id));
                                      }}
                                      className={s.lkmain_sect_crud_copy}
                                    >
                                      <img src={copyIcon} alt="Copy" />
                                    </button>
                                    <button
                                      className={s.content_crud_create}
                                      onClick={() =>
                                        navigate(`/structure/${tz?.id}`)
                                      }
                                    >
                                      <FaEye
                                        style={{
                                          color: "#2f80ed",
                                          fontSize: "16px",
                                        }}
                                      />
                                    </button>
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
                      {isAuthor ? (
                        <LkAvtorUserPagination
                          paramsID={userId}
                          type={type}
                          own={own}
                          draft={draft}
                          superTz={superTz?.total_pages}
                        />
                      ) : (
                        <SuperTzPagination
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
          )}
        </>
      )}
    </>
  );
};

export default LKMain;
