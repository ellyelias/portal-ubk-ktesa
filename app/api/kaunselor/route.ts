import { and, asc, desc, eq } from "drizzle-orm";
import { getAccessUser } from "../../access-auth";
import { getDb } from "../../../db";
import { conversations, messages } from "../../../db/schema";

// Counselor/admin allowlist comes from the KAUNSELOR_ROLES environment
// variable (see README.md) — not hardcoded, since this repo is public.
function loadRoles(): Map<string, string> {
  const raw = process.env.KAUNSELOR_ROLES ?? "";
  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [email, role] = entry.split(":").map((part) => part?.trim());
      return [email?.toLowerCase() ?? "", role ?? ""] as const;
    })
    .filter(([email, role]) => email && role);
  return new Map(entries);
}

async function portalUser() {
  const user = await getAccessUser();
  if (!user) return null;
  const role = loadRoles().get(user.email);
  return role ? { email: user.email, role } : null;
}
export async function GET(request: Request) {
  if (!await portalUser()) return Response.json({ error: "Akses tidak dibenarkan." }, { status: 403 });
  const db = getDb(); const url = new URL(request.url); const reference = url.searchParams.get("reference");
  if (reference) {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.referenceCode, reference)).limit(1);
    if (!conversation) return Response.json({ error: "Mesej tidak ditemui." }, { status: 404 });
    const rows = await db.select().from(messages).where(eq(messages.conversationId, conversation.id)).orderBy(asc(messages.createdAt), asc(messages.id));
    return Response.json({ conversation, messages: rows });
  }
  return Response.json({ conversations: await db.select().from(conversations).orderBy(desc(conversations.updatedAt), desc(conversations.id)).limit(100) });
}
export async function POST(request: Request) {
  const user = await portalUser(); if (!user) return Response.json({ error: "Akses tidak dibenarkan." }, { status: 403 });
  const data = await request.json() as { reference?: string; message?: string; status?: string };
  const reference = data.reference?.trim().toUpperCase() || ""; const body = data.message?.trim().slice(0, 2000) || "";
  const db = getDb(); const [conversation] = await db.select().from(conversations).where(eq(conversations.referenceCode, reference)).limit(1);
  if (!conversation) return Response.json({ error: "Mesej tidak ditemui." }, { status: 404 });
  if (body && user.role !== "kaunselor") return Response.json({ error: "Pentadbir tidak menghantar jawapan sebagai kaunselor." }, { status: 403 });
  if (body) await db.insert(messages).values({ conversationId: conversation.id, sender: "kaunselor", body });
  await db.update(conversations).set({ assignedTo: user.role === "kaunselor" ? user.email : conversation.assignedTo, status: data.status || "sedang dibantu", updatedAt: new Date().toISOString() }).where(eq(conversations.id, conversation.id));
  return Response.json({ ok: true });
}
