import { useTranslation } from "react-i18next";
import s from "./StructureLeftSidebar.module.css";
import { Dropdown } from "rsuite";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

export default function StructureLeftSidebar({
  sections,
  currentSection,
  setCurrentSection = Function.prototype,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const renderSectionsListInLeftSidebar = (sections) => {
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
                {renderSectionsListInLeftSidebar(section.children)}
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
      {!setCurrentSection
        ? sections?.length
          ? renderSectionsListInLeftSidebar(sections)
          : t("notFound")
        : currentSection?.id
        ? renderSectionsListInLeftSidebar(sections)
        : t("notFound")}
    </div>
  );
}
