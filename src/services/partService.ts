import httpClient from "@/services/core/httpClient";
import { IHttpRequest, IHttpResponse } from "@/services/core/interfase";
import { IPart } from "@/types/inventory";

// - TODO: add params for getParts() API

class PartService {
  getParts(params: any) {
    const axiosConfig: IHttpRequest<any> = {
      path: "/inventory/parts/",
      method: "get",
      params: params,
    };
    return httpClient.request(axiosConfig);
  }

  createPart(data: IPart): Promise<IPart> {
    const params: IHttpRequest<any> = {
      path: "/inventory/parts/",
      method: "post",
      data: data,
    };
    return httpClient.request<IPart>(params);
  }

  updatePart(data: IPart): Promise<IPart> {
    const params: IHttpRequest<any> = {
      path: `/inventory/part/${data.id}/`,
      method: "put",
      data: data,
    };
    return httpClient.request(params);
  }

  deletePart(data: IPart): Promise<IPart> {
    const params: IHttpRequest<any> = {
      path: `/inventory/part/${data.id}/`,
      method: "delete",
      data: data,
    };
    return httpClient.request<IPart>(params);
  }
  
  createPartBulk(data: any) {
    const params: IHttpRequest<any> = {
      path: `/inventory/parts/bulk/`,
      method: "put",
      data: data,
    };
    return httpClient.request(params);

    // return axios.put(BASE_URL + `/parts/bulk/`, data)
}
}

export default new PartService();
