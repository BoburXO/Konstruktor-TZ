import React, { useEffect, useState } from "react";
import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { useTranslation } from "react-i18next";
import CreateTZ1right from "../Layout/CreateTZ1right";
import toast from "react-hot-toast";
import { templates } from "../../templates";
import StructureLeftSidebar from "../StructureLeftSidebar/StructureLeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStructureByIdForUser,
  setActiveSection,
} from "../../redux/api/user/structure_slice";
import CreateTZ1center from "../Layout/CreateTZ1center";

const CreateTZ = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [arr, setArr] = useState([]);

  const {  structure, activeSection } = useSelector(
    (state) => state.userStructure
  );

  const notify = () => toast(t("toast"));

  const copy = (id, e) => {
    const currentPunkt = templates?.find((punkt) => {
      setArr([...arr, punkt.desc]);
      return punkt?.id === id;
    });
    navigator.clipboard.writeText(currentPunkt.desc);
    notify();
    e.target.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png";
  };

  useEffect(() => {
    dispatch(fetchStructureByIdForUser("91f0a3dd-a3a3-4a8a-ae7b-53914c2ef060"));
  }, []);

  useEffect(() => {
    if (structure?.id) {
      dispatch(setActiveSection(structure?.sections[0]));
    }
  }, [structure]);

  return (
    <>
      <section className={s.create1_parent}>
        <StructureLeftSidebar
          sections={structure?.sections}
          setCurrentSection={setActiveSection}
          currentSection={activeSection}
        />
        <CreateTZ1center activeSection={activeSection} />
        <CreateTZ1right copy={copy} />
      </section>
    </>
  );
};

export default CreateTZ;
