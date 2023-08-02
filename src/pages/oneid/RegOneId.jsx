import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import s from "../Reg/regOneId.module.css";

const OneId = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/main");
    }
  }, []);

  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");
  const { ssoOneId, roles, RoleId } = useContext(Context);

  useEffect(() => {
    localStorage.setItem("oneIDCode", code);
    ssoOneId();
  }, []);

  return (
    <div className={s.reg_parent}>
      {localStorage.getItem("oneIDcCode") ? (
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
            {/* https://constructor.egov.uz
                http://localhost:3000 */}
            <button>Войти через OneID</button>
          </a>
        </div>
      ) : (
        <div className={s.reg_user_roles}>
          {roles?.roles?.map((role) => {
            return (
              <button onClick={() => RoleId(role?.id)} key={role?.id}>
                {role?.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OneId;
