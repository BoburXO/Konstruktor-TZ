import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//redux libraries
import { useSelector, useDispatch } from "react-redux";

import s from "../Structure/Structure.module.css";
import pen from "../../assets/icons/pen.svg";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

//asyncActions
import { fetchStructureById } from "./structure_slice";
import CreateNewStructureModal from "./CreateNewStructureModal/CreateNewStructureModal";
import { toast } from "react-hot-toast";
import CreateNewSectionModal from "./CreateNewSectionModal/CreateNewSectionModal";
import { renderSectionsWithChildren } from "../../helpers/helpers";
import Loader from "../Loader/Loader";
import {
  deleteSection,
  setCurrentSection,
} from "./CreateNewSectionModal/section_slice";
import StructureLeftSidebar from "../StructureLeftSidebar/StructureLeftSidebar";
import RenderSectionsWithChildren from "../RenderSectionsWithChildren/RenderSectionsWithChildren";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 0,
  width: 360,
};

const StructureComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //default modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Structure modal
  const [openStructure, setOpenStructure] = React.useState(false);
  const handleOpenStructure = () => setOpenStructure(true);
  const handleCloseStructure = () => setOpenStructure(false);
  //Section Modal
  const [openSection, setOpenSection] = useState(false);
  const handleOpenSection = () => setOpenSection(true);
  const handleCloseSection = () => setOpenSection(false);

  //option modal = section || subsection
  const [activeSectionModal, setActiveSectionModal] = useState("section");

  const {
    currentStructure,
    structures,
    isCreatingStructuresLoading,
    isFetchingStructuresLoading,
  } = useSelector((state) => state.structure);

  const {
    currentSection,
    currentSubSection,
    isCreatingSectionLoading,
    isCreatingSubSectionLoading,
  } = useSelector((state) => state.section);

  const { currentField, isCreatingFieldLoading } = useSelector(
    (state) => state.field
  );

  useEffect(() => {
    if (currentStructure?.id) {
      dispatch(fetchStructureById(currentStructure?.id));
    }
    //eslint-disable-next-line
  }, [currentStructure, currentSection, currentSubSection, currentField]);

  useEffect(() => {
    if (structures?.sections?.length) {
      if (!currentSection?.id) {
        dispatch(setCurrentSection(structures?.sections[0]));
      }
    }
  }, [structures]);

  const activeSection = useMemo(() => {
    return structures?.sections?.find((item) => item.id === currentSection?.id);
  }, [currentSection, structures]);

  const handleDeleteSection = () => {
    dispatch(deleteSection(currentSection?.id));
  };

  const { t } = useTranslation();
  return (
    <>
      {isCreatingStructuresLoading ||
      isFetchingStructuresLoading ||
      isCreatingSectionLoading ||
      isCreatingSubSectionLoading ||
      isCreatingFieldLoading ? (
        <div style={{ width: "100vw", height: "100vh" }}>
          <Loader />
        </div>
      ) : (
        <div className={s.structure_parent}>
          <Fade bottom cascade>
            <StructureLeftSidebar
              sections={structures?.sections}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />
            <div className={s.structure_right_contents}>
              <div className={s.container}>
                <div className={s.structure_right_contents_labels}>
                  <h1 className={s.structure_right_contents_label}>
                    {t("struc1")}
                  </h1>
                </div>
              </div>
              <span className={s.structure_right_contents_update}>
                <h2>
                  {currentStructure?.tz_name
                    ? currentStructure?.tz_name
                    : t("struc2")}
                </h2>
                <img src={pen} alt="Update" onClick={handleOpenStructure} />
                <CreateNewStructureModal
                  openStructure={openStructure}
                  handleCloseStructure={handleCloseStructure}
                  updatedData={currentStructure?.id ? currentStructure : null}
                />
              </span>

              {activeSection ? (
                <>
                  <div className={s.structure_right_contents_form_parent}>
                    <div className={s.structure_right_contents_card_punkt}>
                      <span>
                        <p>
                          {t("struc5")} {activeSection?.header_name_ru}
                        </p>
                        <div>
                          <img
                            src={pen}
                            alt="Изменить"
                            onClick={handleOpenSection}
                          />
                          <CreateNewSectionModal
                            openSection={openSection}
                            handleCloseSection={handleCloseSection}
                            activeSectionModal="section"
                            updatedData={currentSection}
                          />
                          <i
                            className="fa-regular fa-trash-can"
                            style={{
                              color: "gray",
                              fontSize: "21px",
                              marginLeft: "15px",
                              cursor: "pointer",
                            }}
                            onClick={handleDeleteSection}
                          ></i>
                        </div>
                      </span>
                      <p className={s.structure_right_contents_input_label}>
                        {t("struc3")}
                      </p>
                      <br />
                      {t("ru")}:
                      <input
                        type="text"
                        value={activeSection?.name_ru}
                        className={s.structure_right_contents_input_punkt}
                        readOnly
                      />
                      <br />
                      <br />
                      {t("uz")}:
                      <input
                        type="text"
                        value={activeSection?.name_uz}
                        className={s.structure_right_contents_input_punkt}
                        readOnly
                      />
                    </div>
                    <RenderSectionsWithChildren
                      sections={activeSection?.children}
                      userRole="moderator"
                    />
                  </div>
                </>
              ) : null}

              <div className={s.structure_add_plus}>
                <button onClick={handleOpen}>+</button>
                <Modal
                  slotprops={{
                    backdrop: {
                      style: { opacity: "0.3", boxShadow: 24 },
                    },
                  }}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className={s.structure_modal}>
                      <button
                        onClick={() => {
                          if (currentStructure?.id) {
                            setActiveSectionModal("section");
                            handleOpenSection();
                          } else {
                            handleClose();
                            return toast(
                              "Iltimos avval texnik vazifaga nom yaratib oling"
                            );
                          }
                        }}
                      >
                        Добавить новый пункт
                      </button>
                      <br />
                      <button
                        onClick={() => {
                          if (currentStructure?.id && currentSection?.id) {
                            setActiveSectionModal("subSection");
                            handleOpenSection();
                          } else {
                            handleClose();
                            if (!currentStructure?.id) {
                              return toast(
                                "Iltimos avval texnik vazifaga nom yaratib oling"
                              );
                            }
                            if (!currentSection?.id) {
                              return toast(
                                "Avval asosiy punktni yaratib olishingiz kerak"
                              );
                            }
                          }
                        }}
                      >
                        Добавить подпункт
                      </button>
                      <br />
                    </div>
                    <CreateNewSectionModal
                      section={activeSection}
                      openSection={openSection}
                      handleCloseSection={handleCloseSection}
                      handleClose={handleClose}
                      activeSectionModal={activeSectionModal}
                      parent={activeSection?.id}
                    />
                  </Box>
                </Modal>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

export default StructureComponent;
