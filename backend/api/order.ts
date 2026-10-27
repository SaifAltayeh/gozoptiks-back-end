import { NextResponse } from "next/server";
import { updateOrder } from "@/backend/database";
import { requireAdmin } from "@/backend/require-admin";
import { revalidateStorefront } from "@/backend/revalidate";
import type { Order } from "@/backend/models";

export async function PATCH(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { reference } = await params;
  const patch = (await request.json()) as Partial<Order>;
  const order = updateOrder(decodeURIComponent(reference), patch);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidateStorefront();
  return NextResponse.json(order);
}
