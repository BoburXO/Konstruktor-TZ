import React, { useContext } from "react";
import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import s from "../Sphere/sphere.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import createIcon from "../../assets/icons/createIcon.svg";

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

const Sphere = () => {
  const {
    sphere,
    getSphere,
    createSphere,
    deleteSphere,
    editSphere,
    modalData,
    setModalData,
    sphereEditRu,
    setSphereEditRu,
    sphereEditUz,
    setSphereEditUz,
    contentSite,
    getContentSearch,
  } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    getSphere();
    getContentSearch();
  }, []);
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = (sphere) => {
    setOpen1(true);
    setModalData(sphere);
    setSphereEditUz(sphere.name_uz);
    setSphereEditRu(sphere.name_ru);
  };
  const handleClose1 = () => setOpen1(false);

  const [openWarn, setOpenWarn] = React.useState(false);
  const handleOpenWarn = () => setOpenWarn(true);
  const handleCloseWarn = () => setOpenWarn(false);

  const [openDel, setOpenDel] = React.useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  const [sphereId, setSphereId] = React.useState("");
  //modal

  const handleClick = (id) => {
    if (
      contentSite?.results?.find((item) => {
        return item?.sphere?.id === id;
      })
    ) {
      handleOpenWarn();
    } else {
      handleOpenDel();
    }
  };

  return (
    <>
      <UserNav />
      <div className={s.reg_parent}>
        <div className={s.reg_user_roles}>
          {sphere.map((el) => {
            return (
              <div key={el.id} className={s.lkmain_sect_crud}>
                <button key={el?.id}>{el.name_ru}</button>
                <button
                  onClick={() => {
                    handleClick(el.id);
                    setSphereId(el?.id);
                  }}
                  className={s.sphere_crud_delete}
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
                          onClick={() => deleteSphere(sphereId)}
                          className={s.shablon_delete_btn}
                        >
                          {t("btn.6")}
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
                <button
                  onClick={() => handleOpen1(el)}
                  className={s.sphere_crud_create}
                >
                  <img src={createIcon} alt="Copy" />
                </button>
                <Modal
                  slotProps={{
                    backdrop: {
                      style: { opacity: "0.3", boxShadow: 24 },
                    },
                  }}
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form className={s.createElementForm}>
                      <h2>{t("sfera.2")}</h2>
                      <br />
                      <input
                        value={sphereEditUz}
                        onChange={(e) => setSphereEditUz(e.target.value)}
                        type="text"
                      />
                      <br />
                      <input
                        disabled={!sphereEditUz}
                        value={sphereEditRu}
                        onChange={(e) => setSphereEditRu(e.target.value)}
                        type="text"
                      />
                      <br />
                      <div className={s.createElementFormBtns}>
                        {" "}
                        <button
                          onClick={() => handleClose1()}
                          className={s.shablon_cancel_btn}
                        >
                          {t("btn.5")}
                        </button>
                        <button
                          type="button"
                          disabled={!sphereEditRu}
                          onClick={() => editSphere(modalData?.id)}
                          className={s.shablon_save_btn}
                        >
                          {t("btn.4")}
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
      <div className={s.createElement}>
        <button onClick={handleOpen}>+</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={createSphere} className={s.createElementForm}>
              <h2>{t("sfera.1")}</h2>
              <br />
              <input required type="text" placeholder={t("uz")} />
              <br />
              <input required type="text" placeholder={t("ru")} />
              <br />
              <div className={s.createElementFormBtns}>
                {" "}
                <button
                  onClick={() => handleClose()}
                  className={s.shablon_cancel_btn}
                >
                  {t("btn.5")}
                </button>
                <button type="submit" className={s.shablon_save_btn}>
                  {t("btn.4")}
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <Footer />
      <Modal
        open={openWarn}
        onClose={handleCloseWarn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={{ textAlign: "center" }} className={s.createElementForm}>
            <h2>{t("sfera.3")}</h2>
            <br />
            <p>{t("sfera.5")}</p>
            <br />
            <div className={s.createElementFormBtns}>
              {" "}
              <button
                onClick={() => handleCloseWarn()}
                className={s.shablon_save_btn}
              >
                {t("sfera.4")}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Sphere;
