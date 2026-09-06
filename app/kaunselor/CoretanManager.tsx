"use client";
import {FormEvent,useEffect,useState} from "react";
import {Edit3,ImagePlus,Megaphone,PenLine,Plus,Save,Trash2,X} from "lucide-react";
type Post={id:number;type:string;title:string;body:string;imageUrl:string|null;authorEmail:string;authorName:string;status:string;updatedAt:string};
export default function CoretanManager({email,role}:{email:string;role:string}){
 const[posts,setPosts]=useState<Post[]>([]);const[editing,setEditing]=useState<Post|null>(null);const[open,setOpen]=useState(false);const[busy,setBusy]=useState(false);const[error,setError]=useState("");const[success,setSuccess]=useState("");
 async function load(){try{const r=await fetch("/kaunselor/coretan/api",{cache:"no-store"});const d=await r.json();if(r.ok)setPosts(d.posts||[]);else setError(d.error||"Gagal memuatkan coretan.")}catch(err){console.error("Ralat memuatkan senarai Coretan Kaunselor:",err);setError("Gagal memuatkan senarai coretan.")}}
 useEffect(()=>{load()},[]);
 function newPost(){setEditing(null);setOpen(true);setError("");setSuccess("")} function edit(post:Post){setEditing(post);setOpen(true);setError("");setSuccess("")}
 async function submit(form:HTMLFormElement,status:string){
  if(busy)return;
  setBusy(true);setError("");setSuccess("");
  try{
   const fd=new FormData(form);if(editing)fd.set("id",String(editing.id));fd.set("status",status);
   const r=await fetch("/kaunselor/coretan/api",{method:"POST",body:fd});
   const text=await r.text();let d:any={};try{d=text?JSON.parse(text):{}}catch{}
   if(!r.ok)throw new Error(d?.error||text||`Ralat pelayan (${r.status}).`);
   setOpen(false);setEditing(null);
   setSuccess(status==="published"?"Coretan berjaya diterbitkan.":"Draf berjaya disimpan.");
   await load();
  }catch(err){
   console.error("Ralat menerbitkan Coretan Kaunselor:",err);
   setError(err instanceof Error?err.message:"Ralat tidak diketahui semasa menyimpan coretan.");
  }finally{
   setBusy(false);
  }
 }
 async function save(e:FormEvent<HTMLFormElement>){e.preventDefault();await submit(e.currentTarget,"published")}
 async function remove(id:number){
  if(!confirm("Padam coretan ini?"))return;
  try{
   const r=await fetch(`/kaunselor/coretan/api?id=${id}`,{method:"DELETE"});
   const d=await r.json().catch(()=>({}));
   if(!r.ok){setError(d.error||"Gagal memadam.");return}
   setSuccess("Coretan dipadam.");
   await load();
  }catch(err){console.error("Ralat memadam Coretan Kaunselor:",err);setError("Gagal memadam coretan.")}
 }
 return <section className="coretan-manager"><div className="coretan-manager-head"><div><small>CORETAN KAUNSELOR</small><h2>Perkongsian untuk pelajar</h2><p>Tulis motivasi, terbitkan pengumuman atau kongsi poster.</p></div>
 {role==="kaunselor"&&<button className="coretan-new-btn" onClick={newPost}><Plus/> Coretan baharu</button>}</div>{error&&<p className="form-error">{error}</p>}{success&&<p className="form-success">{success}</p>}
 {open&&role==="kaunselor"&&<form className="coretan-editor" onSubmit={save}><header><h3>{editing?"Edit coretan":"Coretan baharu"}</h3><button type="button" onClick={()=>setOpen(false)}><X/></button></header>
 <div className="coretan-form-grid"><label>Jenis<select name="type" defaultValue={editing?.type||"coretan"}><option value="coretan">Coretan</option><option value="poster">Poster</option><option value="pengumuman">Pengumuman</option></select></label>
 <label>Nama dipaparkan<input name="authorName" required maxLength={80} defaultValue={editing?.authorName||""} placeholder="Contoh: Pn Fadzilah"/></label></div>
 <label>Tajuk<input name="title" required maxLength={140} defaultValue={editing?.title||""}/></label>
 <label>Kandungan<textarea name="body" rows={8} maxLength={12000} defaultValue={editing?.body||""} placeholder="Tulis pesanan kepada pelajar..."/></label>
 <label className="coretan-upload"><ImagePlus/> Poster / gambar<input type="file" name="image" accept="image/*"/><small>Maksimum 8 MB. JPG, PNG atau WebP digalakkan.</small></label>
 {editing?.imageUrl&&<img className="coretan-editor-preview" src={editing.imageUrl} alt="Poster semasa"/>}
 <footer><button type="button" disabled={busy} onClick={e=>{const f=e.currentTarget.closest("form") as HTMLFormElement|null;if(f)submit(f,"draft")}}><Save/> Simpan draf</button>
 <button className="publish" disabled={busy} type="submit"><Megaphone/> {busy?"Menghantar...":editing?.status==="published"?"Kemas kini":"Terbitkan"}</button></footer></form>}
 <div className="coretan-admin-list">{posts.map(post=><article key={post.id}>{post.imageUrl?<img src={post.imageUrl} alt=""/>:<span className="coretan-placeholder"><PenLine/></span>}
 <div><span className={`coretan-type ${post.type}`}>{post.type}</span><h3>{post.title}</h3><p>{post.authorName} · {post.status==="published"?"Diterbitkan":"Draf"}</p></div>
 <div className="coretan-row-actions">{role==="kaunselor"&&post.authorEmail===email.toLowerCase()&&<button onClick={()=>edit(post)}><Edit3/> Edit</button>}
 {(role==="admin"||post.authorEmail===email.toLowerCase())&&<button onClick={()=>remove(post.id)}><Trash2/> Padam</button>}</div></article>)}
 {posts.length===0&&<p className="coretan-empty">Belum ada coretan.</p>}</div></section>
}
