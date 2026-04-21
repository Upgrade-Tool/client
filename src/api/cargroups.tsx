import client from "./client";

export type CarGroup = {
  id: string;
  code: string;
  name: string;
  drivetrainType: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateCarGroupRequest = {
  code: string;
  name: string;
  drivetrainType: string;
  sortOrder: number;
};

export type UpdateCarGroupRequest = {
  code: string;
  name: string;
  drivetrainType: string;
  sortOrder: number;
};

export const carGroupsApi = {
  getAll: (page = 1, pageSize = 20) =>
    client
      .get<CarGroup[]>("/cargroup", { params: { page, pageSize } })
      .then((r) => r.data),

  getById: (id: string) =>
    client.get<CarGroup>(`/cargroup/${id}`).then((r) => r.data),

  create: (data: CreateCarGroupRequest) =>
    client.post<CarGroup>("/cargroup", data).then((r) => r.data),

  update: (id: string, data: UpdateCarGroupRequest) =>
    client.put<CarGroup>(`/cargroup/${id}`, data).then((r) => r.data),

  delete: (id: string) => client.delete(`/cargroup/${id}`),
};
