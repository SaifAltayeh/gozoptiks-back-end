import { NextResponse } from "next/server";
import { addOrder, loadCatalog } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Order } from "@/backend/models";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json((await loadCatalog()).orders);
}

export async function POST(request: Request) {
  const order = (await request.json()) as Order;
  if (!order?.reference || !order.items?.length) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }
  const saved = await addOrder(order);
  revalidateStorefront();
  return NextResponse.json(saved, { status: 201 });
}
