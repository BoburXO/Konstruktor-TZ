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
  setUserStatesToDefault,
} from "../../redux/api/user/structure_slice";
import CreateTZ1center from "../Layout/CreateTZ1center";
import {
  clearDuplicatedAndDoubledTz,
  clearMessage,
} from "../../pages/LKavtor/lkavtor_slice";
import Loader from "../Loader/Loader";

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

  const { structure, activeSection, data, loading, userAction } = useSelector(
    (state) => state.userStructure
  );
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
    if (!tzId) {
      navigate("/lkavtor");
      return;
    }
    if (location.pathname.substring(0, 10) === "/tz/create") {
      dispatch(setUserAction("create"));
    } else if (location.pathname.substring(0, 8) === "/tz/edit") {
      dispatch(setUserAction("edit"));
    } else {
      dispatch(setUserAction("review"));
    }
    dispatch(clearDuplicatedAndDoubledTz());
    return () => {
      dispatch(setUserStatesToDefault());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchStructureByIdForUser(tzId));
  }, [data]);

  useEffect(() => {
    if (structure?.id) {
      dispatch(setActiveSection(structure?.sections[0]));
    }
  }, [structure?.id]);

  useEffect(() => {
    const activeSectionIndex = structure?.sections?.findIndex(
      (item) => item?.id === activeSection?.id
    );
    if (
      activeSection?.id &&
      data?.id &&
      activeSectionIndex === structure?.sections?.length - 1 &&
      data?.id === activeSection?.id
    ) {
      navigate("/lkavtor");
    }
  }, [activeSection, data]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className={s.create1_parent}>
          <StructureLeftSidebar
            sections={structure?.sections}
            setCurrentSection={setActiveSection}
            currentSection={activeSection}
          />
          <CreateTZ1center activeSection={activeSection} />
          <CreateTZ1right copy={copy} />
        </section>
      )}
    </>
  );
};

export default CreateTZ;
