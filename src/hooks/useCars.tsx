import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "../api/cars";
import type { CreateCarRequest, UpdateCarRequest } from "../api/cars";

export const useCars = (page = 1, pageSize = 20) =>
  useQuery({
    queryKey: ["cars", page, pageSize],
    queryFn: () => carsApi.getAll(page, pageSize),
  });

export const useCreateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCarRequest) => carsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarRequest }) =>
      carsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => carsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};

export const useToggleActiveCar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => carsApi.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};
