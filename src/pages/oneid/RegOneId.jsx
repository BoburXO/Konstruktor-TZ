import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Context } from "../../Context/Context";
import s from "../Reg/regOneId.module.css";

const OneId = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const search = useLocation().search;
  const code = new URLSearchParams(search).get("code");
  const { ssoOneId, roles, RoleId } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("ConstructorRoleAccessToken")) {
      navigate("/main");
    }
    localStorage.setItem("oneIDCode", code);
    ssoOneId().then(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={s.reg_parent}>
      {localStorage.getItem("oneIDcCode") ? (
        <div className={s.reg_card}>
          <h1>Вход в систему</h1>
          <a
            target="_blank"
            onClick={() =>
              (window.location.href = `https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=single_reester&redirect_uri=https://constructor.egov.uz/&state=test&scope=myportal`)
            }
          >
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
