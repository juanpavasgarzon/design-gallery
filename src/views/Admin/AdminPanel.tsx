"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { useDesigns, useDeleteDesign } from "@/hooks/useDesign";
import { useCategories, useCreateCategory, useDeleteCategory } from "@/hooks/useCategory";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import { categorySchema } from "@/utils/categorySchema";
import type { CategoryInput } from "@/utils/categorySchema";
import type { Category } from "@/types/category";
import type { Design } from "@/types/design";
import { DesignRow } from "./DesignRow";
import { CategoryChip } from "./CategoryChip";
import { DesignForm } from "./DesignForm";
import { ConfirmDialog } from "./ConfirmDialog";
import type { ModalState, ConfirmState } from "./types";
import styles from "./AdminPanel.module.css";

export function AdminPanel() {
  const [modal, setModal] = useState<ModalState>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: designs = [], isLoading: designsLoading } = useDesigns();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const isLoading = designsLoading || categoriesLoading;
  const deleteDesign = useDeleteDesign();
  const deleteCategory = useDeleteCategory();
  const createCategory = useCreateCategory();

  const byCategory =
    categoryFilter === "all"
      ? designs
      : designs.filter((d: Design) => { return d.category_id === categoryFilter; });

  const { query, setQuery, results: filteredDesigns } = useSearch(byCategory);
  const { page, totalPages, paged, goTo, reset, total } = usePagination(filteredDesigns, 5);

  const catById = Object.fromEntries(
    categories.map((c: Category) => { return [c.id, c]; })
  );

  const {
    register: registerCat,
    handleSubmit: handleCatSubmit,
    reset: resetCat,
    formState: { errors: catErrors },
  } = useForm<CategoryInput>({ resolver: zodResolver(categorySchema) });

  const handleEditDesign = (design: Design) => {
    setModal({ type: "edit", design });
  };

  const handleDeleteDesign = (id: string, name: string) => {
    setConfirm({ kind: "design", id, name });
  };

  const handleDeleteCategory = (id: string, name: string) => {
    setConfirm({ kind: "category", id, name });
  };

  const handleConfirm = () => {
    if (!confirm) {
      return;
    }
    const mutation = confirm.kind === "design" ? deleteDesign : deleteCategory;
    mutation.mutate(confirm.id, {
      onSuccess: () => {
        setConfirm(null);
      },
    });
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    reset();
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    reset();
  };

  return (
    <main className={`wrap ${styles.admin}`}>
      <div className={styles.adminHead}>
        <h1 className={styles.adminTitle}>Admin</h1>
        <Button
          variant="primary"
          onClick={() => {
            setModal({ type: "new" });
          }}
        >
          <Plus size={15} /> New design
        </Button>
      </div>
      <p className={styles.adminSub}>Manage the gallery.</p>

      <section className={styles.section}>
        <div className={styles.sectionBar}>
          <h2 className={styles.sectionTitle}>Designs</h2>
          <span className={styles.sectionCount}>{designs.length} total</span>
        </div>

        <div className={styles.filters}>
          <SearchInput
            value={query}
            onChange={handleSearch}
            placeholder="Search by title or description…"
          />
          <select
            className={styles.categorySelect}
            value={categoryFilter}
            onChange={(e) => { handleCategoryFilter(e.target.value); }}
          >
            <option value="all">All categories</option>
            {categories.map((c: Category) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.list}>
          {isLoading ? (
            <div className={styles.loaderWrap}>
              <span className={styles.spinner} />
            </div>
          ) : filteredDesigns.length === 0 ? (
            <div className={styles.empty}>
              {query ? `No results for "${query}"` : "No designs yet. Create your first one."}
            </div>
          ) : (
            paged.map((d: Design) => {
              return (
                <DesignRow
                  key={d.id}
                  design={d}
                  category={catById[d.category_id ?? ""]}
                  onEdit={handleEditDesign}
                  onDelete={handleDeleteDesign}
                />
              );
            })
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={5}
          onPage={goTo}
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionBar}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <span className={styles.sectionCount}>{categories.length} total</span>
        </div>
        <div className={styles.chips}>
          {categories.length === 0 && (
            <span className={styles.sectionCount}>No categories.</span>
          )}
          {categories.map((c: Category) => {
            return (
              <CategoryChip key={c.id} category={c} onDelete={handleDeleteCategory} />
            );
          })}
        </div>
        <form
          className={styles.catAdd}
          onSubmit={handleCatSubmit((data: CategoryInput) => {
            createCategory.mutate(data, {
              onSuccess: () => {
                resetCat();
              },
            });
          })}
        >
          <Input
            {...registerCat("name")}
            className={styles.catAddInput}
            invalid={!!catErrors.name}
            placeholder="New category name…"
          />
          <Button variant="ghost" type="submit">
            <Plus size={14} /> Add
          </Button>
        </form>
      </section>

      {modal && (
        <DesignForm
          initial={modal.type === "edit" ? modal.design : undefined}
          onClose={() => {
            setModal(null);
          }}
        />
      )}

      {confirm && (
        <ConfirmDialog
          title={confirm.kind === "design" ? "Delete design" : "Delete category"}
          message={confirm.kind === "design" ? "Delete the design" : "Delete the category"}
          target={confirm.name}
          onConfirm={handleConfirm}
          onClose={() => {
            setConfirm(null);
          }}
        />
      )}
    </main>
  );
}
