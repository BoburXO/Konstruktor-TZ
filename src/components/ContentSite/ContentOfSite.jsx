import React, { useContext, useEffect, useState } from "react";
import s from "../ContentSite/ContentOfSite.module.css";
import search from "../../assets/icons/search.svg";
import date from "../../assets/icons/dateIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import download from "../../assets/icons/skacatIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Context } from "../../Context/Context";
import ContentPagination from "../../Pagination/ContentPagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FaEye } from "react-icons/fa";
import { ImDownload } from "react-icons/im";
import {TbSquareRoundedPlus} from 'react-icons/tb'

const style_pdf = {
  width: 420,
  height: 140,
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

const ContentOfSite = () => {
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

  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    getContentSearch,
    contentSite,
    contentSearch,
    setContentSearch,
    deleteContent,
    getSphere,
    sphere,
    getContentIsPublish,
    getContentSphereFilter,
  } = useContext(Context);

  useEffect(() => {
    getContentSearch();
    getSphere();
  }, [contentSearch]);

  const options = [
    { value: "", label: t("filter.1") },
    { value: true, label: t("filter.2") },
    { value: false, label: t("filter.3") },
  ];

  //modal
  const [delId, setDelId] = useState("");
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const [downloadPdf, setDownloadPdf] = useState(false);
  const handleDownloadOpen = () => setDownloadPdf(true);
  const handleDownloadClose = () => setDownloadPdf(false);
  //modal

  return (
    <>
      <section className={s.content_of_site}>
        <div className={s.content_of_site_container}>
          <div className={s.content_of_site_label}>
            <h1>{t("content-site.1")}</h1>
            {localStorage.getItem("roleName") !== "Author" ? (
              <button
                onClick={() => navigate("/addcontent")}
                className={s.content_of_site_label_btn}
              >
                <span style={{ fontSize: "25px" }}>+</span>
                <span>{t("content-site.2")}</span>
              </button>
            ) : null}
          </div>
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
                onChange={(e) => setContentSearch(e.target.value)}
                type="text"
                placeholder={t("content-site.3")}
              />
            </div>
            <div>
              <Select
                placeholder={t("filter.4")}
                onChange={(value) => getContentIsPublish(value.value)}
                className={s.selecttt}
                options={options}
              />
            </div>
            <div>
              <Select
                placeholder={t("add-content.4")}
                onChange={(value) => getContentSphereFilter(value.value)}
                className={s.selecttt2}
                options={sphere.map((el) => ({
                  value: el.id,
                  label: el.name_ru,
                }))}
              />
            </div>
            <Link to="/sphere" className={s.sphere_content_craete}>
              <TbSquareRoundedPlus  style={{ color: "#9a9797", fontSize: "22px" }}/>
            </Link>
          </div>
          <div className={s.content_db_labels}>
            <p style={{ textAlign: "start" }}>{t("content-site.4")}</p>
            <p style={{ textAlign: "start" }}>{t("content-site.5")}</p>
            <p style={{ textAlign: "start" }}>{t("content-site.6")}</p>
            <p style={{ textAlign: "end" }}>{t("content-site.7")}</p>
            <p style={{ textAlign: "end" }}>{t("content-site.8")}</p>
          </div>
          <div className={s.content_parent}>
            {contentSite.count === 0 ? (
              <h1 className={s.notFound}>{t("toast404")}</h1>
            ) : (
              contentSite?.results?.map((el, index) => {
                return (
                  <div className={s.content_parent_card} key={index}>
                    <p>
                      <b>{el.header_ru}</b>
                    </p>
                    <p className={s.sphere}>
                      {el?.sphere?.name_ru === undefined || null
                        ? "--"
                        : el?.sphere?.name_ru}
                    </p>
                    <p className={s.Content_description}>
                      {el?.description_ru === null || undefined
                        ? "--"
                        : el?.description_ru?.slice(0, 40)}
                    </p>
                    <span className={s.content_dates}>
                      <img src={date} alt="" />
                      <p>{el.created_at.slice(0, 10)}</p>
                    </span>
                    {localStorage.getItem("roleName") !== "Author" ? (
                      <div className={s.content_crud}>
                        <Link to={`/updateContent/${el?.slug}`}>
                          <button className={s.content_crud_create}>
                            <img src={createIcon} alt="Copy" />
                          </button>
                        </Link>
                        <button
                          onClick={handleDownloadOpen}
                          className={s.content_crud_download}
                        >
                          <img src={download} alt="Download" />
                        </button>
                        <Modal
                          slotProps={{
                            backdrop: {
                              style: { opacity: "0.3", boxShadow: 24 },
                            },
                          }}
                          open={downloadPdf}
                          onClose={handleDownloadClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style_pdf}>
                            <div className={s.download_modal}>
                              <a
                                rel="noopener"
                                href={el?.doc_file_ru}
                                download
                                target="_blank"
                                className={s.download_ru}
                              >
                                <p>{t("ru")}:</p>
                                <ImDownload
                                  style={{ color: "#fff", fontSize: "18px" }}
                                />
                              </a>
                              <a
                                rel="noopener"
                                href={el?.doc_file_uz}
                                download
                                target="_blank"
                                className={s.download_ru}
                              >
                                <p>{t("uz")}:</p>
                                <ImDownload
                                  style={{ color: "#fff", fontSize: "18px" }}
                                />
                              </a>
                            </div>
                          </Box>
                        </Modal>
                        <button
                          onClick={() => {
                            handleOpenDel();
                            setDelId(el?.slug);
                          }}
                          className={s.content_crud_delete}
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
                                  onClick={() => deleteContent(delId)}
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
                      <div className={s.content_crud}>
                        <button className={s.content_crud_download}>
                          <a
                            rel="noopener"
                            href={el?.doc_file}
                            download
                            target="_blank"
                          >
                            <img src={download} alt="Download" />
                          </a>
                        </button>
                        <Link to={`/content-of-site-index/${el?.slug}`}>
                          <button className={s.content_crud_create}>
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
          <div className={s.content_pagination}>
            <ContentPagination contentSite={contentSite?.total_pages} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentOfSite;
