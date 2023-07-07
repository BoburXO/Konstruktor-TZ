export const API = `http://constructor.egov.uz${
  localStorage.getItem("i18nextLng") === "ru" ? "/ru" : ""
}/api/v1`;
