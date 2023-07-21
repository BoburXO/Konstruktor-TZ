import { Fragment, useMemo, useState } from "react";
import s from "../Structure.module.css";
import m from "../../LKavtorMain/LKMain.module.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import DrawTableWithValues from "../../DrawTableWithValues/DrawTableWithValues";
import editBtn from "../../../assets/icons/pen.svg";
import CreateNewFieldModal from "../CreateNewFieldModal/CreateNewFieldModal";
import { deleteField } from "../CreateNewFieldModal/field_slice";
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

export default function FieldPart({ field }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { classificators } = useSelector((state) => state.field);
  const { structureAction } = useSelector((state) => state.structure);

  const [showUpdateFieldModal, setShowUpdateFieldModal] = useState(false);
  const hanldeOpenUpdateFieldModal = () => setShowUpdateFieldModal(true);
  const hanldeCloseUpdateFieldModal = () => setShowUpdateFieldModal(false);

  //deleteModal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const activeClassificator = useMemo(() => {
    if (field?.select_type === 8) {
      return classificators?.results?.find(
        (classificator) => classificator?.id === field?.classificator
      );
    }
  }, [classificators]);

  const handleDeleteField = () => {
    dispatch(deleteField(field?.id));
  };

  return (
    <>
      {field?.select_type === 6 ? (
        <div>
          <p className={s.structure_right_contents_input_label}>
            {t("table")}
            {structureAction !== "review" ? (
              <div>
                <img
                  src={editBtn}
                  onClick={hanldeOpenUpdateFieldModal}
                  alt="Edit icon"
                />
                <CreateNewFieldModal
                  openField={showUpdateFieldModal}
                  handleCloseField={hanldeCloseUpdateFieldModal}
                  item={field}
                  beingUpdatedData={field}
                />
                <i
                  className="fa-regular fa-trash-can"
                  style={{
                    color: "grey",
                    fontSize: "21px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
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
                          onClick={handleDeleteField}
                          className={m.shablon_delete_btn}
                        >
                          {t("btn.6")}
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
            ) : null}
          </p>
          <div style={{ marginTop: "10px" }}>
            <p style={{ marginBottom: "10px" }}>{t("ru")}:</p>
            <DrawTableWithValues
              fill={false}
              tableData={field?.json_data?.data_ru}
            />
          </div>
          <div>
            <p style={{ marginBottom: "10px" }}>{t("uz")}:</p>
            <DrawTableWithValues
              fill={false}
              tableData={field?.json_data?.data_uz}
            />
          </div>
        </div>
      ) : (
        <>
          <p className={s.structure_right_contents_input_label}>
            {field?.select_type === 8 ? t("Classificator") : t("struc4")}
            {structureAction !== "review" ? (
              <div>
                <img
                  src={editBtn}
                  onClick={hanldeOpenUpdateFieldModal}
                  alt="Edit icon"
                />
                <i
                  className="fa-regular fa-trash-can"
                  style={{
                    color: "gray",
                    fontSize: "21px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
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
                          onClick={handleDeleteField}
                          className={m.shablon_delete_btn}
                        >
                          {t("btn.6")}
                        </button>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>
            ) : null}
          </p>
          <br />
          {t("ru")}:
          <input
            type="text"
            readOnly
            value={
              field?.select_type === 8
                ? activeClassificator?.title_ru
                : field?.field_name_ru
            }
            className={s.structure_right_contents_input_punkt}
          />
          <br />
          <br />
          {t("uz")}:
          <input
            type="text"
            readOnly
            value={
              field?.select_type === 8
                ? activeClassificator?.title_uz
                : field?.field_name_uz
            }
            className={s.structure_right_contents_input_punkt}
          />
        </>
      )}
      <CreateNewFieldModal
        openField={showUpdateFieldModal}
        handleCloseField={hanldeCloseUpdateFieldModal}
        item={field}
        beingUpdatedData={field}
      />
    </>
  );
}
