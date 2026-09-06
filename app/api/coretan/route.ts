import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { counselorPosts } from "../../../db/schema";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const db = getDb();
  const url = new URL(request.url);
  const rawLimit = Number(url.searchParams.get("limit") || "50");
  const limit = Math.max(1, Math.min(Number.isFinite(rawLimit) ? rawLimit : 50, 100));
  const rows = await db.select().from(counselorPosts)
    .where(eq(counselorPosts.status, "published"))
    .orderBy(desc(counselorPosts.publishedAt), desc(counselorPosts.id))
    .limit(limit);
  return Response.json({posts: rows.map(row => ({
    ...row,
    imageUrl: row.imageKey ? `/api/coretan/media/${encodeURIComponent(row.imageKey)}` : null
  }))});
}
