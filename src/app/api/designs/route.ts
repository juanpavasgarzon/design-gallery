import { NextResponse } from "next/server";
import db from "@/lib/db/database";

export async function GET() {
  const rows = db.prepare("SELECT * FROM designs ORDER BY created_at DESC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
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

  const id = crypto.randomUUID();

  db.prepare(
    "INSERT INTO designs (id, title, description, embed_url, category_id) VALUES (?, ?, ?, ?, ?)"
  ).run(
    id,
    body.title.trim(),
    body.description?.trim() ?? null,
    body.embedUrl.trim(),
    body.categoryId ?? null
  );

  const row = db.prepare("SELECT * FROM designs WHERE id = ?").get(id);
  return NextResponse.json(row, { status: 201 });
}
