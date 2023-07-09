export const API = `http://constructor.egov.uz${
  localStorage.getItem("i18nextLng") === "uz" ||
  localStorage.getItem("i18nextLng") === "kr"
    ? ""  
    : "/ru"
}/api/v1`;
