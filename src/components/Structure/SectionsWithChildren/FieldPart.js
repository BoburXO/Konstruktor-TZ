import { Fragment, useMemo, useState } from "react";
import s from "../Structure.module.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import DrawTableWithValues from "../../DrawTableWithValues/DrawTableWithValues";
import editBtn from "../../../assets/icons/pen.svg";
import CreateNewFieldModal from "../CreateNewFieldModal/CreateNewFieldModal";
import { deleteField } from "../CreateNewFieldModal/field_slice";

export default function FieldPart({ field }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { classificators } = useSelector((state) => state.field);

  const [showUpdateFieldModal, setShowUpdateFieldModal] = useState(false);
  const hanldeOpenUpdateFieldModal = () => setShowUpdateFieldModal(true);
  const hanldeCloseUpdateFieldModal = () => setShowUpdateFieldModal(false);

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
            Table
            <div>
              <img
                src={editBtn}
                onClick={hanldeOpenUpdateFieldModal}
                alt="Edit icon"
              />
              <i
                className="fa-regular fa-trash-can"
                style={{
                  color: "grey",
                  fontSize: "21px",
                  marginLeft: "15px",
                  cursor: "pointer",
                }}
                onClick={handleDeleteField}
              ></i>
            </div>
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
            {field?.select_type === 8 ? "Classificator" : t("struc4")}
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
                onClick={handleDeleteField}
              ></i>
            </div>
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
