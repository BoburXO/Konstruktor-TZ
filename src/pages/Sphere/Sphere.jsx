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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const Sphere = () => {
  const { sphere, getSphere, createSphere } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    getSphere();
  }, []);
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal
  return (
    <>
      <UserNav />
      <div className={s.reg_parent}>
        <div className={s.reg_user_roles}>
          {sphere.map((el) => {
            return <button key={el?.id}>{el.name_ru}</button>;
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
    </>
  );
};

export default Sphere;
