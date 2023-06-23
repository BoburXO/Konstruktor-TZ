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
  const [charField, setCharField] = useState("");
  const [stringField, setStringField] = useState("");
  const [otherField, setOtherField] = useState("");
  const [classificatorElement, setClassificatorElement] = useState("");
  const { classificator } = useSelector((state) => state.userStructure);

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
          json_data: { data_uz: tableData, data_ru: tableData },
        })
      );
    }
  }, [tableData]);

  const activeClassificator = useMemo(() => {
    if (field?.select_type === 8) {
      return classificator?.results?.find(
        (item) => item?.id === field?.classificator
      );
    }
  }, [classificator]);

  const classificatorElemOptions = activeClassificator?.elements?.map(
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
            ref={(el) => ref.current[1] === el}
            required
            placeholder={`Введите ${field?.field_name}`}
            value={charField || null}
            onChange={(e) => {
              setCharField(e.target.value);
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  field_id: field?.id,
                  field_uz: stringField,
                  field_ru: stringField,
                })
              );
            }}
          />
        </div>
      ) : field?.select_type === 2 ? (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <textarea
            ref={(el) => ref.current[0] === el}
            required
            placeholder={`Введите ${field?.field_name}`}
            value={stringField || null}
            onChange={(e) => {
              setStringField(e.target.value);
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  field_id: field?.id,
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
          <p>{activeClassificator?.title || "Jadval Nomi"}</p>
          <Select
            options={classificatorElemOptions}
            onChange={(e) => {
              setClassificatorElement(e.value);
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  field_id: field?.id,
                  field_uz: classificatorElement,
                  field_ru: classificatorElement,
                })
              );
            }}
          />
        </div>
      ) : (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <input
            ref={(el) => ref.current[1] === el}
            required
            placeholder={`Введите ${field?.field_name}`}
            value={otherField}
            onChange={(e) => {
              setOtherField(e.target.value);
              dispatch(
                setFieldsData({
                  section_id: field?.section,
                  field_id: field?.id,
                  field_uz: stringField,
                  field_ru: stringField,
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
