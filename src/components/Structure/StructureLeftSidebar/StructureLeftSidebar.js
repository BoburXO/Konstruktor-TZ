import { useTranslation } from "react-i18next";
import s from "../../Structure/Structure.module.css";
import { Dropdown } from "rsuite";
import { setCurrentSection } from "../CreateNewSectionModal/section_slice";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StructureLeftSidebar({ sections }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentSection } = useSelector((state) => state.section);

  const renderSectionsWithChildren = (sections) => {
    return (
      <>
        {sections?.map((section) => (
          <Fragment key={section?.id}>
            {section?.children?.length ? (
              <Dropdown
                className={s.structure_dropdown}
                title={`${section?.header_name} - ${section?.name}`}
                onOpen={() => {
                  if (!section.parent) {
                    if (section?.id !== currentSection?.id) {
                      dispatch(setCurrentSection(section));
                    }
                  }
                }}
              >
                {renderSectionsWithChildren(section.children)}
              </Dropdown>
            ) : (
              <div
                className={s.dropdown_without_child}
                onClick={() => {
                  if (!section.parent) {
                    if (section?.id !== currentSection?.id) {
                      dispatch(setCurrentSection(section));
                    }
                  }
                }}
              >
                <p>{section.header_name + " - " + section.name}</p>
              </div>
            )}
          </Fragment>
        ))}
      </>
    );
  };

  return (
    <div className={s.structure_left_siderbar}>
      <h2>{t("struc")}</h2>
      <br />
      <br />
      {currentSection?.id
        ? renderSectionsWithChildren(sections)
        : "Nothing here yet"}
    </div>
  );
}
