import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import s from "../IndexSpravochnik/indexSpra.module.css";

const IndexSpra = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { spravochnik, getAllSpraSearch, spraSearch } = useContext(Context);
  const indexParams = spravochnik?.results?.find((el) => {
    return el?.id === id;
  });

  useEffect(() => {
    getAllSpraSearch({}).then(() => setIsLoading(false));
    if (!localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/");
    }
  }, [spraSearch]);

  if (isLoading) return <Loader />;
  return (
    <>
      <UserNav />
      <main className={s.indexSpra}>
        <div className={s.container}>
          {indexParams !== undefined ? (
            <>
            <h1>{indexParams?.title}:</h1>
          <div className={s.class_elements}>
            <br />
            <br />
            {indexParams?.elements?.map((el) => {
              return (
                <ul key={el?.id} className={s.index_el}>
                  <li>
                    <p>{el?.content}</p>
                  </li>
                  <br />
                </ul>
              );
            })}
          </div>
          <div className={s.back}>
            <button
              onClick={() => navigate(-1)}
              className={s.shablon_cancel_btn}
            >
              {t("btn.1")}
            </button>
          </div>
            </>
          ):(
            <h1 className={s.notFound}>{t("toast404")}</h1>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IndexSpra;
