export const API = `http://89.249.60.132:8000${
  localStorage.getItem("i18nextLng") === "ru" ? "/ru" : ""
}/api/v1`;
