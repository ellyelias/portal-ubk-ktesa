import { env } from "cloudflare:workers";
import { and, desc, eq } from "drizzle-orm";
import { getAccessUser } from "../../../access-auth";
import { getDb } from "../../../../db";
import { counselorPosts } from "../../../../db/schema";

const TYPES = new Set(["coretan","poster","pengumuman"]);
const STATUSES = new Set(["draft","published"]);
const MAX_IMAGE = 8 * 1024 * 1024;

function loadRoles(): Map<string,string> {
  const raw = process.env.KAUNSELOR_ROLES ?? "";
  return new Map(raw.split(",").map(v=>v.trim()).filter(Boolean).map(entry=>{
    const [email,role]=entry.split(":").map(v=>v?.trim());
    return [email?.toLowerCase()||"",role||""] as const;
  }).filter(([email,role])=>email&&role));
}
async function portalUser(){
  const user=await getAccessUser();
  if(!user)return null;
  const email=user.email.toLowerCase();
  const role=loadRoles().get(email);
  return role?{email,role}:null;
}
function clean(value:FormDataEntryValue|null,max:number){
  return typeof value==="string"?value.trim().slice(0,max):"";
}
async function saveImage(file:File,postId?:number){
  if(!file.type.startsWith("image/"))throw new Error("Fail poster mestilah imej.");
  if(file.size>MAX_IMAGE)throw new Error("Saiz poster maksimum ialah 8 MB.");
  const ext=(file.name.split(".").pop()||"jpg").replace(/[^a-zA-Z0-9]/g,"").slice(0,8)||"jpg";
  const key=`coretan/${postId||"new"}-${Date.now()}-${crypto.randomUUID()}.${ext}`;
  await env.CORETAN_MEDIA!.put(key,await file.arrayBuffer(),{httpMetadata:{contentType:file.type}});
  return {key,name:file.name.slice(0,160),type:file.type};
}
const MEDIA_UNAVAILABLE_WARNING="Gambar belum dapat dimuat naik kerana storan poster belum disediakan. Coretan diterbitkan tanpa gambar.";
export async function GET(){
  const user=await portalUser();
  if(!user)return Response.json({error:"Akses tidak dibenarkan."},{status:403});
  const db=getDb();
  const rows=user.role==="admin"
    ? await db.select().from(counselorPosts).orderBy(desc(counselorPosts.updatedAt),desc(counselorPosts.id)).limit(100)
    : await db.select().from(counselorPosts).where(eq(counselorPosts.authorEmail,user.email))
        .orderBy(desc(counselorPosts.updatedAt),desc(counselorPosts.id)).limit(100);
  return Response.json({posts:rows.map(row=>({...row,imageUrl:row.imageKey?`/api/coretan/media/${encodeURIComponent(row.imageKey)}`:null}))});
}
export async function POST(request:Request){
  try{
    const user=await portalUser();
    if(!user)return Response.json({error:"Akses tidak dibenarkan."},{status:403});
    if(user.role!=="kaunselor")return Response.json({error:"Hanya kaunselor boleh menerbitkan Coretan Kaunselor."},{status:403});
    const form=await request.formData();
    const id=Number(clean(form.get("id"),20)||"0");
    const type=clean(form.get("type"),30).toLowerCase();
    const title=clean(form.get("title"),140);
    const body=clean(form.get("body"),12000);
    const authorName=clean(form.get("authorName"),80);
    const status=clean(form.get("status"),20).toLowerCase();
    const image=form.get("image");
    if(!TYPES.has(type))return Response.json({error:"Jenis posting tidak sah."},{status:400});
    if(!STATUSES.has(status))return Response.json({error:"Status tidak sah."},{status:400});
    if(!title)return Response.json({error:"Tajuk diperlukan."},{status:400});
    if(!body&&type!=="poster")return Response.json({error:"Kandungan diperlukan."},{status:400});
    if(!authorName)return Response.json({error:"Nama kaunselor diperlukan."},{status:400});
    const db=getDb(); const now=new Date().toISOString();
    if(id){
      const [existing]=await db.select().from(counselorPosts)
        .where(and(eq(counselorPosts.id,id),eq(counselorPosts.authorEmail,user.email))).limit(1);
      if(!existing)return Response.json({error:"Coretan tidak ditemui."},{status:404});
      let meta:null|{key:string;name:string;type:string}=null;
      let warning:string|null=null;
      if(image instanceof File&&image.size>0){
        if(!env.CORETAN_MEDIA){
          warning=MEDIA_UNAVAILABLE_WARNING;
        }else{
          meta=await saveImage(image,id);
          if(existing.imageKey)await env.CORETAN_MEDIA.delete(existing.imageKey).catch(()=>{});
        }
      }
      await db.update(counselorPosts).set({
        type,title,body,authorName,status,updatedAt:now,
        publishedAt:status==="published"?(existing.publishedAt||now):null,
        ...(meta?{imageKey:meta.key,imageName:meta.name,imageType:meta.type}:{})
      }).where(eq(counselorPosts.id,id));
      return Response.json({ok:true,id,...(warning?{warning}:{})});
    }
    let meta:null|{key:string;name:string;type:string}=null;
    let warning:string|null=null;
    if(image instanceof File&&image.size>0){
      if(!env.CORETAN_MEDIA){
        warning=MEDIA_UNAVAILABLE_WARNING;
      }else{
        meta=await saveImage(image);
      }
    }
    const [created]=await db.insert(counselorPosts).values({
      type,title,body,authorEmail:user.email,authorName,status,
      imageKey:meta?.key||null,imageName:meta?.name||null,imageType:meta?.type||null,
      createdAt:now,updatedAt:now,publishedAt:status==="published"?now:null
    }).returning({id:counselorPosts.id});
    return Response.json({ok:true,id:created.id,...(warning?{warning}:{})});
  }catch(err){
    console.error("Ralat menyimpan Coretan Kaunselor:",err);
    return Response.json({error:err instanceof Error?err.message:"Ralat pelayan semasa menyimpan coretan."},{status:500});
  }
}
export async function DELETE(request:Request){
  try{
    const user=await portalUser();
    if(!user)return Response.json({error:"Akses tidak dibenarkan."},{status:403});
    const id=Number(new URL(request.url).searchParams.get("id")||"0");
    if(!id)return Response.json({error:"ID tidak sah."},{status:400});
    const db=getDb();
    const [existing]=await db.select().from(counselorPosts).where(eq(counselorPosts.id,id)).limit(1);
    if(!existing)return Response.json({error:"Coretan tidak ditemui."},{status:404});
    if(user.role!=="admin"&&existing.authorEmail!==user.email)
      return Response.json({error:"Anda tidak boleh memadam coretan kaunselor lain."},{status:403});
    if(existing.imageKey&&env.CORETAN_MEDIA)await env.CORETAN_MEDIA.delete(existing.imageKey).catch(()=>{});
    await db.delete(counselorPosts).where(eq(counselorPosts.id,id));
    return Response.json({ok:true});
  }catch(err){
    console.error("Ralat memadam Coretan Kaunselor:",err);
    return Response.json({error:err instanceof Error?err.message:"Ralat pelayan semasa memadam coretan."},{status:500});
  }
}
