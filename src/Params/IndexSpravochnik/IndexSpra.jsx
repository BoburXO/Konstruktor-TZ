import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import UserNav from "../../components/UserNav/UserNav";
import { Context } from "../../Context/Context";
import s from "../IndexSpravochnik/indexSpra.module.css";

const IndexSpra = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { spravochnik, getAllSpraSearch, spraSearch } = useContext(Context);
  const indexParams = spravochnik?.results?.find((el) => {
    return el?.slug === slug;
  });

  useEffect(() => {
    getAllSpraSearch();
  }, [spraSearch]);
  return (
    <>
      <UserNav />
      <main className={s.indexSpra}>
        <div className={s.container}>
          <h1>{indexParams?.title}:</h1>
          <div className={s.class_elements}>
              <br />
              <br />
            {indexParams?.elements?.map((el) => {
              return (
                <ul className={s.index_el}>
                  <li><p>{el?.content}</p></li>
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default IndexSpra;
