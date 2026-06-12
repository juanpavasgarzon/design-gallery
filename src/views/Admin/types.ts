import type { Design } from "@/types/design";

export type ModalState =
  | { type: "new" }
  | { type: "edit"; design: Design }
  | null;

export type ConfirmState =
  | { kind: "design"; id: string; name: string }
  | { kind: "category"; id: string; name: string }
  | null;
