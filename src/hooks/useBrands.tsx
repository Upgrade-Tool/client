import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { brandsApi } from "../api/brands";
import type { CreateBrandRequest, UpdateBrandRequest } from "../api/brands";

export const useBrands = (page = 1, pageSize = 20) =>
  useQuery({
    queryKey: ["brands", page, pageSize],
    queryFn: () => brandsApi.getAll(page, pageSize),
  });

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: brandsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBrandRequest }) =>
      brandsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: brandsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
