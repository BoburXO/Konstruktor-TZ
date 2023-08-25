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
  clearStructureForUser,
  fetchStructureByIdForUser,
  fetchStructureForViewingTzByIdForUser,
  setActiveSection,
  setUserAction,
} from "../../redux/api/user/structure_slice";
import CreateTZ1center from "../Layout/CreateTZ1center";
import { clearDuplicatedAndDoubledTz } from "../../pages/LKavtor/lkavtor_slice";
import Loader from "../Loader/Loader";

const CreateTZ = ({ action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { tzId } = useParams();
  const roleName = localStorage.getItem("roleName");
  const [arr, setArr] = useState([]);

  const notify = () =>
    toast.success(t("toast"), {
      style: { background: "white", color: "black" },
    });

  const { structure, activeSection, data, loading } = useSelector(
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

  const fetchTzForForViewingOrForAnotherActions = () => {
    if (action === "view") {
      dispatch(fetchStructureForViewingTzByIdForUser(tzId));
    } else {
      dispatch(fetchStructureByIdForUser(tzId));
    }
  };

  useEffect(() => {
    if (!tzId) {
      navigate("/lkavtor");
      return;
    }
    dispatch(clearDuplicatedAndDoubledTz());
    fetchTzForForViewingOrForAnotherActions();
    return () => {
      dispatch(clearStructureForUser());
    };
  }, []);

  useEffect(() => {
    dispatch(setUserAction(action));
  }, [action]);

  useEffect(() => {
    if (structure?.id) {
      dispatch(setActiveSection(structure?.sections[0]));
    }
  }, [structure?.id]);

  useEffect(() => {
    if (activeSection?.id) {
      const activeSectionIndex = structure?.sections?.findIndex(
        (item) => item?.id === activeSection?.id
      );
      if (activeSectionIndex !== structure?.sections?.length - 1) {
        fetchTzForForViewingOrForAnotherActions();
      } else if (
        data?.id &&
        activeSectionIndex === structure?.sections?.length - 1 &&
        data?.id === activeSection?.id
      ) {
        return navigate(roleName === "Author" ? "/profile" : "/lkavtor");
      }
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
