import React, { useEffect, useState } from "react";

import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  setUserAction,
} from "../../redux/api/user/structure_slice";
import CreateTZ1center from "../Layout/CreateTZ1center";
import { clearMessage } from "../../pages/LKavtor/lkavtor_slice";

const CreateTZ = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { tzId } = useParams();
  const [arr, setArr] = useState([]);

  const notify = () =>
    toast.success(t("toast"), {
      style: { background: "white", color: "black" },
    });

  const { structure, activeSection, data, userAction } = useSelector(
    (state) => state.userStructure
  );
  const { id } = useSelector((state) => state.lkavtor);
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
    if (!id) {
      navigate("/lkavtor");
      return;
    }
    if (location.pathname === "/createTz") {
      dispatch(setUserAction("edit"));
    } else {
      dispatch(setUserAction("review"));
    }
    dispatch(clearMessage());
  }, []);

  useEffect(() => {
    dispatch(fetchStructureByIdForUser(id));
  }, [data]);

  useEffect(() => {
    if (structure?.id) {
      dispatch(setActiveSection(structure?.sections[0]));
    }
  }, [structure?.id]);

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
