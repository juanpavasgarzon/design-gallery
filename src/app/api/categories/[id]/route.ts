import { NextResponse } from "next/server";
import db from "@/lib/db/database";

type Params = Promise<{ id: string }>;

export async function DELETE(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const result = db.prepare("DELETE FROM categories WHERE id = ?").run(id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
