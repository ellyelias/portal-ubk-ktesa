import { env } from "cloudflare:workers";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params;
  if (!env.CORETAN_MEDIA) return new Response("Storage poster belum dikonfigurasi.", {status:503});
  const object = await env.CORETAN_MEDIA.get(key);
  if (!object) return new Response("Poster tidak ditemui.", {status:404});
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=86400");
  return new Response(object.body, {headers});
}
