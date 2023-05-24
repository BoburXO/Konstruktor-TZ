import axios from "axios";
import { API } from "../api/Api";

const refreshToken = () =>
  axios
    .post(`${API}/account/auth/user/login/refresh/`, {
      refresh: localStorage.getItem("ConstructorRoleRefreshToken"),
      access: localStorage.getItem("ConstructorRoleAccessToken"),
    })
    .then(({ data }) =>
      localStorage.setItem("ConstructorRoleAccessToken", data.access)
    );

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
    });
};

export const useHttp = () => {
  const axiosInstance = axios.create({
    API,
  });

  const request = async ({ method = "GET", url, data, headers }) => {
    try {
      const response = await axiosInstance({
        method,
        url: `${API}${url}`,
        data,
        headers,
      });
      if (response.status === 404 || response.status === 400) {
        throw new Error(`Could not fetch ${url}, status ${response.status}`);
      }
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        request({
          method: "POST",
          url: `/account/auth/user/login/refresh/`,
          data: {
            refresh: localStorage.getItem("ConstructorRoleRefreshToken"),
            access: localStorage.getItem("ConstructorRoleAccessToken"),
          },
        })
          .then((data) =>
            localStorage.setItem("ConstructorRoleAccessToken", data.access)
          )
          .then(() => {
            request({
              method: "POST",
              url: `/account/auth/user/logout`,
              data: { code: localStorage.getItem("oneIDCode") },
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "ConstructorRoleAccessToken"
                )}`,
              },
            }).then(() => {
              localStorage.clear();
              window.location.reload();
            });
          });
      }
    }
  };
  return { request };
};
