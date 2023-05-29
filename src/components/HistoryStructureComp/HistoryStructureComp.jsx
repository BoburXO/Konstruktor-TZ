import React, { useContext, useEffect, useState } from "react";
import s from "../HistoryStructureComp/historyStructure.module.css";
import search from "../../assets/icons/search.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import date from "../../assets/icons/dateIcon.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import skacatIcon from "../../assets/icons/skacatIcon.svg";
import Loader from "../Loader/Loader";
import HistoryStructurePagination from "../../Pagination/HistoryStructurePagination";

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

const HistoryStructureComp = () => {
  const [isLoading, setIsLoading] = useState(true);
  //modal
  const [delId, setDelId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  //modal

  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isDraftFalse,
    getIsDraftFalse,
    setIsDraftSearch,
    iseDraftSearch,
    deleteTz,
  } = useContext(Context);

  useEffect(() => {
    getIsDraftFalse().then(() => setIsLoading(false));
  }, [iseDraftSearch]);

  if (isLoading) return <Loader />;
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
                  onChange={(e) => setIsDraftSearch(e.target.value)}
                  type="text"
                  placeholder={t("content-site.3")}
                />
              </div>
            </div>
            <button
              onClick={() => navigate("/createtz")}
              className={s.lkmain_sect_create_btn}
            >
              <span style={{ fontSize: "25px" }}>+</span>
              <span>{t("lkavtor1")}</span>
            </button>
          </div>
          <div className={s.lkmain_sect_creators_labels}>
            <p style={{ width: "3%" }}>ID</p>
            <p style={{ width: "55%" }}>{t("lkavtor2")}</p>
            <p style={{ width: "27%" }}>{t("lkavtor3")}</p>
            <p style={{ width: "7%" }}>{t("lkavtor4")}</p>
          </div>
          <div className={s.lkmain_sect_creators_parent}>
            {isDraftFalse?.results?.length > 1 ? (
              isDraftFalse?.results?.map((el) => {
                return (
                  <div
                    className={s.lkmain_sect_creators_parent_card}
                    key={el.id}
                  >
                    <p style={{ width: "3%" }}>#{el?.row_number}</p>
                    <p style={{ width: "55%" }}>{el?.tz_name}</p>
                    <span
                      style={{ width: "20%" }}
                      className={s.lkmain_sect_dates}
                    >
                      <img src={date} alt="" />
                      <p>{el?.created_at}</p>
                    </span>
                    <div className={s.lkmain_sect_crud}>
                      <button className={s.lkmain_sect_crud_copy}>
                        <img src={copyIcon} alt="Copy" />
                      </button>
                      <Link to={`/lkavtor/${el.id}/`}>
                        <button className={s.lkmain_sect_crud_create}>
                          <img src={createIcon} alt="Copy" />
                        </button>
                      </Link>
                      <button className={s.lkmain_sect_crud_skacat}>
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
                            style: { opacity: "0.3", boxShadow: 24 },
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
                  </div>
                );
              })
            ) : (
              <h1 className={s.notFound}>{t("toast404")}</h1>
            )}
          </div>
          <br />
          <br />
          <div className={s.content_pagination}>
            <HistoryStructurePagination isDraftFalse={isDraftFalse?.total_pages} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HistoryStructureComp;
