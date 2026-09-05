"use client";
import {useState} from "react";
import Link from "next/link";
import {ArrowRight,BarChart3,BookOpenCheck,BriefcaseBusiness,Calculator,CalendarDays,ChevronRight,GraduationCap,HandHeart,HeartHandshake,Menu,MessageCircleHeart,ShieldCheck,Sparkles,Target,UserRound,X} from "lucide-react";

const links=[
  [CalendarDays,"Temujanji Kaunselor","Pilih kaunselor dan hubungi melalui WhatsApp","blue","/temujanji"],
  [HandHeart,"Ruang Selamat","Mohon bantuan secara sulit atau tanpa nama","rose","/ruang-selamat"],
  [Target,"SASAR KTESA","Tetapkan sasaran dan anggar keputusan STPM","gold","/sasar"],
  [GraduationCap,"Hala Tuju UPU","Semakan UPU, merit dan carian program","teal","/upu"],
  [BriefcaseBusiness,"Laluan Kerjaya","Semak subjek dan sasaran untuk kerjaya pilihan","blue","/laluan"],
  [Sparkles,"Vision Dashboard","Bina dan muat turun Vision Board Impianku, Cita-citaku","rose","/vision"],
  [BarChart3,"Destinasi Lepasan KTESA","Lihat ringkasan tawaran UPU STPM 2025","gold","/destinasi"]
] as const;
const services=[
  [MessageCircleHeart,"Bimbingan Individu","Ruang perbincangan peribadi bersama kaunselor.","/temujanji"],
  [BookOpenCheck,"Perancangan Akademik","Kira sasaran STPM dan merit kemasukan UPU.","/sasar"],
  [HeartHandshake,"Sokongan Kesejahteraan","Bimbingan emosi, sosial dan penyesuaian diri.","/ruang-selamat"]
] as const;

export default function Home(){
 const [menu,setMenu]=useState(false); const [subject,setSubject]=useState("900 Pengajian Am");
 return <main>
  <header className="topbar"><div className="shell nav-wrap">
   <a className="brand" href="#utama"><span className="brand-logo"><img src="/logo-ktesa-terkini.jpeg" alt="Logo rasmi KTESA" width={48} height={48}/></span><span><strong>PORTAL UBK</strong><small>KTESA · SHAH ALAM</small></span></a>
   <nav className={menu?"nav-links open":"nav-links"}><a href="#utama">Utama</a><a href="#perkhidmatan">Perkhidmatan</a><Link href="/laluan">Kerjaya</Link><Link href="/destinasi">Destinasi</Link><Link href="/upu">UPU</Link><Link href="/sasar">SASAR</Link><Link className="nav-cta" href="/temujanji">Buat Temujanji</Link></nav>
   <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Buka menu">{menu?<X/>:<Menu/>}</button>
  </div></header>
  <section id="utama" className="hero"><div className="shell hero-grid">
   <div className="hero-copy"><span className="eyebrow"><ShieldCheck size={16}/> Unit Bimbingan dan Kaunseling KTESA</span><h1>Ada ruang untuk<br/><em>setiap cerita.</em></h1><p>Nak buat temujanji dengan kaunselor, semak sasaran akademik atau perlukan tempat untuk berkongsi? Semuanya ada di sini.</p><div className="hero-actions"><a className="primary-btn" href="#perkhidmatan">Lihat Perkhidmatan <ArrowRight size={18}/></a><a className="text-btn" href="#kaunselor"><HandHeart size={18}/> Hubungi Kaunselor</a></div></div>
   <div className="hero-panel counselor-portrait"><img src="/foto-pasukan-kaunselor.jpg" alt="Pn Fadzilah dan Pn Iffah, Kaunselor KTESA" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/><div className="portrait-shade"/><div className="portrait-title"><small>KAUNSELOR KTESA</small><strong>Apa yang boleh<br/>kami bantu?</strong></div><div className="portrait-names"><span><b>Pn Fadzilah</b><small>Kaunselor</small></span><span><b>Pn Iffah</b><small>Kaunselor</small></span></div></div>
  </div></section>
  <section className="quick-section"><div className="shell quick-grid">{links.map(([I,t,d,c,href])=><Link href={href} key={t} className={`quick-card ${c}`}><span className="quick-icon"><I/></span><span><strong>{t}</strong><small>{d}</small></span><ChevronRight className="chev"/></Link>)}</div></section>
  <section id="perkhidmatan" className="section shell"><div className="section-heading"><span>PERKHIDMATAN UBK</span><h2>Pilih bantuan yang<br/>anda perlukan.</h2></div><div className="service-grid">{services.map(([I,t,d,href],i)=><article className="service-card" key={t}><b>0{i+1}</b><I/><h3>{t}</h3><p>{d}</p><Link href={href}>Buka perkhidmatan <ArrowRight size={15}/></Link></article>)}</div></section>
  <section id="sasar" className="sasar-section"><div className="shell sasar-grid">
   <div className="sasar-copy"><span className="eyebrow light"><Calculator size={16}/> Perancang Akademik</span><h2>SASAR KTESA</h2><p>Tetapkan sasaran gred dan lihat anggaran keputusan akhir berdasarkan wajaran STPM terkini.</p><ul><li>Pilih pakej atau subjek sendiri</li><li>Sokongan 4 atau 5 subjek</li><li>Pengajian Am + 3 subjek terbaik</li></ul></div>
   <div className="calculator-card"><div className="calc-head"><div><small>MODUL SASARAN</small><h3>Anggaran pantas</h3></div><Target/></div><label>Mata pelajaran<select value={subject} onChange={e=>setSubject(e.target.value)}><option>900 Pengajian Am</option><option>910 Bahasa Melayu</option><option>944 Ekonomi</option><option>946 Pengajian Perniagaan</option><option>954 Mathematics</option><option>960 Physics</option></select></label><div className="grade-row"><label>Semester 1<select><option>B+ 3.33</option><option>A 4.00</option><option>A- 3.67</option></select></label><label>Semester 2<select><option>A- 3.67</option><option>A 4.00</option><option>B+ 3.33</option></select></label></div><Link className="calc-button" href="/sasar">Buka Kalkulator SASAR <ArrowRight size={17}/></Link><p className="calc-note">Anggaran untuk panduan. Keputusan rasmi MPM adalah muktamad.</p></div>
  </div></section>
  <section id="kaunselor" className="section shell"><div className="section-heading center"><span>KAUNSELOR KTESA</span><h2>Kenali kaunselor anda</h2><p>Jika ada perkara yang hendak dibincangkan, cikgu sedia membantu.</p></div><div className="counselor-grid">{[["Pn. Fadzilah","https://www.wasap.my/+60126332056"],["Pn. Iffah","https://www.wasap.my/+60199877645"]].map(([n,href])=><article className="counselor-card" key={n}><div className="avatar"><UserRound/></div><div><small>KAUNSELOR</small><h3>{n}</h3><p>Bimbingan dan Kaunseling</p><a className="whatsapp-link" href={href} target="_blank" rel="noopener noreferrer"><MessageCircleHeart/> WhatsApp {n}</a></div><a className="card-arrow" href={href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${n}`}><ArrowRight/></a></article>)}</div></section>
  <section className="safe-strip"><div className="shell safe-content"><div className="safe-icon"><HandHeart/></div><div><small>RUANG SELAMAT</small><h2>Ada perkara yang susah nak ceritakan?</h2><p>Tulis kepada kaunselor secara sulit. Nama tidak diperlukan.</p></div><Link href="/ruang-selamat">Tulis kepada kaunselor <ArrowRight/></Link></div></section>
  <footer><div className="shell footer-inner"><div className="brand inverse"><span className="brand-logo"><img src="/logo-ktesa-terkini.jpeg" alt="Logo rasmi KTESA" width={48} height={48}/></span><span><strong>PORTAL UBK</strong><small>KTESA · SHAH ALAM</small></span></div><p>Kolej Tingkatan Enam (Prauniversiti) Shah Alam<br/>KTESA Mencipta Kejayaan</p><Link href="/kaunselor">Log masuk kaunselor</Link></div></footer>
 </main>
}
