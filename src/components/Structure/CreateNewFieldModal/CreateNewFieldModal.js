import { Box, Modal } from "@mui/material";
import s from "../Structure.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewField,
  fetchAllClassificators,
  updateField,
} from "../CreateNewFieldModal/field_slice";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import backX from "../../../assets/icons/backX.svg";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { setDefaultTableWithoutValue } from "../../../helpers/helpers";
import DrawTableWithValues from "../../DrawTableWithValues/DrawTableWithValues";

export default function CreateNewFieldModal({
  openField,
  handleCloseField,
  item,
  beingUpdatedData,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { classificators, isFetchingClassificatorLoading } = useSelector(
    (state) => state.field
  );

  const [fieldType, setFieldType] = useState(
    beingUpdatedData?.select_type || ""
  );
  const [classificator, setClassificator] = useState({});
  const [fieldNameRu, setFieldNameRu] = useState(
    beingUpdatedData?.field_name_ru || ""
  );
  const [fieldNameUz, setFieldNameUz] = useState(
    beingUpdatedData?.field_name_uz || ""
  );

  //states for table
  const [tableCols, setTableCols] = useState(
    +beingUpdatedData?.json_data?.tableCols || 0
  );
  const [tableRaws, setTableRaws] = useState(
    +beingUpdatedData?.json_data?.tableRaws || 0
  );
  const [tableDataUz, setTableDataUz] = useState(
    beingUpdatedData?.json_data?.data_uz || []
  );
  const [tableDataRu, setTableDataRu] = useState(
    beingUpdatedData?.json_data?.data_ru || []
  );

  useEffect(() => {
    if (fieldType === 8) {
      dispatch(fetchAllClassificators());
    }
  }, [fieldType]);

  useEffect(() => {
    if (!beingUpdatedData?.id) {
      if (tableCols > 0 && tableRaws > 0) {
        setDefaultTableWithoutValue(tableRaws, tableCols, setTableDataRu);
        setDefaultTableWithoutValue(tableRaws, tableCols, setTableDataUz);
      }
    }
    // if (beingUpdatedData?.id && fieldType === 6) {
    //   if (tableCols > 0 && tableRaws > 0) {
    //     setDefaultTableWithoutValue(tableRaws, tableCols, setTableDataRu);
    //     setDefaultTableWithoutValue(tableRaws, tableCols, setTableDataUz);
    //   }
    // }
  }, [tableRaws, tableCols]);

  const fieldTypeOptions = [
    { value: 1, label: "255 symbol CHAR" },
    { value: 2, label: "text" },
    { value: 3, label: "int" },
    { value: 4, label: "email" },
    { value: 5, label: "date" },
    { value: 6, label: "table" },
    { value: 7, label: "image" },
    { value: 8, label: "classificator" },
  ];

  const classificatorOptions = useMemo(() => {
    return classificators?.results?.map((item) => ({
      value: item.id,
      label: item.title,
    }));
  }, [classificators]);

  const defaultClassificatorOptionIndex = useMemo(() => {
    return classificatorOptions?.findIndex(
      (item) => item.value === beingUpdatedData?.classificator
    );
  }, [classificatorOptions]);

  const handleSubmitNewField = () => {
    if (fieldType !== 8 && fieldType !== 6) {
      if (!fieldType || !fieldNameRu || !fieldNameUz) {
        return toast(t("field.unfilled"));
      }
    } else if (fieldType === 8) {
      if (!classificator) {
        return toast(t("unSelectedClass"));
      }
    }

    dispatch(
      createNewField(
        fieldType === 8
          ? {
              select_type: fieldType,
              section: item.id,
              classificator,
            }
          : {
              select_type: fieldType,
              field_name_ru: fieldNameRu,
              field_name_uz: fieldNameUz,
              section: item.id,
              classificator: fieldType !== 8 ? null : classificator,
              json_data:
                fieldType === 6
                  ? {
                      data_uz: tableDataUz,
                      data_ru: tableDataRu,
                      tableCols,
                      tableRaws,
                    }
                  : {},
            }
      )
    );
    setClassificator("");
    setFieldNameRu("");
    setFieldNameUz("");
    setFieldType(1);
  };

  const handleUpdateField = () => {
    if (fieldType !== 8 && fieldType !== 6) {
      if (!fieldType || !fieldNameRu || !fieldNameUz) {
        return toast(t("field.unfilled"));
      }
    } else if (fieldType === 8) {
      if (!classificator) {
        return toast(t("unSelectedClass"));
      }
    }

    dispatch(
      updateField({
        id: beingUpdatedData?.id,
        data:
          fieldType === 8
            ? {
                select_type: fieldType,
                classificator,
              }
            : fieldType === 6
            ? {
                json_data: {
                  data_uz: tableDataUz,
                  data_ru: tableDataRu,
                  tableCols,
                  tableRaws,
                },
              }
            : {
                select_type: fieldType,
                field_name_ru: fieldNameRu,
                field_name_uz: fieldNameUz,
              },
      })
    );
    setClassificator("");
    setFieldNameRu("");
    setFieldNameUz("");
    setFieldType(1);
  };

  return (
    <Modal
      open={openField}
      onClose={handleCloseField}
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
          width: 800,
        }}
      >
        <div className={s.create_structure_modal}>
          <h1>{t("field.name")}</h1>
          <p>{t("field.type")}</p>
          <Select
            onChange={(e) => setFieldType(e.value)}
            defaultValue={fieldTypeOptions[parseInt(fieldType) - 1]}
            options={fieldTypeOptions}
          />
          <p>{t("field.title")}</p>
          {isFetchingClassificatorLoading ? (
            "Loading..."
          ) : (
            <>
              {fieldType === 8 && classificators?.links ? (
                <>
                  {classificators.count > 0 ? (
                    <Select
                      onChange={(e) => setClassificator(e.value)}
                      options={classificatorOptions}
                      defaultValue={
                        classificatorOptions[defaultClassificatorOptionIndex]
                      }
                    />
                  ) : (
                    t("notFound")
                  )}
                </>
              ) : fieldType === 6 ? (
                <>
                  <div className={s.flex_names}>
                    <div>
                      {t("table.cols")}:
                      <input
                        type="number"
                        value={tableCols}
                        onChange={(e) => setTableCols(e.target.value)}
                        className={s.structure_right_contents_input_punkt}
                      />
                    </div>
                    <div>
                      {t("table.raws")}:
                      <input
                        type="number"
                        value={tableRaws}
                        onChange={(e) => setTableRaws(e.target.value)}
                        className={s.structure_right_contents_input_punkt}
                      />
                    </div>
                  </div>
                  <p style={{ marginTop: "40px" }}>{t("uz")}</p>
                  <DrawTableWithValues
                    defaultTable
                    tableData={tableDataUz}
                    setTableData={setTableDataUz}
                  />
                  <p style={{ marginTop: "10px" }}>{t("ru")}</p>
                  <DrawTableWithValues
                    defaultTable
                    tableData={tableDataRu}
                    setTableData={setTableDataRu}
                  />
                </>
              ) : (
                <div className={s.flex_names}>
                  <div>
                    {t("ru")}:
                    <input
                      type="text"
                      value={fieldNameRu}
                      onChange={(e) => setFieldNameRu(e.target.value)}
                      className={s.structure_right_contents_input_punkt}
                    />
                  </div>
                  <div>
                    {t("uz")}:
                    <input
                      type="text"
                      onChange={(e) => setFieldNameUz(e.target.value)}
                      value={fieldNameUz}
                      className={s.structure_right_contents_input_punkt}
                    />
                  </div>
                </div>
              )}
              <div className={s.structure_btns}>
                <button
                  onClick={handleCloseField}
                  className={s.structure_cancel_btn}
                >
                  {t("btn.5")}
                </button>
                <button
                  className={s.structure_save_btn}
                  onClick={() => {
                    if (beingUpdatedData?.id) {
                      handleUpdateField();
                    } else {
                      handleSubmitNewField();
                    }
                    handleCloseField();
                  }}
                >
                  {t("btn.4")}
                </button>
              </div>
            </>
          )}

          <img
            src={backX}
            className={s.structure_close_icon}
            onClick={handleCloseField}
            alt=""
          />
        </div>
      </Box>
    </Modal>
  );
}
