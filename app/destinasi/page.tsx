import Link from "next/link";
import { ArrowLeft, BarChart3, Clock3, GraduationCap, School, Users } from "lucide-react";

const universities=[
 {name:"Universiti Teknologi MARA",short:"UiTM",students:29},
 {name:"Universiti Malaysia Kelantan",short:"UMK",students:27},
 {name:"Universiti Malaysia Perlis",short:"UniMAP",students:15},
 {name:"Universiti Utara Malaysia",short:"UUM",students:10},
 {name:"Universiti Pendidikan Sultan Idris",short:"UPSI",students:9},
];

export default function DestinasiPage(){
 return <main className="simple-page destination-page"><div className="simple-shell wide destination-shell">
  <Link className="back-link" href="/"><ArrowLeft/> Kembali ke portal</Link>
  <header><GraduationCap/><small>DESTINASI LEPASAN KTESA</small><h1>Ke mana pelajar kami melangkah?</h1><p>Gambaran keseluruhan tawaran UPU bagi lepasan STPM 2025 tanpa memaparkan maklumat individu.</p></header>

  <div className="preliminary-banner"><Clock3/><div><b>Keputusan awal</b><p>Analisis ini berdasarkan keputusan tawaran semasa. Keputusan rayuan UPU belum dimasukkan.</p></div></div>

  <section className="destination-stats" aria-label="Ringkasan keputusan UPU">
   <article><small>JUMLAH KOHORT</small><strong>245</strong><span>pelajar STPM 2025</span></article>
   <article><small>MEMOHON UPU</small><strong>221</strong><span>90.2% daripada kohort</span></article>
   <article className="featured"><small>MENDAPAT TAWARAN AWAL</small><strong>155</strong><span>pelajar</span></article>
   <article><small>KADAR DALAM KALANGAN PEMOHON</small><strong>70.1%</strong><span>155 daripada 221 pemohon</span></article>
  </section>

  <section className="destination-panel stream-analysis">
   <div className="destination-heading"><div><small>MENGIKUT ALIRAN</small><h2>Peluang tawaran awal</h2><p>Kadar dikira daripada pelajar yang memohon, bukan keseluruhan kohort.</p></div><School/></div>
   <div className="stream-cards">
    <article><div><b>Sains</b><span>16 daripada 18 pemohon</span></div><strong>88.9%</strong><div className="progress-track"><i style={{width:"88.9%"}}/></div></article>
    <article><div><b>Sains Sosial</b><span>139 daripada 203 pemohon</span></div><strong>68.5%</strong><div className="progress-track"><i style={{width:"68.5%"}}/></div></article>
   </div>
   <p className="comparison-note">Peratus ini tidak sesuai digunakan untuk membandingkan kekuatan aliran secara terus kerana jumlah pelajar Sains dan Sains Sosial sangat berbeza.</p>
  </section>

  <section className="destination-panel university-analysis">
   <div className="destination-heading"><div><small>DESTINASI UTAMA</small><h2>Universiti paling banyak menerima pelajar</h2><p>Lima universiti dengan bilangan tawaran tertinggi setakat keputusan awal.</p></div><BarChart3/></div>
   <div className="university-bars">{universities.map(u=><div className="university-row" key={u.short}><div><b>{u.short}</b><span>{u.name}</span></div><div className="university-track"><i style={{width:`${u.students/29*100}%`}}/></div><strong>{u.students}<small> pelajar</small></strong></div>)}</div>
  </section>

  <section className="destination-bottom">
   <article><Users/><div><small>GAMBARAN KOHORT</small><h3>63.3% daripada keseluruhan kohort</h3><p>Angka ini merangkumi 24 pelajar yang tidak memohon UPU. Sebab itu kadarnya berbeza daripada kadar 70.1% dalam kalangan pemohon.</p></div></article>
  </section>

  <div className="career-warning"><b>Nota</b><p>Statistik akan dikemas kini selepas keputusan rayuan UPU diumumkan. Tawaran UPU dipengaruhi oleh merit, syarat khas program, susunan pilihan dan kekosongan tempat.</p></div>
 </div></main>
}
