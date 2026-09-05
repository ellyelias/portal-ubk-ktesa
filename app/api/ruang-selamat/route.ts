import { and, asc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { conversations, messages } from "../../../db/schema";

const encoder = new TextEncoder();
async function hashPin(reference: string, pin: string) {
  const bytes = encoder.encode(`${reference}:${pin}:KTESA-UBK`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function makeReference() {
  return `RS-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}
function makePin() {
  const values = new Uint32Array(1); crypto.getRandomValues(values);
  return String(100000 + (values[0] % 900000));
}

export async function POST(request: Request) {
  const data = await request.json() as Record<string, unknown>;
  const topic = clean(data.topic, 100);
  const body = clean(data.message);
  if (!topic || body.length < 5) return Response.json({ error: "Sila pilih perkara dan tulis mesej anda." }, { status: 400 });
  const reference = makeReference();
  const pin = makePin();
  const db = getDb();
  const [conversation] = await db.insert(conversations).values({
    referenceCode: reference,
    pinHash: await hashPin(reference, pin),
    topic,
    displayName: clean(data.displayName, 80) || null,
    contactNumber: clean(data.contactNumber, 30) || null,
  }).returning();
  await db.insert(messages).values({ conversationId: conversation.id, sender: "pelajar", body });
  return Response.json({ reference, pin }, { status: 201 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference = clean(url.searchParams.get("reference"), 20).toUpperCase();
  const pin = clean(url.searchParams.get("pin"), 10);
  const db = getDb();
  const [conversation] = await db.select().from(conversations).where(and(eq(conversations.referenceCode, reference), eq(conversations.pinHash, await hashPin(reference, pin)))).limit(1);
  if (!conversation) return Response.json({ error: "Kod rujukan atau PIN tidak betul." }, { status: 404 });
  const rows = await db.select().from(messages).where(eq(messages.conversationId, conversation.id)).orderBy(asc(messages.createdAt), asc(messages.id));
  return Response.json({ conversation: { referenceCode: conversation.referenceCode, topic: conversation.topic, status: conversation.status }, messages: rows });
}

export async function PUT(request: Request) {
  const data = await request.json() as Record<string, unknown>;
  const reference = clean(data.reference, 20).toUpperCase();
  const pin = clean(data.pin, 10);
  const body = clean(data.message);
  if (body.length < 2) return Response.json({ error: "Sila tulis mesej." }, { status: 400 });
  const db = getDb();
  const [conversation] = await db.select().from(conversations).where(and(eq(conversations.referenceCode, reference), eq(conversations.pinHash, await hashPin(reference, pin)))).limit(1);
  if (!conversation) return Response.json({ error: "Kod rujukan atau PIN tidak betul." }, { status: 404 });
  await db.insert(messages).values({ conversationId: conversation.id, sender: "pelajar", body });
  await db.update(conversations).set({ status: "baharu", updatedAt: new Date().toISOString() }).where(eq(conversations.id, conversation.id));
  return Response.json({ ok: true });
}
