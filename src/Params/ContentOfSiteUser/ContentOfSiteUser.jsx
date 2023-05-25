import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import s from "../ContentOfSiteUser/ContentOfSiteUser.module.css";
import download from "../../assets/icons/skacatIcon.svg";
import { ImDownload } from "react-icons/im";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import JoditEditor from "jodit-react";

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

const ContentOfSiteUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getContentSearch, contentSearch, contentSite } = useContext(Context);
  const { slug } = useParams();
  const contentParams = contentSite?.results?.find((el) => {
    return el?.slug === slug;
  });

  const [pdfRu, setPdfRu] = useState("");
  const [pdfUz, setPdfUz] = useState("");

  const [downloadPdf, setDownloadPdf] = useState(false);
  const handleDownloadOpen = () => setDownloadPdf(true);
  const handleDownloadClose = () => setDownloadPdf(false);

  useEffect(() => {
    getContentSearch();
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, [contentSearch]);
  return (
    <>
      <UserNav />
      <div className={s.AddContent}>
        <div className={s.AddContent_container}>
          <div className={s.AddContent_labels}>
            <h1>{t("add-content.2")}</h1>
          </div>
          <div className={s.AddContent_parent}>
            <div className={s.AddContent_left}>
              <p>{t("add-content.3")}</p>
              <input defaultValue={contentParams?.header} type="text" />
              <div className={s.AddContent_sfera}>
                <p>{t("add-content.4")}</p>
                <br />
                <button className={s.active}>
                  {contentParams?.sphere?.name}
                </button>
              </div>
              <div className={s.AddContent_left_desc}>
                <p>{t("add-content.9")}</p>
                <input defaultValue={contentParams?.description} type="text" />
              </div>
              <p>{t("add-content.10")}</p>
              <br />
              <button
                onClick={() => {
                  handleDownloadOpen();
                  setPdfRu(contentParams?.doc_file_ru);
                  setPdfUz(contentParams?.doc_file_uz);
                }}
                className={s.content_crud_download}
              >
                <img src={download} alt="Download" />
              </button>
              <Modal
                slotProps={{
                  backdrop: {
                    style: { opacity: "0.7", boxShadow: 24 },
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
                          style={{ color: "#fff", fontSize: "18px" }}
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
                          style={{ color: "#fff", fontSize: "18px" }}
                        />
                      </a>
                    </div>
                  )}
                </Box>
              </Modal>
              <br />
              <br />
              <br />
              <JoditEditor
                valu={contentParams?.text}
                className={s.JoditEditor}
              />
              <br />
            </div>
            <div className={s.AddContent_right}>
              <h4>{t("add-content.14")}</h4>
              <input
                defaultValue={contentParams?.created_at.slice(0, 16)}
                type="datetime-local"
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className={s.back}>
          <button onClick={() => navigate(-1)} className={s.shablon_cancel_btn}>
            {t("btn.1")}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContentOfSiteUser;
