import React, { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Modal, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import s from "../Structure.module.css";
import Select from "react-select";

//asyncActions
import { createNewStructure, updateStructure } from "../structure_slice";

//icons
import backX from "../../../assets/icons/backX.svg";

export default function CreateNewStructureModal({
  openStructure,
  handleCloseStructure,
  updatedData,
}) {
  const dispatch = useDispatch();
  const { isCreatingStructuresLoading, structures } = useSelector(
    (state) => state.structure
  );
  const { t } = useTranslation();
  const [nameUz, setNameUz] = useState(updatedData?.tz_name_uz || "");
  const [nameRu, setNameRu] = useState(updatedData?.tz_name_ru || "");
  const [commentUz, setCommentUz] = useState(updatedData?.comment_uz || "");
  const [commentRu, setCommentRu] = useState(updatedData?.comment_ru || "");
  const [type, setType] = useState(updatedData?.select_type || 1);
  const selectTypeOptions = [
    { value: 1, label: "Site" },
    { value: 2, label: "System" },
  ];

  const handleSubmitNewStructure = () => {
    if (!nameUz || !nameRu || !commentRu || !commentUz) {
      return toast("Please fill out all empty spaces");
    }
    dispatch(
      createNewStructure({
        tz_name_uz: nameUz,
        tz_name_ru: nameRu,
        comment_uz: commentUz,
        comment_ru: commentRu,
        select_type: type,
        is_draft: false,
      })
    );
    setCommentRu("");
    setNameRu("");
    setNameUz("");
    setCommentUz("");
    setType(1);
    handleCloseStructure();
  };

  const handleUpdateCurrentStructure = () => {
    if (!nameUz || !nameRu || !commentRu || !commentUz) {
      return toast("Please fill out all empty spaces");
    }
    dispatch(
      updateStructure({
        id: structures?.id,
        data: {
          tz_name_uz: nameUz,
          tz_name_ru: nameRu,
          comment_uz: commentUz,
          comment_ru: commentRu,
          select_type: type,
          is_draft: false,
        },
      })
    );
    setCommentRu("");
    setNameRu("");
    setNameUz("");
    setCommentUz("");
    setType(1);
    handleCloseStructure();
  };

  return (
    <Modal
      slotProps={{
        backdrop: {
          style: { opacity: "0.3", boxShadow: 24 },
        },
      }}
      open={openStructure}
      onClose={handleCloseStructure}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
          <div className={s.flex_names}>
            <div>
              {t("ru")}:
              <input
                type="text"
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
                className={s.structure_right_contents_input_punkt}
              />
            </div>
            <div>
              {t("uz")}:
              <input
                type="text"
                value={nameUz}
                onChange={(e) => setNameUz(e.target.value)}
                className={s.structure_right_contents_input_punkt}
              />
            </div>
          </div>
          <p>Комментарий</p>
          {t("ru")}:
          <input
            type="text"
            value={commentRu}
            onChange={(e) => setCommentRu(e.target.value)}
            className={s.structure_right_contents_input_punkt}
          />
          <br />
          <br />
          {t("uz")}:
          <input
            type="text"
            value={commentUz}
            onChange={(e) => setCommentUz(e.target.value)}
            className={s.structure_right_contents_input_punkt}
          />
          <p>Тип</p>
          <Select
            onChange={(e) => setType(e.value)}
            options={selectTypeOptions}
            defaultValue={selectTypeOptions[type]}
          />
          <div className={s.structure_btns}>
            <button
              onClick={handleCloseStructure}
              className={s.structure_cancel_btn}
            >
              {t("btn.5")}
            </button>
            <button
              className={s.structure_save_btn}
              onClick={() => {
                if (updatedData?.id) {
                  handleUpdateCurrentStructure();
                } else {
                  handleSubmitNewStructure();
                }
              }}
            >
              {isCreatingStructuresLoading ? "Loading..." : t("btn.4")}
            </button>
          </div>
          <img
            src={backX}
            className={s.structure_close_icon}
            onClick={handleCloseStructure}
            alt=""
          />
        </div>
      </Box>
    </Modal>
  );
}
