import { useRef } from "react";
import { useTranslation } from "react-i18next";
import s from "./CreateTZ1.module.css";

export default function SectionsField({ field }) {
  const { t } = useTranslation();
  const ref = useRef([]);
  return (
    <>
      {field?.select_type === 1 ? (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <input
            ref={(el) => ref.current[1] === el}
            required
            type="text"
            maxLength={15}
            placeholder={`Введите ${field?.field_name}`}
          />
        </div>
      ) : field?.select_type === 2 ? (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <textarea
            ref={(el) => ref.current[0] === el}
            required
            placeholder={`Введите ${field?.field_name}`}
          ></textarea>
        </div>
      ) : field?.select_type === 6 ? (
        "Table"
      ) : field?.select_type === 7 ? (
        "Image"
      ) : field?.select_type === 8 ? (
        "Classificator"
      ) : (
        <div className={s.create1_form_card}>
          <p>{field?.field_name}</p>
          <input
            ref={(el) => ref.current[1] === el}
            required
            type="text"
            maxLength={15}
            placeholder={`Введите ${field?.field_name}`}
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
