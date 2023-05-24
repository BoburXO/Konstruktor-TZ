import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import s from "../Structure.module.css";
import pen from "../../../assets/icons/pen.svg";
import add from "../../../assets/icons/plus-add.svg";
import addSub from "../../../assets/icons/addSub.png";
import CreateNewSectionModal from "../CreateNewSectionModal/CreateNewSectionModal";
import CreateNewFieldModal from "../CreateNewFieldModal/CreateNewFieldModal";
import FieldPart from "./FieldPart";

export default function SectionsWithChildren({ item }) {
  const { t } = useTranslation();

  //add sub to subsection
  const [openSubChildren, setOpenSubChildren] = useState(false);
  const handleOpenSubChildren = () => setOpenSubChildren(true);
  const handleCloseSubChildren = () => setOpenSubChildren(false);

  //Field Modal
  const [openField, setOpenField] = useState(false);
  const handleOpenField = () => setOpenField(true);
  const handleCloseField = () => setOpenField(false);

  return (
    <div className={s.structure_right_contents_card_insidePunkt} key={item?.id}>
      <span>
        <p>
          {t("struc5")} {item?.header_name}
        </p>
        <div>
          <Link>
            <img src={pen} alt="Изменить" />
          </Link>
          <Link>
            <img onClick={handleOpenField} src={add} alt="Add" />
          </Link>
          <Link>
            <img
              src={addSub}
              style={{ height: "24px" }}
              alt="Add subsection"
              onClick={handleOpenSubChildren}
            />
          </Link>
          <CreateNewSectionModal
            section={item}
            parent={item?.id}
            activeSectionModal={"subsection"}
            openSection={openSubChildren}
            handleCloseSection={handleCloseSubChildren}
          />
          <CreateNewFieldModal
            openField={openField}
            handleCloseField={handleCloseField}
            item={item}
          />
        </div>
      </span>
      <p className={s.structure_right_contents_input_label}>{t("struc3")}</p>
      <br />
      {t("ru")}:
      <input
        type="text"
        value={item?.name_ru}
        className={s.structure_right_contents_input_punkt}
      />
      <br />
      <br />
      {t("uz")}:
      <input
        type="text"
        value={item?.name_uz}
        className={s.structure_right_contents_input_punkt}
      />
      <div className={s.structure_right_contents_input_polya_vvoda}>
        {item?.f_section?.map((field) => (
          <FieldPart field={field} key={item?.id} />
        ))}
      </div>
    </div>
  );
}
