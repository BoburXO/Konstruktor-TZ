import axios from "axios";
import { API } from "../api/Api";

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
      console.log(error);
      return error;
    }
  };
  return { request };
};
