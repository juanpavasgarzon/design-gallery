import { NextResponse } from "next/server";
import db from "@/lib/db/database";

type Params = Promise<{ id: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const row = db.prepare("SELECT * FROM designs WHERE id = ?").get(id);

  if (!row) {
    return NextResponse.json({ error: "Design not found" }, { status: 404 });
  }
  return NextResponse.json(row);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const existing = db.prepare("SELECT id FROM designs WHERE id = ?").get(id);

  if (!existing) {
    return NextResponse.json({ error: "Design not found" }, { status: 404 });
  }

  const body = await request.json() as {
    title?: string;
    description?: string;
    embedUrl?: string;
    categoryId?: string;
  };

  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!body.embedUrl?.trim()) {
    return NextResponse.json({ error: "Embed URL is required" }, { status: 400 });
  }

  db.prepare(
    "UPDATE designs SET title = ?, description = ?, embed_url = ?, category_id = ? WHERE id = ?"
  ).run(
    body.title.trim(),
    body.description?.trim() ?? null,
    body.embedUrl.trim(),
    body.categoryId ?? null,
    id
  );

  const row = db.prepare("SELECT * FROM designs WHERE id = ?").get(id);
  return NextResponse.json(row);
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const result = db.prepare("DELETE FROM designs WHERE id = ?").run(id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Design not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
