import { useTranslation } from "react-i18next";
import backX from "../../../assets/icons/backX.svg";
import { useState } from "react";
import { Box, Modal } from "@mui/material";
import s from "../Structure.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSection,
  createNewSubSection,
  updateSection,
  updateSubSection,
} from "../CreateNewSectionModal/section_slice";
import { toast } from "react-hot-toast";

export default function CreateNewSectionModal({
  updatedData,
  openSection,
  handleCloseSection,
  handleClose,
  activeSectionModal,
  parent,
  section,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { structures } = useSelector((state) => state.structure);

  const [headerName, setHeaderName] = useState(
    updatedData?.header_name_ru || ""
  );

  const [nameRu, setNameRu] = useState(updatedData?.name_ru || "");
  const [nameUz, setNameUz] = useState(updatedData?.name_uz || "");

  const handleSubmitNewSection = () => {
    if (!nameRu || !nameUz || !headerName) {
      return toast(t("field.unfilled"));
    }
    if (activeSectionModal === "section") {
      dispatch(
        createNewSection({
          header_name_ru: headerName,
          header_name_uz: headerName,
          name_ru: nameRu,
          name_uz: nameUz,
          result: structures?.id,
        })
      );
    } else {
      dispatch(
        createNewSubSection({
          header_name_ru: headerName,
          header_name_uz: headerName,
          name_ru: nameRu,
          name_uz: nameUz,
          result: structures?.id,
          parent,
        })
      );
    }
    setHeaderName("");
    setNameRu("");
    setNameUz("");
  };

  const handleUpdateSection = () => {
    if (!nameRu || !nameUz || !headerName) {
      return toast(t("field.unfilled"));
    }
    if (activeSectionModal === "section") {
      dispatch(
        updateSection({
          id: updatedData?.id,
          data: {
            header_name_ru: headerName,
            header_name_uz: headerName,
            name_ru: nameRu,
            name_uz: nameUz,
            result: structures?.id,
          },
        })
      );
    } else {
      dispatch(
        updateSubSection({
          id: updatedData?.id,
          data: {
            header_name_ru: headerName,
            header_name_uz: headerName,
            name_ru: nameRu,
            name_uz: nameUz,
            result: structures?.id,
            parent,
          },
        })
      );
    }
    setHeaderName("");
    setNameRu("");
    setNameUz("");
  };

  return (
    <Modal
      open={openSection}
      onClose={handleCloseSection}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "none",
          borderRadius: 4,
          boxShadow: 0,
          width: 1200,
        }}
      >
        <div className={s.create_structure_modal}>
          <h1>{t("section.name")}</h1>
          <p style={{ marginBottom: 0 }}>{t("section.number")}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                value={headerName}
                onChange={(e) => setHeaderName(e.target.value)}
                className={s.structure_right_contents_input_punkt}
              />
            </div>
          </div>
          <p>{t("section.title")}</p>
          {t("ru")}:
          <input
            type="text"
            value={nameRu}
            onChange={(e) => setNameRu(e.target.value)}
            className={s.structure_right_contents_input_punkt}
          />
          <br />
          <br />
          {t("uz")}:
          <input
            type="text"
            value={nameUz}
            onChange={(e) => setNameUz(e.target.value)}
            className={s.structure_right_contents_input_punkt}
          />
          <div className={s.structure_btns}>
            <button
              onClick={handleCloseSection}
              className={s.structure_cancel_btn}
            >
              {t("btn.5")}
            </button>
            <button
              className={s.structure_save_btn}
              onClick={() => {
                if (updatedData?.id) {
                  handleUpdateSection();
                } else {
                  handleSubmitNewSection();
                }
                handleCloseSection();
                if (handleClose) {
                  handleClose();
                }
              }}
            >
              {t("btn.4")}
            </button>
          </div>
          <img
            src={backX}
            className={s.structure_close_icon}
            onClick={handleCloseSection}
            alt=""
          />
        </div>
      </Box>
    </Modal>
  );
}
