"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { useCategories } from "@/hooks/useCategory";
import { useSaveDesign } from "@/hooks/useDesign";
import { designSchema } from "@/utils/designSchema";
import type { DesignInput } from "@/utils/designSchema";
import type { Design } from "@/types/design";
import type { Category } from "@/types/category";

interface DesignFormProps {
  initial?: Design;
  onClose: () => void;
}

export function DesignForm({ initial, onClose }: DesignFormProps) {
  const { data: categories = [] } = useCategories();
  const mutation = useSaveDesign(initial?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DesignInput>({
    resolver: zodResolver(designSchema),
    defaultValues: initial
      ? {
          title: initial.title,
          categoryId: initial.category_id ?? "",
          description: initial.description ?? "",
          embedUrl: initial.embed_url,
        }
      : undefined,
  });

  return (
    <Modal
      title={initial ? "Edit design" : "New design"}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="design-form" disabled={isSubmitting}>
            {initial ? "Save changes" : "Create design"}
          </Button>
        </>
      }
    >
      <form
        id="design-form"
        onSubmit={handleSubmit((data: DesignInput) => {
          mutation.mutate(data, { onSuccess: onClose });
        })}
      >
        <Field label="Title" error={errors.title?.message}>
          <Input
            {...register("title")}
            invalid={!!errors.title}
            placeholder="e.g. Smart Scale Node"
          />
        </Field>

        <Field label="Category" error={errors.categoryId?.message}>
          <Select {...register("categoryId")} invalid={!!errors.categoryId}>
            <option value="">Select…</option>
            {categories.map((c: Category) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </Select>
        </Field>

        <Field label="Description">
          <Textarea
            {...register("description")}
            rows={12}
            placeholder="Detailed write-up shown on the design page (optional)"
          />
        </Field>

        <Field label="Embed URL" error={errors.embedUrl?.message}>
          <Input
            {...register("embedUrl")}
            invalid={!!errors.embedUrl}
            placeholder="https://…"
            style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}
          />
        </Field>
      </form>
    </Modal>
  );
}
