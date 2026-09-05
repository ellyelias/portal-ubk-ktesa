import { sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { siteStats } from "../../../db/schema";

const STAT_KEYS = ["visits", "vision_downloads"] as const;
type StatKey = (typeof STAT_KEYS)[number];

function isStatKey(value: unknown): value is StatKey {
  return typeof value === "string" && (STAT_KEYS as readonly string[]).includes(value);
}

async function readStats(db: ReturnType<typeof getDb>) {
  const rows = await db.select().from(siteStats);
  const result: Record<StatKey, number> = { visits: 0, vision_downloads: 0 };
  for (const row of rows) {
    if (isStatKey(row.key)) result[row.key] = row.count;
  }
  return result;
}

export async function GET() {
  const db = getDb();
  return Response.json(await readStats(db));
}

export async function POST(request: Request) {
  const data = (await request.json().catch(() => ({}))) as { key?: string };
  if (!isStatKey(data.key)) {
    return Response.json({ error: "Statistik tidak sah." }, { status: 400 });
  }
  const db = getDb();
  await db
    .insert(siteStats)
    .values({ key: data.key, count: 1 })
    .onConflictDoUpdate({
      target: siteStats.key,
      set: { count: sql`${siteStats.count} + 1` },
    });
  return Response.json(await readStats(db));
}
