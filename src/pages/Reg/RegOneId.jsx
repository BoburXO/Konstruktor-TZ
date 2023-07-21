import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../Reg/regOneId.module.css";
import oneId from "../../assets/icons/one-login.svg";

const RegOneId = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/main");
    }
  }, []);

  return (
    <div className={s.reg_parent}>
      <div className={s.reg_card}>
        <h1>Вход в систему</h1>
        <a
          target="_blank"
          onClick={() =>
            (window.location.href = `https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=single_reester&redirect_uri=${
              process.env.NODE_ENV === "production"
                ? "https://constructor.egov.uz"
                : "http://localhost:3000"
            }/oneid/one&state=test&scope=myportal`)
          }
        >
          {/*  process.env.NODE_ENV === "production"
                  ? "https://constructor.egov.uz"
                  : "http://localhost:3000"*/}
          <button>
            Войти через
            <img src={oneId} alt="ONE ID" />
          </button>
        </a>
      </div>
    </div>
  );
};

export default RegOneId;
