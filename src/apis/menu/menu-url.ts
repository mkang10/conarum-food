import { serviceUrl } from "../base/serviceUrl";

export const menuUrl = {
  getAll: `${serviceUrl.MEAL}/Menus`, // GET
  getById: (id: string | number) =>
  `${serviceUrl.MEAL}/Menus('${id}')?$expand=meals($expand=Meal)`, //GET
  create: `${serviceUrl.MEAL}/createMenuWithMeals`, // POST
  update: (id: string | number) => `${serviceUrl.MEAL}/Menus/${id}`, // PUT
  patch: (id: string | number) => `${serviceUrl.MEAL}/Menus/${id}`, // PATCH
  delete: (id: string | number) => `${serviceUrl.MEAL}/Menus/${id}`, // DELETE
  bulkUpdate: `${serviceUrl.MEAL}/BulkUpdateMenus`, //POST
};
