import api from "./api";
import type { Category } from "@/types/category";
import type { CategoryInput } from "@/utils/categorySchema";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}

export async function createCategory(payload: CategoryInput): Promise<Category> {
  const { data } = await api.post<Category>("/categories", { name: payload.name });
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
