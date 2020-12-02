import httpClient from "./core/httpClient";
import { IHttpRequest } from "./core/interfase";

class CategoryService {
  getCategories(params: any) {
    const axiosConfig: IHttpRequest<any> = {
      path: "/inventory/categories/",
      method: "get",
      params: params,
    };
    return httpClient.request(axiosConfig);
  }
}

export default new CategoryService();
