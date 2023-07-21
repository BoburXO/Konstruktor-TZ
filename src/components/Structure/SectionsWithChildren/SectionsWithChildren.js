import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import s from "../Structure.module.css";
import m from "../../LKavtorMain/LKMain.module.css";
import pen from "../../../assets/icons/pen.svg";
import add from "../../../assets/icons/plus-add.svg";
import CreateNewSectionModal from "../CreateNewSectionModal/CreateNewSectionModal";
import CreateNewFieldModal from "../CreateNewFieldModal/CreateNewFieldModal";
import FieldPart from "./FieldPart";
import "../../../../node_modules/rsuite/Dropdown/styles/index.less";
import { deleteSubSection } from "../CreateNewSectionModal/section_slice";
import { Box, Modal } from "@mui/material";

const style_delete_modal = {
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

export default function SectionsWithChildren({ item }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //add sub to subsection
  const [openSubChildren, setOpenSubChildren] = useState(false);
  const handleOpenSubChildren = () => setOpenSubChildren(true);
  const handleCloseSubChildren = () => setOpenSubChildren(false);

  //updateSubChildren
  const [updateSubChildren, setUpdateSubChildren] = useState(false);
  const handleOpenUpdateSubChildren = () => setUpdateSubChildren(true);
  const handleCloseUpdateSubChildren = () => setUpdateSubChildren(false);

  //Field Modal
  const [openField, setOpenField] = useState(false);
  const handleOpenField = () => setOpenField(true);
  const handleCloseField = () => setOpenField(false);

  //deleteModal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const { structureAction } = useSelector((state) => state.structure);

  const handleDeleteSubSection = () => {
    dispatch(deleteSubSection(item?.id));
  };

  return (
    <div className={s.structure_right_contents_card_insidePunkt}>
      <span>
        <p>
          {t("struc5")} {item?.header_name}
        </p>
        {structureAction !== "review" ? (
          <div>
            <Link>
              <img
                src={pen}
                alt="Изменить"
                onClick={() => handleOpenUpdateSubChildren()}
              />
              <CreateNewSectionModal
                updatedData={item}
                section={item}
                parent={item?.parent}
                activeSectionModal="subsection"
                openSection={updateSubChildren}
                handleCloseSection={handleCloseUpdateSubChildren}
              />
            </Link>
            <Link>
              <img onClick={handleOpenField} src={add} alt="Add" />
              <CreateNewFieldModal
                openField={openField}
                handleCloseField={handleCloseField}
                item={item}
              />
            </Link>
            <Link>
              <i
                className="fa-solid fa-file-circle-plus"
                style={{ color: "gray", fontSize: "21px" }}
                onClick={handleOpenSubChildren}
              ></i>
              <CreateNewSectionModal
                section={item}
                parent={item?.id}
                activeSectionModal={"subsection"}
                openSection={openSubChildren}
                handleCloseSection={handleCloseSubChildren}
              />
            </Link>
            <Link>
              <i
                className="fa-regular fa-trash-can"
                style={{ color: "gray", fontSize: "21px" }}
                onClick={handleOpenDeleteModal}
              ></i>
              <Modal
                slotProps={{
                  backdrop: {
                    style: {
                      opacity: "0.4",
                      boxShadow: 24,
                    },
                  },
                }}
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style_delete_modal}>
                  <form
                    style={{ textAlign: "center" }}
                    className={m.createElementForm}
                  >
                    <h2>{t("sfera.3")}</h2>
                    <br />
                    <p>{t("sfera.6")}</p>
                    <br />
                    <div className={m.createElementFormBtns}>
                      {" "}
                      <button
                        type="button"
                        onClick={() => handleCloseDeleteModal()}
                        className={m.shablon_save_btn}
                      >
                        {t("btn.5")}
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteSubSection}
                        className={m.shablon_delete_btn}
                      >
                        {t("btn.6")}
                      </button>
                    </div>
                  </form>
                </Box>
              </Modal>
            </Link>
          </div>
        ) : null}
      </span>
      <p className={s.structure_right_contents_input_label}>{t("struc3")}</p>
      <br />
      {t("ru")}:
      <input
        type="text"
        value={item?.name_ru}
        className={s.structure_right_contents_input_punkt}
        readOnly
      />
      <br />
      <br />
      {t("uz")}:
      <input
        type="text"
        value={item?.name_uz}
        className={s.structure_right_contents_input_punkt}
        readOnly
      />
      <div className={s.structure_right_contents_input_polya_vvoda}>
        {item?.f_section?.map((field) => (
          <FieldPart field={field} key={field?.id} />
        ))}
      </div>
    </div>
  );
}
