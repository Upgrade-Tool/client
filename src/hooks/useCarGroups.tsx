import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carGroupsApi } from "../api/carGroups";
import type {
  UpdateCarGroupRequest,
  CreateCarGroupRequest,
} from "../api/carGroups";

export const useCarGroups = (page = 1, pageSize = 20) =>
  useQuery({
    queryKey: ["carGroups", page, pageSize],
    queryFn: () => carGroupsApi.getAll(page, pageSize),
  });

export const useCreateCarGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCarGroupRequest) => carGroupsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carGroups"] });
    },
  });
};

export const useUpdateCarGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarGroupRequest }) =>
      carGroupsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carGroups"] });
    },
  });
};

export const useDeleteCarGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => carGroupsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carGroups"] });
    },
  });
};
