import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import RenderSectionsWithChildren from "../RenderSectionsWithChildren/RenderSectionsWithChildren";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFieldsData,
  publishTz,
  sendAllFieldsData,
  setActiveSection,
} from "../../redux/api/user/structure_slice";
import { useMemo } from "react";
import { duplicateTz } from "../../pages/LKavtor/lkavtor_slice";

export default function CreateTZ1center({ activeSection }) {
  const { t } = useTranslation();
  const { tzId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fieldsData, structure, userAction } = useSelector(
    (state) => state.userStructure
  );

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
      {activeSection?.id ? (
        <>
          <h1>{`${activeSection?.header_name}. ${activeSection?.name}`}</h1>
          <br />
          {activeSection?.children?.length ? (
            <div className={s.craete1_center_form_parent}>
              <RenderSectionsWithChildren
                sections={activeSection?.children}
                action={"createTz"}
              />
              <div className={s.create1_form_route_btn}>
                {activeSectionIndex !== 0 ? (
                  <button
                    className={s.create1_form_route_btn_sides}
                    onClick={() => {
                      if (userAction !== "view" || userAction !== "preview") {
                        const a = window.confirm(
                          "Are you sure you want to go, all your savings are cleared"
                        );
                        if (a) {
                          dispatch(clearFieldsData());
                          navigateToPrev();
                        }
                      } else {
                        return navigateToPrev();
                      }
                    }}
                  >
                    {t("btn.1")}
                  </button>
                ) : null}
                {activeSectionIndex !== structure?.sections?.length - 1 ? (
                  <button
                    style={{ cursor: "pointer" }}
                    className={s.create1_form_route_btn_sides}
                    onClick={() => {
                      if (userAction !== "view" || userAction !== "preview") {
                        handleSubmitFieldsData();
                        dispatch(clearFieldsData());
                      }
                      navigateToNext();
                    }}
                  >
                    {t("btn.2")}
                  </button>
                ) : userAction === "preview" ? (
                  <button
                    style={{ cursor: "pointer" }}
                    className={s.create1_form_route_btn_save}
                    onClick={() => {
                      dispatch(duplicateTz(tzId));
                    }}
                  >
                    {t("tz.fill")}
                  </button>
                ) : userAction !== "view" ? (
                  <>
                    <button
                      style={{ cursor: "pointer" }}
                      className={s.create1_form_route_btn_save}
                      onClick={() => {
                        handleSubmitFieldsData();
                      }}
                    >
                      {t("tz.save")}
                    </button>
                    {structure?.is_draft ? (
                      <button
                        style={{ cursor: "pointer" }}
                        className={s.create1_form_route_btn_save_and_publish}
                        onClick={() => {
                          handleSubmitFieldsData();
                          dispatch(publishTz(tzId));
                        }}
                      >
                        {t("tz.save_and_publish")}
                      </button>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            <p>{t("notFound")}</p>
          )}
        </>
      ) : (
        <p style={{ marginTop: "30px" }}>{t("notFound")}</p>
      )}
    </div>
  );
}
