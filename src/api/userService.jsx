// import secureLocalStorage from "react-secure-storage";
import { secureLocalStorage } from "helpers/secureLocalStorage";
const ACCESS_TOKEN = 'userservice-jwt-access';
const REFRESH_TOKEN = 'userservice-jwt-refresh';
const USER_OBJ = 'userObj';
const IS_AUTHENTICATED = 'isAuthenticated';

export const logoutUser = () => {
  // Clear any stored tokens or user data
  secureLocalStorage.clear();
}

export const loginUser = ({
  accessToken,
  refreshToken,
  userObject
}) => {
  // Clear any stored tokens or user data
  secureLocalStorage.setItem(ACCESS_TOKEN, accessToken);
  secureLocalStorage.setItem(REFRESH_TOKEN, refreshToken);
  secureLocalStorage.setItem(IS_AUTHENTICATED, 1);
  secureLocalStorage.setItem(USER_OBJ, userObject);
}