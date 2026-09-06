"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowRight,CalendarDays,Image as ImageIcon,Megaphone,PenLine} from "lucide-react";
type Post={id:number;type:string;title:string;body:string;imageUrl:string|null;authorName:string;publishedAt:string|null;createdAt:string};
function Icon({type}:{type:string}){if(type==="poster")return <ImageIcon/>;if(type==="pengumuman")return <Megaphone/>;return <PenLine/>;}
export default function HomeCoretan(){
 const[posts,setPosts]=useState<Post[]>([]);
 useEffect(()=>{fetch("/api/coretan?limit=3",{cache:"no-store"}).then(r=>r.json()).then(d=>setPosts(d.posts||[])).catch(()=>{})},[]);
 return <section className="home-coretan section"><div className="shell">
 <div className="section-heading coretan-heading-row"><div><span>CORETAN KAUNSELOR</span><h2>Secebis kata<br/>untuk anda.</h2><p>Pesanan, perkongsian dan pengumuman daripada Unit Bimbingan dan Kaunseling KTESA.</p></div>
 {posts.length>0&&<Link href="/coretan">Lihat semua coretan <ArrowRight size={16}/></Link>}</div>
 {posts.length===0?<p className="coretan-empty-hint">Coretan daripada kaunselor akan muncul di sini.</p>:<>
 <div className="home-coretan-grid">{posts.map(post=><article key={post.id} className="home-coretan-card">
 {post.imageUrl&&<img src={post.imageUrl} alt={post.title}/>}<div><span className={`coretan-type ${post.type}`}><Icon type={post.type}/>{post.type}</span>
 <h3>{post.title}</h3><p>{post.body.length>180?post.body.slice(0,180)+"…":post.body}</p>
 <footer><strong>{post.authorName}</strong><span><CalendarDays size={13}/>{new Date(post.publishedAt||post.createdAt).toLocaleDateString("ms-MY")}</span></footer>
 </div></article>)}</div><Link className="coretan-mobile-more" href="/coretan">Lihat semua coretan <ArrowRight size={16}/></Link>
 </>}
 </div></section>
}
