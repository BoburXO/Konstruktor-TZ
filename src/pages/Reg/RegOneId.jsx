import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../Reg/regOneId.module.css";
import oneId from "../../assets/icons/one-login.svg";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const RegOneId = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    window.location.reload();
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/main");
    }
  }, []);

  const options = [
    { label: "Русский", value: "ru" },
    { label: "O'zbek", value: "uz" },
    { label: "Ўзбек", value: "kr" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <Select
        className={s.select_nav}
        options={options}
        placeholder={
          localStorage.getItem("i18nextLng") === "ru"
            ? "Русский"
            : localStorage.getItem("i18nextLng") === "uz"
            ? "O'zbek"
            : "Ўзбек"
        }
        onChange={({ value }) => changeLanguage(value)}
        isSearchable={false}
      />
      <div className={s.reg_parent}>
        <div className={s.reg_card}>
          <h1>{t("reg.1")}</h1>
          <a
            target="_blank"
            onClick={() =>
              (window.location.href = `https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=single_reester&redirect_uri=https://constructor.egov.uz/oneid/one&state=test&scope=myportal`)
            }
          >
            {/*  process.env.NODE_ENV === "production"
                  ? "https://constructor.egov.uz"
                  : "http://localhost:3000"*/}
            {localStorage.getItem("i18nextLng") === "ru" ? (
              <button style={{ paddingLeft: "20px" }}>
                {t("reg.2")}
                <img src={oneId} alt="ONE ID" />
              </button>
            ) : (
              <button>
                <img src={oneId} alt="ONE ID" />
                {t("reg.2")}
              </button>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegOneId;
