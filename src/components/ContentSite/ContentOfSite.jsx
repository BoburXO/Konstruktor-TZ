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
import { CiSquarePlus } from "react-icons/ci";
import Loader from "../Loader/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//modal styles
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
//modal styles
const ContentOfSite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPublish, setIsPublish] = useState("");
  const [spId, setSpId] = useState("");
  const [pdfRu, setPdfRu] = useState("");
  const [pdfUz, setPdfUz] = useState("");
  const [orgId, setOrgId] = useState("");

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
    getOrganizations,
    org,
  } = useContext(Context);

  useEffect(() => {
    getContentSearch({ id: spId, isPublish, orgId }).then(() =>
      setIsLoading(false)
    );
    getSphere().then(() => setIsLoading(false));
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

  if (isLoading) return <Loader />;

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
           {localStorage.getItem("roleName") === "SuperAdmin" ? (
             <div>
             <Select
               placeholder={t("filter.1")}
               onChange={(value) => {
                 getContentSearch({ orgId: value.value, id: spId, isPublish });
                 setOrgId(value.value);
               }}
               className={s.sample_select}
               options={[{ id: "", name: t("filter.1") }]
                 .concat(org)
                 .map((el) => ({
                   value: el?.id,
                   label: el?.name,
                 }))}
             />
           </div>
           ):null}
            {localStorage.getItem("roleName") !== "Author" ? (
              <div>
                <Select
                  placeholder={t("filter.4")}
                  onChange={(value) => {
                    setIsPublish(value.value);
                    getContentSearch({ isPublish: value.value, orgId });
                  }}
                  className={s.selecttt}
                  options={options}
                />
              </div>
            ) : null}
            <div>
              <Select
                placeholder={t("add-content.4")}
                onChange={(value) => {
                  getContentSearch({ id: value.value, isPublish, orgId });
                  setSpId(value.value);
                }}
                className={s.selecttt2}
                options={[{ id: "", name: t("filter.1") }]
                  ?.concat(sphere)
                  ?.map((el) => ({
                    value: el.id,
                    label: el.name,
                  }))}
              />
            </div>
            {localStorage.getItem("roleName") !== "Author" ? (
              <Link to="/sphere" className={s.sphere_content_craete}>
                <CiSquarePlus style={{ color: "#9a9797", fontSize: "35px" }} />
              </Link>
            ) : null}
          </div>
          <br />
          {contentSite?.results?.length > 0 ? (
            <TableContainer component={Paper} classes={{ root: s.table }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">{t("content-site.4")}</TableCell>
                    <TableCell align="left">{t("content-site.5")}</TableCell>
                    <TableCell align="left">{t("content-site.6")}</TableCell>
                    <TableCell align="left">{t("content-site.7")}</TableCell>
                    <TableCell align="right">{t("content-site.8")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody classes={{ root: s.tbody_root }}>
                  {contentSite?.results?.map((el) => (
                    <TableRow
                      key={el.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {" "}
                        {el.header.length > 25 ? (
                          <b>
                            {el.header.slice(0, 25)}
                            {"..."}
                          </b>
                        ) : (
                          <b>{el.header}</b>
                        )}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <p className={s.sphere}>
                          {el?.sphere?.name === undefined || null
                            ? "..."
                            : el?.sphere?.name}
                        </p>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <p className={s.Content_description}>
                          {!el?.description
                            ? "..."
                            : el?.description?.slice(0, 70)}
                        </p>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span className={s.content_dates}>
                          <img src={date} alt="" />
                          <p>{el.created_at.slice(0, 10)}</p>
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {localStorage.getItem("roleName") !== "Author" ? (
                          <div className={s.content_crud}>
                            {localStorage.getItem("roleUserName") ===
                            el?.user?.username ? (
                              <>
                                <Link to={`/updateContent/${el?.id}`}>
                                  <button className={s.content_crud_create}>
                                    <img src={createIcon} alt="Copy" />
                                  </button>
                                </Link>
                                <button
                                  onClick={() => {
                                    handleDownloadOpen();
                                    setPdfRu(el?.doc_file_ru);
                                    setPdfUz(el?.doc_file_uz);
                                  }}
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
                                    {!pdfRu || !pdfUz ? (
                                      <h2
                                        style={{
                                          textAlign: "center",
                                          paddingTop: "25px",
                                        }}
                                      >
                                        {t("toast404")}
                                      </h2>
                                    ) : (
                                      <div className={s.download_modal}>
                                        <a
                                          rel="noopener"
                                          href={pdfRu}
                                          download
                                          target="_blank"
                                          className={s.download_ru}
                                        >
                                          <p>{t("ru")}:</p>
                                          <ImDownload
                                            style={{
                                              color: "#fff",
                                              fontSize: "18px",
                                            }}
                                          />
                                        </a>
                                        <a
                                          rel="noopener"
                                          href={pdfUz}
                                          download
                                          target="_blank"
                                          className={s.download_ru}
                                        >
                                          <p>{t("uz")}:</p>
                                          <ImDownload
                                            style={{
                                              color: "#fff",
                                              fontSize: "18px",
                                            }}
                                          />
                                        </a>
                                      </div>
                                    )}
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
                              </>
                            ) : (
                              <>
                                <Link to={`/content-of-site-index/${el?.slug}`}>
                                  <button className={s.content_crud_create}>
                                    <FaEye
                                      style={{
                                        color: "#2f80ed",
                                        fontSize: "16px",
                                      }}
                                    />
                                  </button>
                                </Link>
                                <button
                                  onClick={() => {
                                    handleDownloadOpen();
                                    setPdfRu(el?.doc_file_ru);
                                    setPdfUz(el?.doc_file_uz);
                                  }}
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
                                    {!pdfRu || !pdfUz ? (
                                      <h2
                                        style={{
                                          textAlign: "center",
                                          paddingTop: "25px",
                                        }}
                                      >
                                        {t("toast404")}
                                      </h2>
                                    ) : (
                                      <div className={s.download_modal}>
                                        <a
                                          rel="noopener"
                                          href={pdfRu}
                                          download
                                          target="_blank"
                                          className={s.download_ru}
                                        >
                                          <p>{t("ru")}:</p>
                                          <ImDownload
                                            style={{
                                              color: "#fff",
                                              fontSize: "18px",
                                            }}
                                          />
                                        </a>
                                        <a
                                          rel="noopener"
                                          href={pdfUz}
                                          download
                                          target="_blank"
                                          className={s.download_ru}
                                        >
                                          <p>{t("uz")}:</p>
                                          <ImDownload
                                            style={{
                                              color: "#fff",
                                              fontSize: "18px",
                                            }}
                                          />
                                        </a>
                                      </div>
                                    )}
                                  </Box>
                                </Modal>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className={s.content_crud}>
                            <button
                              onClick={() => {
                                handleDownloadOpen();
                                setPdfRu(el?.doc_file_ru);
                                setPdfUz(el?.doc_file_uz);
                              }}
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
                                {!pdfRu || !pdfUz ? (
                                  <h2
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "25px",
                                    }}
                                  >
                                    {t("toast404")}
                                  </h2>
                                ) : (
                                  <div className={s.download_modal}>
                                    <a
                                      rel="noopener"
                                      href={pdfRu}
                                      download
                                      target="_blank"
                                      className={s.download_ru}
                                    >
                                      <p>{t("ru")}:</p>
                                      <ImDownload
                                        style={{
                                          color: "#fff",
                                          fontSize: "18px",
                                        }}
                                      />
                                    </a>
                                    <a
                                      rel="noopener"
                                      href={pdfUz}
                                      download
                                      target="_blank"
                                      className={s.download_ru}
                                    >
                                      <p>{t("uz")}:</p>
                                      <ImDownload
                                        style={{
                                          color: "#fff",
                                          fontSize: "18px",
                                        }}
                                      />
                                    </a>
                                  </div>
                                )}
                              </Box>
                            </Modal>
                            <Link to={`/content-of-site-index/${el?.slug}`}>
                              <button className={s.content_crud_create}>
                                <FaEye
                                  style={{ color: "#2f80ed", fontSize: "16px" }}
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
          ) : (
            <>
              <h1 className={s.notFound}>{t("toast404")}</h1>
            </>
          )}
          <br />
          <br />
          <div className={s.content_pagination}>
            <ContentPagination
              spId={spId}
              orgId={orgId}
              isPublish={isPublish}
              contentSite={contentSite?.total_pages}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentOfSite;
