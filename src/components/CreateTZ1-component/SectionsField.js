import { useRef, useState } from "react";
import Select from "react-select";
import s from "./CreateTZ1.module.css";
import DrawTableWithValues from "../DrawTableWithValues/DrawTableWithValues";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFieldsData } from "../../redux/api/user/structure_slice";
import { useMemo } from "react";
import { validateEmail } from "../../helpers/helpers";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function SectionsField({ field }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const emailRef = useRef();

  const [tableData, setTableData] = useState(field?.json_data?.data_uz);

  const [charField, setCharField] = useState(field?.field || "");
  const [stringField, setStringField] = useState(field?.field || "");
  const [otherField, setOtherField] = useState(field?.field || "");
  const [classificatorElement, setClassificatorElement] = useState("");

  const { userAction } = useSelector((state) => state.userStructure);

  const fieldDisabled = useMemo(() => {
    return userAction === "view" || userAction === "review";
  }, [userAction]);

  // useEffect(() => {
  //   if (field?.select_type === 8) {
  //     dispatch(fetchClassificator());
  //   }
  // }, []);

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

  const classificatorElemOptions = useMemo(() => {
    return field?.classificator?.elements?.map((item) => ({
      value: item?.content,
      label: item?.content,
    }));
  }, [field?.classificator?.elements]);

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
            maxLength={255}
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
            disabled={fieldDisabled}
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
            disabled={fieldDisabled}
          ></textarea>
        </div>
      ) : field?.select_type === 6 ? (
        <div className={s.create1_form_card}>
          <p>{field?.json_data?.table_title_uz || "Jadval Nomi"}</p>
          <DrawTableWithValues
            tableData={tableData}
            setTableData={setTableData}
            userRole={"author"}
            allFieldsDisabled={fieldDisabled}
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
            isSearchable={!fieldDisabled}
            defaultValue={classificatorElemOptions?.find(
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
            ref={field?.select_type === 4 ? emailRef : null}
            type={
              field?.select_type === 3
                ? "number"
                : field?.select_type === 4
                ? "email"
                : field?.select_type === 5
                ? "date"
                : "input"
            }
            onChange={(e) => {
              setOtherField(e.target.value);
            }}
            onBlur={() => {
              if (field?.select_type === 4) {
                if (validateEmail(otherField)) {
                  dispatch(
                    setFieldsData({
                      section_id: field?.section,
                      select_type: field.select_type,
                      field_id: field?.id,
                      field_uz: otherField,
                      field_ru: otherField,
                    })
                  );
                } else {
                  toast.error(t("email.error"));
                  return emailRef.current.focus();
                }
              } else {
                dispatch(
                  setFieldsData({
                    section_id: field?.section,
                    select_type: field.select_type,
                    field_id: field?.id,
                    field_uz: otherField,
                    field_ru: otherField,
                  })
                );
              }
            }}
            disabled={fieldDisabled}
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
