"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowLeft,CalendarDays,Image as ImageIcon,Megaphone,PenLine} from "lucide-react";
type Post={id:number;type:string;title:string;body:string;imageUrl:string|null;authorName:string;publishedAt:string|null;createdAt:string};
function TypeIcon({type}:{type:string}){if(type==="poster")return <ImageIcon size={16}/>;if(type==="pengumuman")return <Megaphone size={16}/>;return <PenLine size={16}/>;}
export default function CoretanPage(){
 const[posts,setPosts]=useState<Post[]>([]);const[loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{try{const r=await fetch("/api/coretan",{cache:"no-store"});const d=await r.json();if(r.ok)setPosts(d.posts||[])}finally{setLoading(false)}})()},[]);
 return <main className="coretan-page"><header className="coretan-hero"><div className="shell">
 <Link href="/" className="coretan-back"><ArrowLeft/> Kembali ke portal</Link>
 <span className="coretan-kicker">UNIT BIMBINGAN DAN KAUNSELING KTESA</span><h1>Coretan Kaunselor</h1>
 <p>Pesanan, perkongsian dan pengumuman daripada kaunselor KTESA.</p></div></header>
 <section className="shell coretan-list-section">{loading&&<p className="coretan-empty">Memuatkan coretan...</p>}
 {!loading&&posts.length===0&&<p className="coretan-empty">Belum ada coretan diterbitkan.</p>}
 <div className="coretan-grid">{posts.map(post=><article className="coretan-card" key={post.id}>
 {post.imageUrl&&<img src={post.imageUrl} alt={post.title}/>}<div className="coretan-card-body">
 <span className={`coretan-type ${post.type}`}><TypeIcon type={post.type}/>{post.type}</span><h2>{post.title}</h2>
 <p className="coretan-body">{post.body}</p><div className="coretan-meta"><strong>{post.authorName}</strong>
 <span><CalendarDays size={14}/>{new Date(post.publishedAt||post.createdAt).toLocaleDateString("ms-MY",{day:"numeric",month:"long",year:"numeric"})}</span></div>
 </div></article>)}</div></section></main>
}
