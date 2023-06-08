import { useRef } from "react";
import s from "../CreateTZ1-component/CreateTZ1.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../assets/icons/arrowLeft.svg";
import RenderSectionsWithChildren from "../RenderSectionsWithChildren/RenderSectionsWithChildren";

export default function CreateTZ1center({ activeSection }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef([]);

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
          <button onClick={() => navigate(-1)}>{t("btn.1")}</button>
          <input
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/createtz2")}
            value={t("btn.2")}
            type="submit"
          />
        </div>
      </div>
    </div>
  );
}
