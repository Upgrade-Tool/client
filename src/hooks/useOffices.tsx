import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { officesApi } from "../api/offices";
import type { UpdateOfficeRequest, CreateOfficeRequest } from "../api/offices";

export const useOffices = (page = 1, pageSize = 20) =>
  useQuery({
    queryKey: ["offices", page, pageSize],
    queryFn: () => officesApi.getAll(page, pageSize),
  });

export const useCreateOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOfficeRequest) => officesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
  });
};

export const useUpdateOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOfficeRequest }) =>
      officesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
  });
};

export const useDeleteOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => officesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
  });
};
