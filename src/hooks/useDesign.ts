"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDesign, getDesigns, createDesign, updateDesign, deleteDesign } from "@/services/designs.service";
import type { DesignInput } from "@/utils/designSchema";

export function useDesigns() {
  return useQuery({
    queryKey: ["designs"],
    queryFn: getDesigns,
  });
}

export function useDesign(id: string | undefined) {
  return useQuery({
    queryKey: ["design", id],
    queryFn: () => { return getDesign(id!); },
    enabled: !!id,
  });
}

export function useSaveDesign(id?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DesignInput) => {
      if (id) {
        return updateDesign(id, data);
      }
      return createDesign(data);
    },
    onSuccess: (_data, _variables) => {
      void queryClient.invalidateQueries({ queryKey: ["designs"] });
      if (id) {
        void queryClient.invalidateQueries({ queryKey: ["design", id] });
      }
    },
  });
}

export function useDeleteDesign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDesign,
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: ["designs"] });
      void queryClient.invalidateQueries({ queryKey: ["design", id] });
    },
  });
}
