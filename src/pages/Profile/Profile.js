import { Footer } from "rsuite";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import s from "../../components/LKavtorMain/LKMain.module.css";
import React, { useEffect, useState } from "react";
import date from "../../assets/icons/dateIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useNavigate } from "react-router-dom";
import search from "../../assets/icons/search.svg";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Loader from "../../components/Loader/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { setTzIdForFilling } from "../../pages/LKavtor/lkavtor_slice";
import { useSelector, useDispatch } from "react-redux";
import { deleteTz, fetchAllTzOfUser } from "./profile_slice";
import ProfilePagination from "../../Pagination/ProfilePagination";

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

export default function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //modal
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  //searchPanel
  const [searchText, setSearchText] = useState("");

  const { tz, loading, deletedTz } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchAllTzOfUser({ tz_name: searchText }));
  }, [deletedTz, searchText]);

  return (
    <>
      {loading && !tz?.id ? (
        <Loader />
      ) : (
        <>
          <UserNav />
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
                      type="text"
                      placeholder={t("content-site.3")}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {tz?.user_organization?.find((_, index) => index === 0)
                ?.paginated_results?.results?.length ? (
                <>
                  <div className={s.org_name_div}>
                    <h4>{tz?.name}</h4>
                    <h4>
                      {"№ "}
                      {tz?.user_organization[0]?.paginated_results?.count}
                    </h4>
                  </div>
                  <TableContainer component={Paper} classes={{ root: s.table }}>
                    {tz?.user_organization?.map((user) => (
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
                                  <p>{tz?.created_at?.slice(0, 10)}</p>
                                </span>{" "}
                              </TableCell>
                              <TableCell align="right">
                                <div className={s.lkmain_sect_crud}>
                                  {/* <button className={s.lkmain_sect_crud_copy}>
                                <img src={copyIcon} alt="Copy" />
                              </button> */}
                                  <button
                                    className={s.lkmain_sect_crud_create}
                                    onClick={() => {
                                      dispatch(setTzIdForFilling(tz?.id));
                                      if (!loading) {
                                        navigate("/createTz");
                                      }
                                    }}
                                  >
                                    <img src={createIcon} alt="Edit" />
                                  </button>
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
                                            className={s.shablon_delete_btn}
                                            onClick={() => {
                                              dispatch(deleteTz(tz?.id));
                                            }}
                                          >
                                            {t("btn.6")}
                                          </button>
                                        </div>
                                      </form>
                                    </Box>
                                  </Modal>
                                </div>
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
                    <ProfilePagination
                      superTz={
                        tz?.user_organization?.find((_, index) => index === 0)
                          ?.paginated_results?.total_pages
                      }
                      tz_name={searchText}
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
          <Footer />
        </>
      )}
    </>
  );
}
