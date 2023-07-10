import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import s from "./CreateTZ1.module.css";
import DrawTableWithValues from "../DrawTableWithValues/DrawTableWithValues";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassificator,
  setFieldsData,
} from "../../redux/api/user/structure_slice";
import { useMemo } from "react";

export default function SectionsField({ field }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ref = useRef([]);
  const [tableData, setTableData] = useState(field?.json_data?.data_uz);

  const [charField, setCharField] = useState(field?.field || "");
  const [stringField, setStringField] = useState(field?.field || "");
  const [otherField, setOtherField] = useState(field?.field || "");
  const [classificatorElement, setClassificatorElement] = useState("");

  useEffect(() => {
    if (field?.select_type === 8) {
      dispatch(fetchClassificator());
    }
  }, []);

  useEffect(() => {
    if (field?.select_type === 6) {
      dispatch(
        setFieldsData({
          section_id: field?.section,
          field_id: field?.id,
          select_type: field?.select_type,
          json_data: { data_uz: tableData, data_ru: tableData },
        })
      );
    }
  }, [tableData]);

  const classificatorElemOptions = field?.classificator?.elements?.map(
    (item) => ({
      value: item?.content,
      label: item?.content,
    })
  );

  return (
    <>
      {field?.select_type === 1 ? (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <input
            required
            placeholder={`Введите ${field?.field_name}`}
            value={charField}
            tabIndex={0}
            onChange={(e) => {
              setCharField(e.target.value);
            }}
            onBlur={() => {
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  select_type: 1,
                  field_id: field?.id,
                  field_uz: charField,
                  field_ru: charField,
                })
              );
            }}
          />
        </div>
      ) : field?.select_type === 2 ? (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <textarea
            required
            placeholder={`Введите ${field?.field_name}`}
            value={stringField}
            onChange={(e) => {
              setStringField(e.target.value);
            }}
            onBlur={() => {
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  field_id: field?.id,
                  select_type: 2,
                  field_uz: stringField,
                  field_ru: stringField,
                })
              );
            }}
          ></textarea>
        </div>
      ) : field?.select_type === 6 ? (
        <div className={s.create1_form_card}>
          <p>{field?.json_data?.table_title_uz || "Jadval Nomi"}</p>
          <DrawTableWithValues
            tableData={tableData}
            setTableData={setTableData}
            userRole={"author"}
          />
        </div>
      ) : field?.select_type === 7 ? (
        "Image"
      ) : field?.select_type === 8 ? (
        <div className={s.create1_form_card}>
          <p>{field?.classificator?.title || "Jadval Nomi"}</p>
          <Select
            options={classificatorElemOptions}
            onChange={(e) => {
              setClassificatorElement(e.value);
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  select_type: 8,
                  field_id: field?.id,
                  field_uz: e.value,
                  field_ru: e.value,
                })
              );
            }}
            defaultValue={classificatorElemOptions.find(
              (item) => item.value === field?.field
            )}
          />
        </div>
      ) : (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <input
            required
            placeholder={`Введите ${field?.field_name}`}
            value={otherField}
            onChange={(e) => {
              setOtherField(e.target.value);
            }}
            onBlur={() => {
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  select_type: field.select_type,
                  field_id: field?.id,
                  field_uz: otherField,
                  field_ru: otherField,
                })
              );
            }}
          />
        </div>
      )}

      {/* <div className={s.create1_form_card_from_templates}>
        <p>{t("createtz22")}</p>
        <textarea required placeholder={t("createtz23")}></textarea>
      </div> */}
      {/* <br /> */}
    </>
  );
}
