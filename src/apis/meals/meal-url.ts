import { serviceUrl } from "../base/serviceUrl";

export const mealUrl = {
  getAll: `${serviceUrl.MEAL}/Meals`, // GET
  getById: (id: string | number) => `${serviceUrl.MEAL}/Meals/${id}`, // GET
  create: `${serviceUrl.MEAL}/Meals`, // POST
  update: (id: string | number) => `${serviceUrl.MEAL}/Meals/${id}`, // PUT
  patch: (id: string | number) => `${serviceUrl.MEAL}/Meals/${id}`, // PATCH
  delete: (id: string | number) => `${serviceUrl.MEAL}/Meals/${id}`, // DELETE
  bulkUpdate: `${serviceUrl.MEAL}/BulkUpdateMeals`, //POST
  uploadMeal: `${serviceUrl.MEAL}/upload-meal`, // POST
};
