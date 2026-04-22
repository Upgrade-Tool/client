import client from "./client";

export type Office = {
  id: string;
  code: string;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOfficeRequest = {
  code: string;
  name: string;
  address: string;
};

export type UpdateOfficeRequest = {
  code: string;
  name: string;
  address: string;
};

export const officesApi = {
  getAll: (page = 1, pageSize = 20) =>
    client
      .get<Office[]>("/office", { params: { page, pageSize } })
      .then((r) => r.data),

  getById: (id: string) =>
    client.get<Office>(`/office/${id}`).then((r) => r.data),

  create: (data: CreateOfficeRequest) =>
    client.post<Office>("/office", data).then((r) => r.data),

  update: (id: string, data: UpdateOfficeRequest) =>
    client.put<Office>(`/office/${id}`, data).then((r) => r.data),

  delete: (id: string) => client.delete(`/office/${id}`),
};
