import axios, { AxiosInstance } from 'axios';

export const api_url = 'http://api.openweathermap.org/data/2.5/';

export default function api(): AxiosInstance {
  let axiosInstance = axios.create({
    baseURL: api_url,
    //If api has a token in headers uncomment bellow.
    // headers: {
    //   authorization: api_token ? `Token ${api_token}` : '',
    // },
  });
  return axiosInstance;
}
