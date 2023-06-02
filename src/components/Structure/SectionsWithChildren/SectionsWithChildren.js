import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import s from "../Structure.module.css";
import pen from "../../../assets/icons/pen.svg";
import add from "../../../assets/icons/plus-add.svg";
import addSub from "../../../assets/icons/addSub.png";
import CreateNewSectionModal from "../CreateNewSectionModal/CreateNewSectionModal";
import CreateNewFieldModal from "../CreateNewFieldModal/CreateNewFieldModal";
import FieldPart from "./FieldPart";
import SectionDropdown from "../../DropdownSection/DropdownSection";
import { Dropdown } from "rsuite";
import "../../../../node_modules/rsuite/Dropdown/styles/index.less";

export default function SectionsWithChildren({ item }) {
  const { t } = useTranslation();

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

  const subsectionHeader = useMemo(() => {});

  return (
    <div className={s.structure_right_contents_card_insidePunkt}>
      <span>
        <p>
          {t("struc5")} {item?.header_name}
        </p>
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
            ></i>
          </Link>
        </div>
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
