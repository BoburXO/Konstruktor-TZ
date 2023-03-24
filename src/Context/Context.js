import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../api/Api";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [spravochnik, setSpravochnik] = useState([]);

  const navigate = useNavigate();
  const [roles, setRoles] = useState({});
  const [profile, setProfile] = useState({});

  //oneID roles post
  const ssoOneId = () => {
    axios
      .post(`${API}/account/auth/user_roles/`, {
        code: localStorage.getItem("oneIDCode"),
      })
      .then((res) => {
        setRoles(res.data);
        localStorage.setItem("ConstructorRefreshToken", res.data.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //oneID roles post

  const RoleId = (id) => {
    axios
      .post(`${API}/account/auth/loginbyoneid/`, {
        role_id: id,
        projectName: "constructor_tz",
        refreshToken: localStorage.getItem("ConstructorRefreshToken"),
      })
      .then((res) => {
        localStorage.setItem(
          "ConstructorRoleAccessToken",
          res.data.token.refresh
        );
        localStorage.setItem(
          "ConstructorRoleAccessToken",
          res.data.token.access
        );
        // localStorage.setItem(
        //   "ConstructorRoleAccessToken",
        //   res.data.token.refresh
        // );
        localStorage.removeItem("ConstructorRefreshToken");
        setProfile(res.data);
        localStorage.setItem("roleUserName", res?.data?.user?.username);
        localStorage.setItem("roleName", res?.data?.user?.role?.name);
        navigate("/main");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LogOut
  const LogOut = () => {
    axios
      .post(
        `${API}/account/auth/user/logout`,
        {
          code: localStorage.getItem("oneIDCode"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "ConstructorRoleAccessToken"
            )}`,
          },
        }
      )
      .then(() => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // LogOut

  //get All spravochnik
  useEffect(() => {
    axios
      .get(`${API}/classificator/all/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setSpravochnik(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //get All spravochnik

  return (
    <>
      <Context.Provider
        value={{ spravochnik, ssoOneId, roles, RoleId, LogOut }}
      >
        {children}
      </Context.Provider>
    </>
  );
};

export { ContextProvider, Context };
