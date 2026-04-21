import client from "./client";

export type Brand = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBrandRequest = {
  name: string;
};

export type UpdateBrandRequest = {
  name: string;
};

export const brandsApi = {
  getAll: (page = 1, pageSize = 20) =>
    client
      .get<Brand[]>("/brand", { params: { page, pageSize } })
      .then((r) => r.data),

  getById: (id: string) =>
    client.get<Brand>(`/brand/${id}`).then((r) => r.data),

  create: (data: CreateBrandRequest) =>
    client.post<Brand>("/brand", data).then((r) => r.data),

  update: (id: string, data: UpdateBrandRequest) =>
    client.put<Brand>(`/brand/${id}`, data).then((r) => r.data),

  delete: (id: string) => client.delete(`/brand/${id}`),
};
