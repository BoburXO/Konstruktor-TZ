import React, { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../api/Api";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Context = createContext();

const ContextProvider = ({ children }) => {
  //redux
  const todos = useSelector((note) => note.todoList);
  //redux
  const { t } = useTranslation();
  const [spravochnik, setSpravochnik] = useState([]);
  const navigate = useNavigate();
  const [roles, setRoles] = useState({});
  const [profile, setProfile] = useState({});
  const [spraSearch, setSpraSearch] = useState("");
  const [contentSearch, setContentSearch] = useState("");
  const [contentSite, setContentSite] = useState({});
  const [tzDB, setTzDB] = useState({});
  const [contUz, setContUz] = useState("");
  const [contRu, setContRu] = useState("");
  const [nameClassUz, setNameClassUz] = useState("");
  const [nameClassRu, setNameClassRu] = useState("");
  //notify
  const notify401 = () => toast(t("toast401"));
  const notify404 = () => toast(t("toast404"));
  const notify400 = () => toast(t("toast400"));
  const notify403 = () => toast(t("toast403"));
  const notify500 = () => toast(t("toast500"));
  const notify200 = () => toast(t("toast200"));
  //notify

  //createContent
  const [headerUz, setHeaderUz] = useState("");
  const [headerRu, setHeaderRu] = useState("");
  const [sphereContent, setSphereContent] = useState();
  const [descriptionUz, setDescriptionUz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [docFileUz, setDocFileUz] = useState(null);
  const [docFileRu, setDocFileRu] = useState(null);
  const [textUz, setTextUz] = useState("");
  const [textRu, setTextRu] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  //createContent

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
  const getAllSpraSearch = (page = 1) => {
    axios
      .get(`${API}/classificator/all/?search=${spraSearch}&page=${page}`, {
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
    axios
      .get(`${API}/standard/home`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setTzDB(res.data);
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
      });
  };
  //getTZhome

  //getContent-search,filter,sphere-filter
  const getContentSearch = (page = 1) => {
    axios
      .get(
        `${API}/standard/site-content-list/?search=${contentSearch}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "ConstructorRoleAccessToken"
            )}`,
          },
        }
      )
      .then((res) => {
        setContentSite(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => getContentSearch());
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

  const getContentIsPublish = (isPublish) => {
    axios
      .get(`${API}/standard/site-content-list/?is_published=${isPublish}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setContentSite(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => getContentIsPublish());
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

  const getContentSphereFilter = (id) => {
    axios
      .get(`${API}/standard/site-content-list/?sphere=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setContentSite(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => getContentSphereFilter());
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
  //getContent

  //deleteContent
  const deleteContent = (slug) => {
    axios
      .delete(`${API}/standard/${slug}/delete/`)
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
  //deleteContent

  //createContentOfSite
  const createContentOfSite = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("header_uz", headerUz);
    formData.append("header_ru", headerRu);
    formData.append("sphere", sphereContent);
    formData.append("description_uz", descriptionUz);
    formData.append("description_ru", descriptionRu);
    formData.append("doc_file_uz", docFileUz);
    formData.append("doc_file_ru", docFileRu);
    formData.append("text_uz", textUz);
    formData.append("text_ru", textRu);
    formData.append("created_at", createdAt);
    formData.append("is_published", true);

    try {
      const res = axios({
        url: `${API}/standard/create/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
        data: formData,
      })
        .then(() => {
          navigate("/contentofsite");
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
    } catch (err) {
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
    }
  };

  //ispublish = false
  const createContentOfSiteFalse = () => {
    const formData = new FormData();

    formData.append("header_uz", headerUz);
    formData.append("header_ru", headerRu);
    if (sphereContent) {
      formData.append("sphere", sphereContent);
    }
    formData.append("description_uz", descriptionUz);
    formData.append("description_ru", descriptionRu);
    if (docFileUz) {
      formData.append("doc_file_uz", docFileUz);
    }
    if (docFileRu) {
      formData.append("doc_file_ru", docFileRu);
    }
    formData.append("text_uz", textUz);
    formData.append("text_ru", textRu);
    formData.append("created_at", createdAt);
    formData.append("is_published", false);
    try {
      const res = axios({
        url: `${API}/standard/create/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
        data: formData,
      })
        .then(() => {
          navigate("/contentofsite");
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
    } catch (err) {
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
    }
  };
  //createContentOfSite

  //updateContent

  const updateContentTrue = (slug) => {
    const formData = new FormData();

    formData.append("header_uz", headerUz);
    formData.append("header_ru", headerRu);
    if (sphereContent) {
      formData.append("sphere", sphereContent);
    }
    formData.append("description_uz", descriptionUz);
    formData.append("description_ru", descriptionRu);
    if (docFileUz) {
      formData.append("doc_file_uz", docFileUz);
    }
    if (docFileRu) {
      formData.append("doc_file_ru", docFileRu);
    }
    formData.append("text_uz", textUz);
    formData.append("text_ru", textRu);
    formData.append("is_published", true);

    try {
      const res = axios({
        url: `${API}/standard/${slug}/update/`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
        data: formData,
      })
        .then(() => {
          navigate("/contentofsite");
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
    } catch (err) {
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
    }
  };

  const updateContentFalse = (slug) => {
    const formData = new FormData();

    formData.append("header_uz", headerUz);
    formData.append("header_ru", headerRu);
    if (sphereContent) {
      formData.append("sphere", sphereContent);
    }
    formData.append("description_uz", descriptionUz);
    formData.append("description_ru", descriptionRu);
    if (docFileUz) {
      formData.append("doc_file_uz", docFileUz);
    }
    if (docFileRu) {
      formData.append("doc_file_ru", docFileRu);
    }
    formData.append("text_uz", textUz);
    formData.append("text_ru", textRu);
    formData.append("is_published", false);

    try {
      const res = axios({
        url: `${API}/standard/${slug}/update/`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
        data: formData,
      })
        .then(() => {
          navigate("/contentofsite");
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
    } catch (err) {
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
    }
  };
  //updateContent

  //createClassificator
  const createClassificator = () => {
    axios
      .post(
        `${API}/classificator/create/`,
        {
          elements: todos,
          title_ru: nameClassRu,
          title_uz: nameClassUz,
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
          refreshToken().then(() => createClassificator());
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
  //createClassificator

  //getSphere
  const [sphere, setSphere] = useState([]);
  const getSphere = () => {
    axios
      .get(`${API}/standard/sphere/list-create/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setSphere(res.data);
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
  //getSphere

  //createSphere
  const createSphere = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API}/standard/sphere/list-create/`,
        {
          name_uz: e.target[0].value,
          name_ru: e.target[1].value,
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
          refreshToken().then(() => createSphere());
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
  //createSphere
  
  //deleteSphere
  const deleteSphere = (id) => {
    axios
      .delete(`${API}/standard/sphere/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
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
  //deleteSphere

  //editSphere
  const [modalData, setModalData] = useState("");
  const [sphereEditUz, setSphereEditUz] = useState("");
  const [sphereEditRu, setSphereEditRu] = useState("");

  const editSphere = async (id) => {
    await axios
      .patch(
        `${API}/standard/sphere/${id}/`,
        {
          name_uz: sphereEditUz,
          name_ru: sphereEditRu,
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
          refreshToken().then(() => editSphere());
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

  //editSphere

  //shablon-sample all
  const [sample, setSample] = useState({});
  const [punktSearch, setPunktSearch] = useState("");

  const allSample = () => {
    axios
      .get(
        `${API}/constructor/sample/create/list?description__icontains=${punktSearch}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "ConstructorRoleAccessToken"
            )}`,
          },
        }
      )
      .then((res) => {
        setSample(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => allSample());
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
  //shablon-sample all

  //getSample by section id

  const getSampleBySection = (id) => {
    axios
      .get(`${API}/constructor/sample/create/list?section=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setSample(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => getSampleBySection());
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

  //getSample by sectiion id

  const [selectPunkt, setSelectPunkt] = useState({});
  //selectPunkt- create sample
  const getSelectPunkt = () => {
    axios
      .get(`${API}/constructor/sections/moderator`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then((res) => {
        setSelectPunkt(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => getSelectPunkt());
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
  //selectPunkt- create sample

  //createSample
  const [sampleSect, setSampleSect] = useState("");
  const [sampleDescRu, setSampleDescRu] = useState("");
  const [sampleDescUz, setSampleDescUz] = useState("");

  const createSample = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API}/constructor/sample/create/list`,
        {
          section: sampleSect,
          description_ru: sampleDescRu,
          description_uz: sampleDescUz,
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
          refreshToken().then(() => createSample());
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
  //createSample

  //sample-delete
  const sampleDelete = (id) => {
    axios
      .delete(`${API}/constructor/sample/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "ConstructorRoleAccessToken"
          )}`,
        },
      })
      .then(() => {
        navigate("/lkadminshablon");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => sampleDelete());
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
  //sample-delete

  //update-sample
  const [sampleUpdUz, setSampleUpdUz] = useState("");
  const [sampleUpdRu, setSampleUpdRu] = useState("");

  const updateSample = (id) => {
    axios
      .patch(
        `${API}/constructor/sample/detail/${id}`,
        {
          description_uz: sampleUpdUz,
          description_ru: sampleUpdRu,
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
        navigate("/lkadminshablon");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          refreshToken().then(() => updateSample());
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
  //update-sample

  return (
    <>
      <Context.Provider
        value={{
          getSampleBySection,
          updateSample,
          sampleUpdUz,
          setSampleUpdUz,
          sampleUpdRu,
          setSampleUpdRu,
          punktSearch,
          setPunktSearch,
          sampleDelete,
          createSample,
          sampleSect,
          setSampleSect,
          sampleDescRu,
          setSampleDescRu,
          sampleDescUz,
          setSampleDescUz,
          selectPunkt,
          getSelectPunkt,
          sample,
          allSample,
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
          tzDB,
          getContentSearch,
          contentSite,
          contentSearch,
          setContentSearch,
          deleteContent,
          createContentOfSite,
          headerUz,
          setHeaderUz,
          headerRu,
          setHeaderRu,
          sphereContent,
          setSphereContent,
          descriptionUz,
          setDescriptionUz,
          descriptionRu,
          setDescriptionRu,
          docFileUz,
          setDocFileUz,
          docFileRu,
          setDocFileRu,
          textUz,
          setTextUz,
          textRu,
          setTextRu,
          createdAt,
          setCreatedAt,
          createClassificator,
          setNameClassUz,
          nameClassUz,
          nameClassRu,
          setNameClassRu,
          sphere,
          getSphere,
          createSphere,
          getContentIsPublish,
          getContentSphereFilter,
          deleteSphere,
          editSphere,
          modalData,
          setModalData,
          sphereEditRu,
          setSphereEditRu,
          sphereEditUz,
          setSphereEditUz,
          createContentOfSiteFalse,
          updateContentTrue,
          updateContentFalse,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};

export { ContextProvider, Context };