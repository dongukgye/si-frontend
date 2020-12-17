import { ICategory } from '@/types/inventory';
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

createCategory(data: ICategory): Promise<ICategory> {
    const params: IHttpRequest<any> = {
      path: "/inventory/categories/",
      method: "post",
      data: data,
    };
    return httpClient.request<ICategory>(params);
  }

  updateCategory(data: ICategory): Promise<ICategory> {
    const params: IHttpRequest<any> = {
      path: `/inventory/category/${data.id}/`,
      method: "put",
      data: data,
    };
    return httpClient.request(params);
  }

  deleteCategory(data: ICategory): Promise<ICategory> {
    const params: IHttpRequest<any> = {
      path: `/inventory/category/${data.id}/`,
      method: "delete",
      data: data,
    };
    return httpClient.request<ICategory>(params);
  }
}

export default new CategoryService();
