import React, { useContext } from "react";
import Footer from "../../components/Footer/Footer";
import s from "../Templates/Templates.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserNav from "../../components/UserNav/UserNav";
import createIcon from "../../assets/icons/createIcon.svg";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { Context } from "../../Context/Context";

const Template = () => {
  const {
    sample,
    allSample,
    sampleDelete,
    updateSample,
    sampleUpdUz,
    setSampleUpdUz,
    sampleUpdRu,
    setSampleUpdRu,
  } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();
  const paramsFind = sample?.results?.find((el) => {
    return el?.id === id;
  });

  const { t } = useTranslation();

  React.useEffect(() => {
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
    allSample();
    setSampleUpdRu(paramsFind?.description_ru);
    setSampleUpdUz(paramsFind?.description_uz);
  }, []);

  return (
    <>
      <UserNav />
      <section className={s.templates_parent}>
        {sample?.count > 0 ? (
          <div className={s.templates_container}>
            <div className={s.templates_card}>
              <h1>
                {t("struc5")} {paramsFind?.section}
              </h1>
              <br />
              <span className={s.sample_parent}>
                <span>
                  <p>{t("ru")}:</p>
                  <br />
                  <textarea
                    value={sampleUpdRu}
                    onChange={(e) => setSampleUpdRu(e.target.value)}
                  ></textarea>
                </span>
                <span>
                  <p>{t("uz")}:</p>
                  <br />
                  <textarea
                    value={sampleUpdUz}
                    onChange={(e) => setSampleUpdUz(e.target.value)}
                  ></textarea>
                </span>
              </span>
            </div>
            <button className={s.Temp_back} onClick={() => navigate(-1)}>
              {t("btn.1")}
            </button>
            <button
              onClick={() => updateSample(paramsFind?.id)}
              className={s.Temp_update}
            >
              <img src={createIcon} alt="Update" />
            </button>
            <button
              onClick={() => sampleDelete(paramsFind?.id)}
              className={s.Temp_delete}
            >
              <img src={deleteIcon} alt="Delete" />
            </button>
          </div>
        ) : (
          <h3 style={{ textAlign: "center", padding: "120px" }}>
            {t("toast404")}
          </h3>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Template;
