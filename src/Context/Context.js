import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../api/Api";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const [spravochnik, setSpravochnik] = useState([]);
  const navigate = useNavigate();
  const [roles, setRoles] = useState({});
  const [profile, setProfile] = useState({});
  const [spraSearch, setSpraSearch] = useState("");
  const [tzDB, setTzDB] = useState({});
  const notify401 = () => toast(t("toast401"));
  const notify404 = () => toast(t("toast404"));
  const notify400 = () => toast(t("toast400"));
  const notify403 = () => toast(t("toast403"));
  const notify500 = () => toast(t("toast500"));
  const notify200 = () => toast(t("toast200"));

  const [contUz, setContUz] = useState("");
  const [contRu, setContRu] = useState("");

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
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
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
          "ConstructorRoleRefreshToken",
          res.data.token.refresh
        );
        localStorage.setItem(
          "ConstructorRoleAccessToken",
          res.data.token.access
        );
        localStorage.removeItem("ConstructorRefreshToken");
        setProfile(res.data);
        localStorage.setItem("roleUserName", res?.data?.user?.username);
        localStorage.setItem("roleName", res?.data?.user?.role?.name);
        navigate("/main");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };

  //refresh token
  const refreshToken = () =>
    axios
      .post(`${API}/account/auth/user/login/refresh/`, {
        refresh: localStorage.getItem("ConstructorRoleRefreshToken"),
        access: localStorage.getItem("ConstructorRoleAccessToken"),
      })
      .then(({ data }) =>
        localStorage.setItem("ConstructorRoleAccessToken", data.access)
      );
  //refresh token

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
        if (err.response.status === 401) {
          refreshToken().then(() => LogOut());
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  // LogOut

  //all Spravochnik searchbar
  const getAllSpraSearch = () => {
    axios
      .get(`${API}/classificator/all/?search=${spraSearch}`, {
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
        if (err.response.status === 401) {
          refreshToken().then(() => getAllSpraSearch());
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //all Spravochnik searchbar

  //Element Slug
  // const getElementBySlug = (slug) => {
  //   axios
  //     .get(`${API}/classificator/${slug}/detail/`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem(
  //           "ConstructorRoleAccessToken"
  //         )}`,
  //       },
  //     })
  //     .then((res) => {
  //       setElements(res.data);
  //     })
  //     .catch((err) => {
  //       // navigate("/lkadminspravochnik");
  //       if (err.response.status === 401) {
  //         refreshToken().then(() => getElementBySlug());
  //       }
  //       if (err.response.status === 404) {
  //         notify404();
  //       }
  //       if (err.response.status === 400) {
  //         notify400();
  //       }
  //       if (err.response.status === 403) {
  //         notify403();
  //       }
  //       if (err.response.status === 500) {
  //         notify500();
  //       }
  //     });
  // };
  //Element Slug

  //deleteElement
  const removeElementById = (id) => {
    axios
      .delete(`${API}/classificator/element/${id}/`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //deleteElement

  //putElement
  const updateElements = async (e, id) => {
    e.preventDefault();
    await axios
      .put(`${API}/classificator/element/${id}/`, {
        content_uz: e.target[0].value
          ? e.target[0].value
          : e.target.children[0].children[0].innerHTML,
        content_ru: e.target[1].value
          ? e.target[1].value
          : e.target.children[1].children[0].innerHTML,
      })

      .then(() => {
        // getElementBySlug(slug);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //putElement

  //putSlug
  const updateSlug = async (e, slug) => {
    e.preventDefault();
    await axios
      .patch(
        `${API}/classificator/${slug}/update/`,
        {
          title_uz: e.target[0].value
            ? e.target[0].value
            : e.target.children[0].children[0].innerHTML,
          title_ru: e.target[1].value
            ? e.target[1].value
            : e.target.children[1].children[0].innerHTML,
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
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //putSlug

  //removeSlug
  const removeSlug = (slug) => {
    axios
      .delete(`${API}/classificator/${slug}/delete/`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //removeSlug

  //isActive
  const isActiveClassificator = (slug, status) => {
    axios
      .patch(`${API}/classificator/${slug}/status/update/`, {
        is_active: !status,
      })
      .then(() => {
        getAllSpraSearch();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //isActive

  //createElement
  const createElement = (id) => {
    axios
      .post(`${API}/classificator/element/${id}/`, {
        content_uz: contUz,
        content_ru: contRu,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          notify401();
        }
        if (err.response.status === 404) {
          notify404();
        }
        if (err.response.status === 400) {
          notify400();
        }
        if (err.response.status === 403) {
          notify403();
        }
        if (err.response.status === 500) {
          notify500();
        }
      });
  };
  //createElement

  //getTZhome
  const getTzHome = () => {
    axios.get(`${API}/standard/home`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "ConstructorRoleAccessToken"
        )}`,
      },
    })
    .then((res) => {
      setTzDB(res.data)
    })
    .catch((err) => {
      if (err.response.status === 401) {
        refreshToken().then(() => getTzHome());
      }
      if (err.response.status === 404) {
        notify404();
      }
      if (err.response.status === 400) {
        notify400();
      }
      if (err.response.status === 403) {
        notify403();
      }
      if (err.response.status === 500) {
        notify500();
      }
    })
  };
  //getTZhome

  return (
    <>
      <Context.Provider
        value={{
          spravochnik,
          ssoOneId,
          roles,
          RoleId,
          LogOut,
          removeElementById,
          updateElements,
          updateSlug,
          removeSlug,
          getAllSpraSearch,
          setSpraSearch,
          spraSearch,
          isActiveClassificator,
          createElement,
          contUz,
          contRu,
          setContRu,
          setContUz,
          getTzHome,
          tzDB
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};

export { ContextProvider, Context };
