import React, { useContext, useState } from "react";
import Footer from "../../components/Footer/Footer";
import s from "../Templates/Templates.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { Context } from "../../Context/Context";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Loader from "../../components/Loader/Loader";

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

const Template = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    sample,
    allSample,
    sampleDelete,
    updateSample,
    sampleUpdUz,
    setSampleUpdUz,
    sampleUpdRu,
    setSampleUpdRu,
  } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();
  const paramsFind = sample?.results?.find((el) => {
    return el?.id === id;
  });

  const { t } = useTranslation();

  React.useEffect(() => {
    if (localStorage.getItem("roleName") === "Author") {
      navigate("/");
    }
    allSample().then(() => setIsLoading(false));
    setSampleUpdRu(paramsFind?.description_ru);
    setSampleUpdUz(paramsFind?.description_uz);
  }, []);

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  if (isLoading) return <Loader />;
  return (
    <>
      <UserNav />
      <section className={s.templates_parent}>
        {sample?.count > 0 ? (
          <div className={s.templates_container}>
            <div className={s.templates_card}>
              <h1>
                {t("struc5")} {paramsFind?.section}
              </h1>
              <br />
              <span className={s.sample_parent}>
                <span>
                  <p>{t("ru")}:</p>
                  <br />
                  <textarea
                    value={sampleUpdRu}
                    onChange={(e) => setSampleUpdRu(e.target.value)}
                  ></textarea>
                </span>
                <span>
                  <p>{t("uz")}:</p>
                  <br />
                  <textarea
                    value={sampleUpdUz}
                    onChange={(e) => setSampleUpdUz(e.target.value)}
                  ></textarea>
                </span>
              </span>
            </div>
            <button className={s.Temp_back} onClick={() => navigate(-1)}>
              {t("btn.1")}
            </button>
            <button
              onClick={() => updateSample(paramsFind?.id)}
              className={s.Temp_update}
            >
              <img src={createIcon} alt="Update" />
            </button>
            <button onClick={() => handleOpenDel()} className={s.Temp_delete}>
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
                      onClick={() => sampleDelete(paramsFind?.id)}
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
          <h3 style={{ textAlign: "center", padding: "120px" }}>
            {t("toast404")}
          </h3>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Template;
