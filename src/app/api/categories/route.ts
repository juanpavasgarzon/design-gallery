import { NextResponse } from "next/server";
import db from "@/lib/db/database";

export async function GET() {
  const rows = db.prepare("SELECT * FROM categories ORDER BY created_at ASC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json() as { name?: string };

  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const id = crypto.randomUUID();

  db.prepare("INSERT INTO categories (id, name) VALUES (?, ?)").run(id, body.name.trim());

  const row = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
  return NextResponse.json(row, { status: 201 });
}
