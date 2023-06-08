import React, { useEffect, useState } from "react";
import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { Dropdown } from "rsuite";
import { NavLink, useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";
import CreateTZ1right from "../Layout/CreateTZ1right";
import toast from "react-hot-toast";
import { templates } from "../../templates";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import { useRef } from "react";
import StructureLeftSidebar from "../StructureLeftSidebar/StructureLeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStructureByIdForUser,
  setActiveSection,
} from "../../redux/api/user/structure_slice";
import CreateTZ1center from "../Layout/CreateTZ1center";

const CreateTZ = () => {
  const dispatch = useDispatch();
  const ref = useRef([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [arr, setArr] = useState([]);

  const { loading, structure, activeSection } = useSelector(
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
    dispatch(fetchStructureByIdForUser("7eb528dc-fb85-41ea-aad1-36527d9a0606"));
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
      <div>Hello world</div>
    </>
  );
};

export default CreateTZ;
