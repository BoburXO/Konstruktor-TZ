import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

//redux libraries
import { useSelector, useDispatch } from "react-redux";

import s from "../Structure/Structure.module.css";
import m from "../LKavtorMain/LKMain.module.css";
import pen from "../../assets/icons/pen.svg";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

//asyncActions
import {
  clearStructure,
  fetchStructureById,
  makePublicOrPrivateStructure,
  setStructureAction,
} from "./structure_slice";
import CreateNewStructureModal from "./CreateNewStructureModal/CreateNewStructureModal";
import { toast } from "react-hot-toast";
import CreateNewSectionModal from "./CreateNewSectionModal/CreateNewSectionModal";

import Loader from "../Loader/Loader";
import {
  clearSection,
  deleteSection,
  setCurrentSection,
} from "./CreateNewSectionModal/section_slice";
import StructureLeftSidebar from "../StructureLeftSidebar/StructureLeftSidebar";
import RenderSectionsWithChildren from "../RenderSectionsWithChildren/RenderSectionsWithChildren";
import { clearField } from "./CreateNewFieldModal/field_slice";

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

const style_delete_modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 0,
  p: 4,
};

const StructureComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

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

  //deleteModal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  //option modal = section || subsection
  const [activeSectionModal, setActiveSectionModal] = useState("section");

  const {
    currentStructure,
    structures,
    structureAction,
    publicOrPrivateStructure,
    isCreatingStructuresLoading,
    isFetchingStructuresLoading,
    isPublishingLoading,
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

  const userStructure = useSelector((state) => state.userStructure);

  useEffect(() => {
    if (id) {
      if (location.pathname.substring(0, 15) === "/structure/edit") {
        dispatch(setStructureAction("edit"));
      } else {
        dispatch(setStructureAction("review"));
      }
    } else {
      dispatch(setStructureAction("create"));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (structures?.id && userStructure?.structure?.id) {
      if (structures?.id === userStructure?.structure?.id) {
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearStructure());
      dispatch(clearSection());
      dispatch(clearField());
    };
  }, [location.pathname]);

  useEffect(() => {
    if (structureAction === "create") {
      if (currentStructure?.id) {
        dispatch(fetchStructureById(currentStructure?.id));
      }
    }
    //eslint-disable-next-line
  }, [currentStructure, currentSection, currentSubSection, currentField]);

  useEffect(() => {
    if (publicOrPrivateStructure?.id) {
      navigate("/lkavtor");
    }
  }, [publicOrPrivateStructure]);

  useEffect(() => {
    if (structureAction === "edit" || structureAction === "review") {
      dispatch(fetchStructureById(id));
    }
    //eslint-disable-next-line
  }, [
    structureAction,
    currentField,
    currentSection,
    currentSubSection,
    publicOrPrivateStructure,
  ]);

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

  const handlePublishOrUnpublishStcuture = () => {
    dispatch(makePublicOrPrivateStructure(structures?.id));
  };

  return (
    <>
      {isCreatingStructuresLoading ||
      isFetchingStructuresLoading ||
      isCreatingSectionLoading ||
      isCreatingSubSectionLoading ||
      isCreatingFieldLoading ||
      isPublishingLoading ? (
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
                <h2>{structures?.tz_name || t("struc2")}</h2>
                {structureAction !== "review" ? (
                  <img src={pen} alt="Update" onClick={handleOpenStructure} />
                ) : null}
                <CreateNewStructureModal
                  openStructure={openStructure}
                  handleCloseStructure={handleCloseStructure}
                  updatedData={structures || null}
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
                        {structureAction !== "review" ? (
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
                              onClick={handleOpenDeleteModal}
                            ></i>
                            <Modal
                              slotProps={{
                                backdrop: {
                                  style: {
                                    opacity: "0.4",
                                    boxShadow: 24,
                                  },
                                },
                              }}
                              open={openDeleteModal}
                              onClose={handleCloseDeleteModal}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style_delete_modal}>
                                <form
                                  style={{ textAlign: "center" }}
                                  className={m.createElementForm}
                                >
                                  <h2>{t("sfera.3")}</h2>
                                  <br />
                                  <p>{t("sfera.6")}</p>
                                  <br />
                                  <div className={m.createElementFormBtns}>
                                    {" "}
                                    <button
                                      type="button"
                                      onClick={() => handleCloseDeleteModal()}
                                      className={m.shablon_save_btn}
                                    >
                                      {t("btn.5")}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleDeleteSection}
                                      className={m.shablon_delete_btn}
                                    >
                                      {t("btn.6")}
                                    </button>
                                  </div>
                                </form>
                              </Box>
                            </Modal>
                          </div>
                        ) : null}
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
                      action={"createStructure"}
                    />
                  </div>
                </>
              ) : null}

              {structureAction !== "review" ? (
                <>
                  <div className={s.structure_add_plus}>
                    <button
                      onClick={() => {
                        if (structures?.id) {
                          handleOpen();
                        } else {
                          return toast(t("tzUncreated"));
                        }
                      }}
                    >
                      +
                    </button>
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
                              if (structures?.id) {
                                setActiveSectionModal("section");
                                handleOpenSection();
                              } else {
                                handleClose();
                              }
                            }}
                          >
                            {t("addSection")}
                          </button>
                          <br />
                          <button
                            onClick={() => {
                              if (structures?.id && currentSection?.id) {
                                setActiveSectionModal("subSection");
                                handleOpenSection();
                              } else {
                                handleClose();
                                if (!structures?.id) {
                                  return toast(t("tzUncreated"));
                                }
                                if (!structures?.id) {
                                  return toast(t("section.uncreated"));
                                }
                              }
                            }}
                          >
                            {t("addSubSection")}
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
                  {structures?.is_draft === false ? (
                    <div className={s.btn_wrapper_end}>
                      <button
                        className={s.structure_publish_btn}
                        onClick={() => {
                          if (structures?.id) {
                            dispatch(
                              makePublicOrPrivateStructure({
                                id: structures?.id,
                                data: { is_draft: true },
                              })
                            );
                          } else {
                            return toast.error(t("tzUncreated"));
                          }
                        }}
                      >
                        {t("unpublish")}
                      </button>
                    </div>
                  ) : (
                    <div className={s.btn_wrapper_end}>
                      <button
                        className={s.structure_publish_btn}
                        onClick={() => {
                          if (structures?.id) {
                            dispatch(
                              makePublicOrPrivateStructure({
                                id: structures?.id,
                                data: { is_draft: false },
                              })
                            );
                          } else {
                            return toast.error(t("tzUncreated"));
                          }
                        }}
                      >
                        {t("publish")}
                      </button>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </Fade>
        </div>
      )}
    </>
  );
};

export default StructureComponent;
