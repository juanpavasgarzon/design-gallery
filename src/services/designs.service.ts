import api from "./api";
import type { Design } from "@/types/design";
import type { DesignInput } from "@/utils/designSchema";

export async function getDesigns(): Promise<Design[]> {
  const { data } = await api.get<Design[]>("/designs");
  return data;
}

export async function getDesign(id: string): Promise<Design> {
  const { data } = await api.get<Design>(`/designs/${id}`);
  return data;
}

export async function createDesign(payload: DesignInput): Promise<Design> {
  const { data } = await api.post<Design>("/designs", {
    title: payload.title,
    description: payload.description,
    embedUrl: payload.embedUrl,
    categoryId: payload.categoryId,
  });
  return data;
}

export async function updateDesign(id: string, payload: DesignInput): Promise<Design> {
  const { data } = await api.put<Design>(`/designs/${id}`, {
    title: payload.title,
    description: payload.description,
    embedUrl: payload.embedUrl,
    categoryId: payload.categoryId,
  });
  return data;
}

export async function deleteDesign(id: string): Promise<void> {
  await api.delete(`/designs/${id}`);
}
