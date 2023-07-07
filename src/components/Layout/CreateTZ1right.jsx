import React from "react";
import { Link } from "react-router-dom";
import arrowBottom from "../../assets/icons/arrowBottom.svg";
import s from "../../components/CreateTZ1-component/CreateTZ1.module.css";
import Fade from "react-reveal/Fade";
import copyIcon from "../../assets/icons/copyIcon.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const CreateTZ1right = ({ copy }) => {
  const { t } = useTranslation();
  const { templates, templatesLoading } = useSelector(
    (state) => state.userStructure
  );
  return (
    <Fade bottom cascade>
      <div className={s.craete1_right}>
        <h2>{t("createtz26")}</h2>
        <p style={{ marginBottom: 15 }}>{t("createtz27")}</p>
        {templatesLoading ? (
          "Loading..."
        ) : (
          <div className={s.create1_punktlar}>
            {!templates?.section_smaple?.length ? (
              t("notFound")
            ) : (
              <>
                {templates?.section_smaple?.slice(0, 3).map((el) => {
                  return (
                    <div className={s.create1_punktlar_card} key={el.id}>
                      <div className={s.twink_copy}>
                        <h3>
                          {t("struc5")} {el.punkt}
                        </h3>
                        <span onClick={(e) => copy(el.id, e)}>
                          <img src={copyIcon} alt="CopyPast" />
                        </span>
                      </div>
                      <p>
                        {el.desc.slice(0, 189)}
                        {"..."}
                      </p>
                      <div className={s.center}>
                        <Link to={`/user-samplePunkt/${el.id}`}>
                          <button className={s.craete1_right_btn}>
                            {t("btn.3")}
                            <img src={arrowBottom} alt="Arrow-Bottom" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </Fade>
  );
};

export default CreateTZ1right;
