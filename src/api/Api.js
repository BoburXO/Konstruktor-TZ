export const API = `https://constructor.egov.uz${
  localStorage.getItem("i18nextLng") === "uz" ? "" : "/ru"
}/api/v1`;
