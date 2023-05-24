import { Fragment, useMemo } from "react";
import s from "../Structure.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DrawTableWithValues from "../../DrawTableWithValues/DrawTableWithValues";

export default function FieldPart({ field }) {
  const { t } = useTranslation();
  const { classificators } = useSelector((state) => state.field);

  const activeClassificator = useMemo(() => {
    if (field?.select_type === 8) {
      return classificators?.results?.find(
        (classificator) => classificator?.id === field?.classificator
      );
    }
  }, [classificators]);

  return (
    <>
      {field?.select_type === 6 ? (
        <div>
          <p className={s.structure_right_contents_input_label}>Table</p>
          <div style={{ marginTop: "0px" }}>
            <p style={{ marginBottom: "10px" }}>{t("uz")}</p>
            <DrawTableWithValues
              fill={false}
              tableData={field?.json_data?.data_uz}
            />
          </div>
          <div>
            <p style={{ marginBottom: "10px" }}>{t("ru")}</p>
            <DrawTableWithValues
              fill={false}
              tableData={field?.json_data?.data_ru}
            />
          </div>
        </div>
      ) : (
        <>
          <p className={s.structure_right_contents_input_label}>
            {field?.select_type === 8 ? "Classificator" : t("struc4")}
          </p>
          <br />
          {t("ru")}:
          <input
            type="text"
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
            value={
              field?.select_type === 8
                ? activeClassificator?.title_uz
                : field?.field_name_uz
            }
            className={s.structure_right_contents_input_punkt}
          />
        </>
      )}
    </>
  );
}
