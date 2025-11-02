import { serviceUrl } from "../base/serviceUrl";

export const authUrl = {
  login: `${serviceUrl.AUTH}/login`,
  logout: `${serviceUrl.AUTH}/logout`,
  register: `${serviceUrl.AUTH}/register`,
  refresh: `${serviceUrl.AUTH}/refresh`,
};
