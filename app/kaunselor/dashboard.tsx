"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import CoretanManager from "./CoretanManager";
import { ArrowLeft, Inbox, LogOut, MessageSquareReply, RefreshCw, Send } from "lucide-react";

type Conversation = { id:number; referenceCode:string; topic:string; displayName:string|null; contactNumber:string|null; assignedTo:string|null; status:string; createdAt:string; updatedAt:string };
type Detail = { conversation:Conversation; messages:Array<{id:number;sender:string;body:string;createdAt:string}> };
export default function CounselorDashboard({email,role}:{email:string;role:string}) {
 const [view,setView]=useState<"mesej"|"coretan">("mesej");
 const [items,setItems]=useState<Conversation[]>([]); const [selected,setSelected]=useState<Detail|null>(null); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [success,setSuccess]=useState("");
 async function loadList(){setBusy(true);try{const r=await fetch("/kaunselor/api",{cache:"no-store"});const d=await r.json();if(!r.ok)return setError(d.error||"Gagal memuatkan senarai mesej.");setItems(d.conversations)}catch(err){console.error("Ralat memuatkan senarai mesej pelajar:",err);setError("Gagal memuatkan senarai mesej.")}finally{setBusy(false)}}
 async function open(reference:string){setBusy(true);setError("");try{const r=await fetch(`/kaunselor/api?reference=${encodeURIComponent(reference)}`,{cache:"no-store"});const d=await r.json();if(!r.ok)return setError(d.error||"Gagal membuka mesej.");setSelected(d)}catch(err){console.error("Ralat membuka mesej pelajar:",err);setError("Gagal membuka mesej.")}finally{setBusy(false)}}
 async function send(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(!selected)return;
  const form=e.currentTarget;
  setBusy(true);setError("");setSuccess("");
  try{
   const f=new FormData(form);
   const r=await fetch("/kaunselor/api",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({reference:selected.conversation.referenceCode,message:f.get("message")})});
   const text=await r.text();let d:any={};try{d=text?JSON.parse(text):{}}catch{}
   if(!r.ok)throw new Error(d?.error||text||`Ralat pelayan (${r.status}).`);
   form.reset();
   setSuccess("Jawapan berjaya dihantar kepada pelajar.");
   await open(selected.conversation.referenceCode);
   await loadList();
  }catch(err){
   console.error("Ralat menghantar jawapan kaunselor:",err);
   setError(err instanceof Error?err.message:"Ralat tidak diketahui semasa menghantar jawapan.");
  }finally{
   setBusy(false);
  }
 }
 async function finish(){
  if(!selected)return;
  setError("");setSuccess("");
  try{
   const r=await fetch("/kaunselor/api",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({reference:selected.conversation.referenceCode,status:"selesai"})});
   const text=await r.text();let d:any={};try{d=text?JSON.parse(text):{}}catch{}
   if(!r.ok)throw new Error(d?.error||text||`Ralat pelayan (${r.status}).`);
   setSuccess("Perbualan ditandakan selesai.");
   await open(selected.conversation.referenceCode);
   await loadList();
  }catch(err){
   console.error("Ralat menandakan perbualan selesai:",err);
   setError(err instanceof Error?err.message:"Gagal menandakan selesai.");
  }
 }
 useEffect(()=>{loadList();const timer=setInterval(loadList,60000);return()=>clearInterval(timer)},[]);
 return <main className="dashboard-page"><header className="dashboard-top"><div><Link href="/"><ArrowLeft/> Portal</Link><h1>{role==="admin"?"Dashboard Pentadbir":"Dashboard Kaunselor"}</h1><p>{email} · {role==="admin"?"Pentadbir Portal":"Kaunselor"}</p></div><div><button onClick={loadList}><RefreshCw/> Muat semula</button><a href="/cdn-cgi/access/logout"><LogOut/> Log keluar</a></div></header><div className="coretan-dashboard-tabs"><button className={view==="mesej"?"active":""} onClick={()=>setView("mesej")}>Mesej Pelajar</button><button className={view==="coretan"?"active":""} onClick={()=>setView("coretan")}>Coretan Kaunselor</button></div>{view==="coretan"?<CoretanManager email={email} role={role}/>:<div className="dashboard-layout"><aside><div className="inbox-title"><Inbox/><strong>Mesej pelajar</strong><span>{items.filter(i=>i.status==="baharu").length} baharu</span></div><div className="conversation-list">{items.map(i=><button key={i.id} data-status={i.status} className={selected?.conversation.id===i.id?"active":""} onClick={()=>open(i.referenceCode)}><span><strong>{i.topic}</strong><small>{i.referenceCode} · {i.displayName||"Tanpa nama"}</small></span><em>{i.status}</em></button>)}{!busy&&items.length===0&&<p>Belum ada mesej.</p>}</div></aside><section className="dashboard-thread">{!selected?<div className="empty-thread"><MessageSquareReply/><h2>Pilih mesej untuk dibaca</h2><p>{role==="admin"?"Akses pentadbir adalah untuk pemantauan dan pengurusan portal.":"Mesej baharu akan muncul di sebelah kiri."}</p></div>:<><header><div><small>{selected.conversation.referenceCode}</small><h2>{selected.conversation.topic}</h2><p>{selected.conversation.displayName||"Tanpa nama"}{selected.conversation.contactNumber?` · ${selected.conversation.contactNumber}`:""}</p></div><button onClick={finish}>Tandakan selesai</button></header><div className="message-list">{selected.messages.map(m=><div key={m.id} className={`message-bubble ${m.sender}`}><small>{m.sender==="kaunselor"?"Kaunselor":"Pelajar"}</small><p>{m.body}</p></div>)}</div>{error&&<p className="form-error">{error}</p>}{success&&<p className="form-success">{success}</p>}{role==="kaunselor"?<form onSubmit={send}><textarea name="message" required rows={4} placeholder="Tulis jawapan kepada pelajar..."/><button disabled={busy}><Send/> {busy?"Menghantar...":"Hantar jawapan"}</button></form>:<p className="admin-notice">Pentadbir boleh memantau dan mengurus status. Jawapan kepada pelajar dihantar oleh kaunselor.</p>}</>}</section></div>}</main>
}
