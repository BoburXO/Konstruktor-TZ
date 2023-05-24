import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import pen from "../../../assets/icons/pen.svg";
import backX from "../../../assets/icons/backX.svg";
import { useEffect, useMemo, useState } from "react";
import { Box, Modal } from "@mui/material";
import s from "../Structure.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSection,
  createNewSubSection,
} from "../CreateNewSectionModal/section_slice";
import { toast } from "react-hot-toast";

export default function CreateNewSectionModal({
  openSection,
  handleCloseSection,
  handleClose,
  activeSectionModal,
  parent,
  section,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentStructure, structures } = useSelector(
    (state) => state.structure
  );
  const [nameRu, setNameRu] = useState("");
  const [nameUz, setNameUz] = useState("");

  const punktHeader = () => {
    if (activeSectionModal === "section") {
      return !structures?.sections?.length
        ? 1
        : structures?.sections?.length + 1;
    } else {
      return !section?.children?.length
        ? `${section?.header_name_uz}.1`
        : `${section?.header_name_uz}.${section?.children?.length + 1}`;
    }
  };

  const handleSubmitNewSection = () => {
    if (!nameRu || !nameUz) {
      return toast("Please fill out all the required fields!");
    }
    if (activeSectionModal === "section") {
      dispatch(
        createNewSection({
          header_name_ru: punktHeader(),
          header_name_uz: punktHeader(),
          name_ru: nameRu,
          name_uz: nameUz,
          result: currentStructure?.id,
        })
      );
    } else {
      dispatch(
        createNewSubSection({
          header_name_ru: punktHeader(),
          header_name_uz: punktHeader(),
          name_ru: nameRu,
          name_uz: nameUz,
          result: currentStructure?.id,
          parent,
        })
      );
    }
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
          <h1>Название технического задания</h1>
          <p>Заголовок</p>
          <p>{`Punkt ${punktHeader()}`}</p>
          <p>Комментарий</p>
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
                handleSubmitNewSection();
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
