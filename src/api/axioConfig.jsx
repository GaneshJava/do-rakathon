import axios from 'axios';
// import secureLocalStorage from "react-secure-storage";
import { secureLocalStorage } from 'helpers/secureLocalStorage';
import { PUBLIC_APIS, GET_REFRESH_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { logoutUser } from './userService';

// replace with your API base URL
const baseURL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false
});

instance.interceptors.request.use(
  (config) => {
    // Add any request headers or interceptors here
    const accessToken = secureLocalStorage.getItem(ACCESS_TOKEN);
    const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN);
    if (accessToken && refreshToken) {
      config.headers[ACCESS_TOKEN] = `${accessToken}`;
      config.headers[REFRESH_TOKEN] = `${refreshToken}`;
    }
    if (PUBLIC_APIS.includes(config.url)) {
      // Remove the Authorization header from the request
      delete config.headers[ACCESS_TOKEN];
      delete config.headers[REFRESH_TOKEN];
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Handle response data here
    return response;
  },
  (error) => {
    // Handle response error here
    if (error.response && error.response.status === 401) {
      // Access token has expired. Refresh the token and retry the original request
      return refreshAccessToken()
        .then((response) => {
          // Retry the original request with the new access token
          const config = {
            ...error.config,
            headers: {
              ...error.config.headers,
              [ACCESS_TOKEN]: `${response.accessToken}`,
              [REFRESH_TOKEN]: `${response.refreshToken}`,
            },
          };
          return axios.request(config);
        })
        .then((response) => {
          // Handle successful response from the new request with the updated access token
          return response;
        }).catch((error) => {
          // Handle error in the promise chain
          if (error.response && error.response.status === 401) {
            // Both access tokens have expired. Log out the user and redirect to the login page
            logoutUser();
          }
          return Promise.reject(error);
        });;
    }
    return Promise.reject(error);
  }
);

// Define a function to refresh the access token
export const refreshAccessToken = () => {
  const refreshToken = secureLocalStorage.getItem(REFRESH_TOKEN);
  return axios.post(`${process.env.REACT_APP_API_URL}${GET_REFRESH_TOKEN}`, { refreshToken })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;
      secureLocalStorage.setItem(ACCESS_TOKEN, accessToken);
      secureLocalStorage.setItem(REFRESH_TOKEN, refreshToken);
      return Promise.resolve({accessToken, refreshToken});
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}


export default instance;
