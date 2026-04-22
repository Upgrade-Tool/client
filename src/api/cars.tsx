import client from "./client";

export type Drivetrain = "AWD" | "RWD" | "FWD";
export type Transmission = "Automatic" | "Manual";

export type Car = {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  groupId: string;
  groupCode: string;
  horsepower: number;
  rangeKm: number;
  drivetrain: Drivetrain;
  transmission: Transmission;
  carValueFactor: number;
  imageUrlSideLeft: string | null;
  imageUrlSideRight: string | null;
  imageUrlDisplay: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCarRequest = {
  name: string;
  brandId: string;
  groupId: string;
  horsepower: number;
  rangeKm: number;
  drivetrain: Drivetrain;
  transmission: Transmission;
  carValueFactor: number;
  imageUrlSideLeft: string | null;
  imageUrlSideRight: string | null;
  imageUrlDisplay: string | null;
};

export type UpdateCarRequest = CreateCarRequest;

export const carsApi = {
  getAll: (page = 1, pageSize = 20) =>
    client
      .get<Car[]>("/car", { params: { page, pageSize } })
      .then((r) => r.data),

  getById: (id: string) => client.get<Car>(`/car/${id}`).then((r) => r.data),

  create: (data: CreateCarRequest) =>
    client.post<Car>("/car", data).then((r) => r.data),

  update: (id: string, data: UpdateCarRequest) =>
    client.put<Car>(`/car/${id}`, data).then((r) => r.data),

  delete: (id: string) => client.delete(`/car/${id}`),

  toggleActive: (id: string) => client.patch(`/car/${id}/toggle-active`),
};
