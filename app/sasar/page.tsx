"use client";
import Link from "next/link";
import { ArrowLeft, Calculator, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
const grades=[['A',4],['A-',3.67],['B+',3.33],['B',3],['B-',2.67],['C+',2.33],['C',2],['C-',1.67],['D+',1.33],['D',1],['F',0]] as const;
const configs:Record<string,[number,number,number,number]>={
 '900 Pengajian Am':[26.67,20,26.67,26.67],
 '910 Bahasa Melayu':[33.33,33.33,33.33,0],
 '911 Bahasa Cina':[33.33,33.33,33.33,0],
 '912 Bahasa Tamil':[33.33,33.33,33.33,0],
 '930 Pengajian Syariah Kontemporari':[33.33,33.33,33.33,0],
 '940 Sejarah':[29,22,29,20],
 '944 Ekonomi':[40,40,20,0],
 '946 Pengajian Perniagaan':[33.33,33.33,33.33,0],
 '954 Mathematics':[33.33,33.33,33.33,0],
 '960 Physics':[26.67,26.67,26.67,20],
 '962 Chemistry':[26.67,26.67,26.67,20],
 '964 Biology':[26.67,26.67,26.67,20],
 '966 Sains Sukan':[25,25,25,25],
 '970 Seni Visual':[40,35,0,25]
};
const subjects=Object.keys(configs);
type Row={subject:string;sem1:string;sem2:string;sem3:string;kk:string};
const blank=(subject:string):Row=>({subject,sem1:'B+',sem2:'B+',sem3:'B+',kk:'B+'});
export default function SasarPage(){
 const [rows,setRows]=useState<Row[]>([blank(subjects[0]),blank(subjects[1]),blank(subjects[6]),blank(subjects[7])]);
 const points=(g:string)=>grades.find(x=>x[0]===g)?.[1]??0;
 const estimate=(r:Row)=>{const w=configs[r.subject];const values=[r.sem1,r.sem2,r.sem3,r.kk];const total=w.reduce((a,b)=>a+b,0);return w.reduce((sum,weight,i)=>sum+points(values[i])*weight,0)/total};
 const finalGrade=(p:number)=>grades.reduce((best,g)=>Math.abs(g[1]-p)<Math.abs(best[1]-p)?g:best,grades[0])[0];
 const counted=useMemo(()=>{const pa=rows.find(r=>r.subject.startsWith('900'));const others=rows.filter(r=>!r.subject.startsWith('900')).sort((a,b)=>estimate(b)-estimate(a)).slice(0,3);return pa?[pa,...others]:[]},[rows]);
 const cgpa=counted.length===4?(counted.reduce((sum,r)=>sum+estimate(r),0)/4).toFixed(2):'—';
 const change=(i:number,key:keyof Row,value:string)=>setRows(rows.map((r,j)=>j===i?{...r,[key]:value}:r));
 const gradeSelect=(r:Row,i:number,key:'sem1'|'sem2'|'sem3'|'kk',label:string,weight:number)=>weight===0?null:<label><span>{label} · {weight}%</span><select aria-label={r.subject+' '+label} value={r[key]} onChange={e=>change(i,key,e.target.value)}>{grades.map(g=><option key={g[0]} value={g[0]}>{g[0]} · {g[1].toFixed(2)}</option>)}</select></label>;
 return <main className="simple-page"><div className="simple-shell sasar-shell">
  <Link className="back-link" href="/"><ArrowLeft/> Kembali ke portal</Link>
  <header><Calculator/><small>SASAR KTESA</small><h1>Sasaran setiap semester</h1><p>Pilih gred sasaran bagi setiap subjek. Wajaran semester dan kerja kursus berubah secara automatik mengikut mata pelajaran.</p></header>
  <div className="sasar-summary"><div><small>ANGGARAN PNGK AKHIR</small><strong>{cgpa}</strong></div><p>{counted.length===4?'Dikira menggunakan Pengajian Am dan tiga subjek terbaik.':'Pengajian Am mesti dipilih bersama tiga subjek lain.'}</p></div>
  <div className="semester-head"><span>Mata pelajaran</span><span>Semester 1</span><span>Semester 2</span><span>Semester 3</span><span>Kerja kursus</span><span>Unjuran</span></div>
  <div className="semester-list">{rows.map((r,i)=>{const w=configs[r.subject];return <article className="semester-card" key={i}>
   <div className="subject-choice"><label><span>Mata pelajaran</span><select value={r.subject} onChange={e=>change(i,'subject',e.target.value)}>{subjects.map(s=><option key={s}>{s}</option>)}</select></label>{rows.length===5&&i>0?<button aria-label="Buang subjek" onClick={()=>setRows(rows.filter((_,j)=>j!==i))}><Trash2/></button>:null}</div>
   <div className="semester-inputs" style={{gridTemplateColumns:`repeat(${w.filter(x=>x>0).length},1fr)`}}>{gradeSelect(r,i,'sem1','Semester 1',w[0])}{gradeSelect(r,i,'sem2','Semester 2',w[1])}{gradeSelect(r,i,'sem3','Semester 3',w[2])}{gradeSelect(r,i,'kk','Kerja kursus',w[3])}</div>
   <div className="subject-estimate"><small>UNJURAN SUBJEK</small><strong>{finalGrade(estimate(r))}</strong><span>{estimate(r).toFixed(2)}</span></div>
  </article>})}</div>
  {rows.length<5&&<button className="add-subject" onClick={()=>setRows([...rows,blank(subjects.find(s=>!rows.some(r=>r.subject===s))||subjects[2])])}><Plus/> Tambah subjek kelima</button>}
  <div className="sasar-explain"><b>Tetapan SASAR KTESA</b><p>Bahasa Melayu, Pengajian Perniagaan, Ekonomi, Pengajian Syariah Kontemporari dan Mathematics dikira berdasarkan tiga semester tanpa kerja kursus. Anggaran ini untuk perancangan; keputusan rasmi MPM adalah muktamad.</p></div>
 </div></main>
}
