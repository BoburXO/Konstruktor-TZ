import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Context } from "../../Context/Context";
import Loader from "../Loader/Loader";
import s from "../SuperTzComp/superTz.module.css";
import search_icon from "../../assets/icons/search.svg";
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
import { useDispatch, useSelector } from "react-redux";
import { doubleStructure } from "../../pages/LKavtor/lkavtor_slice";
import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { uploadPdf } from "../../redux/api/user/pdf_slice";

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

const passQueryParamsToUrl = (query, setQuery, paramName, paramValue) => {
  const param = query.get(paramName);
  if (param) {
    // query.delete(paramName);
    setQuery((params) => {
      params.set(paramName, paramValue);
      return params;
    });
  } else {
    setQuery((params) => {
      params.set(paramName, paramValue);
      return params;
    });
  }
};

const SuperTzComp = () => {
  const { pathname, search } = useLocation();
  const query = useQuery(search);
  const navigate = useNavigate();
  const pageRef = useRef();
  const isAuthorRef = useRef();
  const tzSearchRef = useRef();
  const typeRef = useRef();
  const draftRef = useRef();
  const ownRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const { message, loading } = useSelector((state) => state.lkavtor);

  //url
  //filters
  const [isAuthor, setIsAuthor] = useState(query.get("scope") || "structure");
  const [own, setOwn] = useState(JSON.parse(query.get("own")) || false);
  const [draft, setDraft] = useState(JSON.parse(query.get("draft")) || false);
  const [type, setType] = useState(query.get("type") || "");
  const [superTzSearch, setSuperTzSearch] = useState(
    query.get("tz_name") || ""
  );
  const [page, setPage] = useState(+query.get("page") || 1);

  //refCurrents
  const [isAuthorCurrent, setIsAuthorCurrent] = useState(isAuthorRef.current);

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
    DuplicateTz,
    SuperAuthor,
  } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const orgParams = organization?.results?.find((el) => {
    return el?.id === id;
  });

  const fetchAllTzAndStructure = () => {
    if (isAuthor === "structure") {
      SuperTzGet({
        id,
        draft,
        owner: own,
        type,
        tz_name: superTzSearch,
        page,
      }).then(() => setIsLoading(false));
    } else {
      SuperAuthor({
        id,
        draft,
        owner: own,
        type,
        tz_name: superTzSearch,
        page,
      }).then(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    SuperOrganizations().then(() => setIsLoading(false));
    fetchAllTzAndStructure();
  }, []);

  useEffect(() => {
    if (isAuthorRef.current !== undefined && isAuthorRef.current !== isAuthor) {
      if (page === 1) {
        fetchAllTzAndStructure();
      } else {
        setPage(1);
      }
    } else if (typeRef.current !== undefined && typeRef.current !== type) {
      if (page === 1) {
        fetchAllTzAndStructure();
      } else {
        setPage(1);
      }
    } else if (ownRef.current !== undefined && ownRef.current !== own) {
      if (page === 1) {
        fetchAllTzAndStructure();
      } else {
        setPage(1);
      }
    } else if (draftRef.current !== undefined && draftRef.current !== draft) {
      if (page === 1) {
        fetchAllTzAndStructure();
      } else {
        setPage(1);
      }
    } else if (
      tzSearchRef.current !== undefined &&
      tzSearchRef.current !== superTzSearch
    ) {
      if (page === 1) {
        fetchAllTzAndStructure();
      } else {
        setPage(1);
      }
    } else {
      fetchAllTzAndStructure();
    }
    if (isAuthor) {
      passQueryParamsToUrl(searchParams, setSearchParams, "scope", isAuthor);
    }
    if (page) {
      passQueryParamsToUrl(searchParams, setSearchParams, "page", page);
    }
    if (own) {
      passQueryParamsToUrl(searchParams, setSearchParams, "own", own);
      passQueryParamsToUrl(searchParams, setSearchParams, "draft", draft);
    } else {
      setSearchParams((prev) => {
        prev.delete("own");
        prev.delete("draft");
        return prev;
      });
    }
    if (type) {
      passQueryParamsToUrl(searchParams, setSearchParams, "type", type);
    } else {
      setSearchParams((prev) => {
        prev.delete("type");
        return prev;
      });
    }
    if (superTzSearch) {
      passQueryParamsToUrl(
        searchParams,
        setSearchParams,
        "tz_name",
        superTzSearch
      );
    } else {
      setSearchParams((prev) => {
        prev.delete("tz_name");
        return prev;
      });
    }
    isAuthorRef.current = isAuthor;
    typeRef.current = type;
    ownRef.current = own;
    draftRef.current = draft;
    tzSearchRef.current = superTzSearch;
  }, [page, isAuthor, type, own, draft, superTzSearch]);

  useEffect(() => {
    if (message?.id) {
      return navigate(`/tz/create/${message.id}`);
    }
  }, [message]);

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
    { value: "structure", label: t("super.7") },
    { value: "tz", label: t("super.8") },
  ];

  const optionOwner = [
    { value: true, label: t("super.2") },
    { value: false, label: t("filter.1") },
  ];

  const handleChange = (value, { owner, draft, type, id }) => {
    value === "structure"
      ? SuperTzGet({ owner: owner, draft: draft, type: type, id })
      : SuperAuthor({ owner: owner, draft: draft, type: type, id });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                    <img className={s.S_icon} src={search_icon} alt="Search" />
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
                        setType(value.value);
                      }}
                      className={s.selecttt}
                      options={options}
                      defaultValue={options.find(
                        (item) => item.value.toString() === type.toString()
                      )}
                    />
                  </div>
                  {orgParams?.name ===
                  localStorage.getItem("organizationName") ? (
                    <div>
                      <Select
                        placeholder={t("filter.1")}
                        onChange={(value) => {
                          setOwn(value.value);
                        }}
                        className={s.selecttt}
                        options={optionOwner}
                        defaultValue={optionOwner.find((item) => {
                          return item.value.toString() === own.toString();
                        })}
                      />
                    </div>
                  ) : null}
                  {own ? (
                    <div>
                      <Select
                        placeholder={t("filter.2")}
                        onChange={(value) => {
                          setDraft(value.value);
                        }}
                        className={s.selecttt}
                        options={optionsDraft}
                        defaultValue={optionsDraft.find((item) => {
                          return item.value.toString() === draft.toString();
                        })}
                      />
                    </div>
                  ) : null}
                  <div>
                    <Select
                      placeholder={t("super.7")}
                      onChange={(value) => {
                        // handleChange(value.value, {
                        //   id,
                        //   owner: own,
                        //   draft: draft,
                        //   type: type,
                        // });
                        setIsAuthor(value.value);
                      }}
                      className={s.selecttt}
                      options={optionsAuthor}
                      defaultValue={optionsAuthor.find(
                        (item) => item.value === isAuthor
                      )}
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
                                #{" "}
                                {setRowNumberForTz(superTz?.current_page, 8, i)}
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
                                  {isAuthor === "structure" ? (
                                    <>
                                      {!draft ? (
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
                                    </>
                                  ) : null}
                                  <button
                                    onClick={() => {
                                      DuplicateTz(tz?.id);
                                    }}
                                    className={s.lkmain_sect_crud_copy}
                                  >
                                    <img src={copyIcon} alt="Copy" />
                                  </button>
                                  <Link
                                    to={
                                      isAuthor === "structure"
                                        ? `/structure/edit/${tz?.id}`
                                        : `/tz/edit/${tz?.id}`
                                    }
                                  >
                                    <button
                                      className={s.lkmain_sect_crud_create}
                                    >
                                      <img src={createIcon} alt="Edit" />
                                    </button>
                                  </Link>
                                  {isAuthor === "tz" ? (
                                    <button
                                      className={s.lkmain_sect_crud_skacat}
                                    >
                                      <img
                                        src={skacatIcon}
                                        alt="Download"
                                        onClick={() => {
                                          dispatch(uploadPdf(tz?.id));
                                        }}
                                      />
                                    </button>
                                  ) : null}
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
                                            onClick={() => deleteTz(delId)}
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
                                    onClick={() => {
                                      DuplicateTz(tz?.id);
                                    }}
                                    className={s.lkmain_sect_crud_copy}
                                  >
                                    <img src={copyIcon} alt="Copy" />
                                  </button>
                                  <Link
                                    to={
                                      isAuthor === "tz"
                                        ? `/tz/view/${tz?.id}`
                                        : `/tz/preview/${tz?.id}`
                                    }
                                  >
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
                    {isAuthor === "structure" ? (
                      <SuperTzPagination
                        own={own}
                        draft={draft}
                        type={type}
                        paramsID={id}
                        superTz={superTz?.total_pages}
                        page={page}
                        setPage={setPage}
                      />
                    ) : (
                      <LkAvtorUserPagination
                        paramsID={id}
                        type={type}
                        own={own}
                        draft={draft}
                        superTz={superTz?.total_pages}
                        page={page}
                        setPage={setPage}
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
      )}
    </>
  );
};

export default SuperTzComp;
