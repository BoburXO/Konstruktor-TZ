import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import RenderSectionsWithChildren from "../RenderSectionsWithChildren/RenderSectionsWithChildren";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFieldsData,
  sendAllFieldsData,
  setActiveSection,
} from "../../redux/api/user/structure_slice";
import { useMemo } from "react";

export default function CreateTZ1center({ activeSection }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fieldsData, structure } = useSelector((state) => state.userStructure);

  const activeSectionIndex = useMemo(() => {
    return structure?.sections?.findIndex(
      (section) => section?.id === activeSection?.id
    );
  }, [activeSection, structure]);

  const deStructActiveSectionForFieldsData = (sections) => {
    const sectionData = sections.map((section) => {
      return {
        id: section?.id,
        f_section: [],
        children: section?.children?.length
          ? deStructActiveSectionForFieldsData(section?.children)
          : null,
      };
    });
    return sectionData;
  };

  const setAllFieldsData = (sections) => {
    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < fieldsData.length; j++) {
        if (sections[i].id === fieldsData[j].section_id) {
          const { section_id, ...obj } = fieldsData[j];
          sections[i].f_section.push(obj);
        }
      }
      if (sections[i].children) {
        setAllFieldsData(sections[i].children);
      }
    }
    return sections;
  };

  const removeExtraDataFromSections = (sections) => {
    return sections.map((section) => {
      const { id, f_section, children } = section;
      if (!f_section?.length) {
        if (!children?.length) {
          return {
            id,
          };
        } else {
          return {
            id,
            children: removeExtraDataFromSections(children),
          };
        }
      } else if (!children?.length) {
        if (!f_section?.length) {
          return {
            id,
          };
        } else {
          return {
            id,
            f_section,
          };
        }
      } else {
        return {
          id,
          f_section,
          children: removeExtraDataFromSections(children),
        };
      }
    });
  };

  const handleSubmitFieldsData = () => {
    const template = deStructActiveSectionForFieldsData(
      activeSection?.children
    );
    const data = setAllFieldsData(template);
    dispatch(
      sendAllFieldsData({
        id: activeSection.id,
        data: {
          children: removeExtraDataFromSections(data),
        },
      })
    );
  };

  const navigateToPrev = () => {
    const prevSection = structure.sections[activeSectionIndex - 1];
    dispatch(setActiveSection(prevSection));
  };

  const navigateToNext = () => {
    const nextSection = structure.sections[activeSectionIndex + 1];
    dispatch(setActiveSection(nextSection));
  };

  return (
    <div className={s.craete1_center}>
      <span onClick={() => navigate(-1)} className={s.craete1_center_navigate}>
        <img src={arrowleft} alt="←" />
        <p>{t("createtz1")}</p>
      </span>
      <h1>{`${activeSection?.header_name}. ${activeSection?.name}`}</h1>
      <br />

      <div className={s.craete1_center_form_parent}>
        <RenderSectionsWithChildren
          sections={activeSection?.children}
          userRole={"author"}
        />
        <div className={s.create1_form_route_btn}>
          {activeSectionIndex !== 0 ? (
            <button
              onClick={() => {
                const a = window.confirm(
                  "Are you sure you want to go, all your savings are cleared"
                );
                if (a) {
                  dispatch(clearFieldsData());
                  navigateToPrev();
                }
              }}
            >
              {t("btn.1")}
            </button>
          ) : null}
          {activeSectionIndex !== structure?.sections?.length - 1 ? (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSubmitFieldsData();
                dispatch(clearFieldsData());
                navigateToNext();
              }}
            >
              {t("btn.2")}
            </button>
          ) : (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleSubmitFieldsData();
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
