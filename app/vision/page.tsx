"use client";
import Link from "next/link";
import {useState} from "react";
import {ArrowLeft,Download,Eye,GraduationCap,Sparkles,Target} from "lucide-react";

type University={name:string;accent:string;deep:string;mark:string};
const universities:Record<string,University>={
 UM:{name:"Universiti Malaya",accent:"#e7bd62",deep:"#071d33",mark:"UM"},
 UKM:{name:"Universiti Kebangsaan Malaysia",accent:"#f0cf55",deep:"#5c1721",mark:"UKM"},
 UPM:{name:"Universiti Putra Malaysia",accent:"#f2d36c",deep:"#55212d",mark:"UPM"},
 UTM:{name:"Universiti Teknologi Malaysia",accent:"#f4c353",deep:"#7a1327",mark:"UTM"},
 USM:{name:"Universiti Sains Malaysia",accent:"#f0c859",deep:"#41235f",mark:"USM"},
 UiTM:{name:"Universiti Teknologi MARA",accent:"#d8b6ed",deep:"#3c175c",mark:"UiTM"},
 UTeM:{name:"Universiti Teknikal Malaysia Melaka",accent:"#f3c35d",deep:"#123c55",mark:"UTeM"},
 UUM:{name:"Universiti Utara Malaysia",accent:"#edc65a",deep:"#173a28",mark:"UUM"},
 UIAM:{name:"Universiti Islam Antarabangsa Malaysia",accent:"#d8b763",deep:"#173c35",mark:"UIAM"},
 UPSI:{name:"Universiti Pendidikan Sultan Idris",accent:"#f4cf45",deep:"#172b58",mark:"UPSI"},
 UniMAP:{name:"Universiti Malaysia Perlis",accent:"#f2d542",deep:"#163b73",mark:"UniMAP"},
 UNIMAS:{name:"Universiti Malaysia Sarawak",accent:"#efc744",deep:"#243c7a",mark:"UNIMAS"},
 UMS:{name:"Universiti Malaysia Sabah",accent:"#f0ca3e",deep:"#153967",mark:"UMS"},
 UMT:{name:"Universiti Malaysia Terengganu",accent:"#f09b37",deep:"#472b66",mark:"UMT"},
 UMK:{name:"Universiti Malaysia Kelantan",accent:"#e3b83f",deep:"#51204f",mark:"UMK"},
 UniSZA:{name:"Universiti Sultan Zainal Abidin",accent:"#d5b35c",deep:"#252525",mark:"UniSZA"},
 USIM:{name:"Universiti Sains Islam Malaysia",accent:"#d9b759",deep:"#123d70",mark:"USIM"},
 UTHM:{name:"Universiti Tun Hussein Onn Malaysia",accent:"#f2b941",deep:"#40205f",mark:"UTHM"},
 UPNM:{name:"Universiti Pertahanan Nasional Malaysia",accent:"#d7bd62",deep:"#26392c",mark:"UPNM"},
 UMPSA:{name:"Universiti Malaysia Pahang Al-Sultan Abdullah",accent:"#68c3ce",deep:"#173b59",mark:"UMPSA"}
} as const;
type UniKey=keyof typeof universities;

function wrap(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,max:number,line=42){
 const words=text.split(" "); let row=""; let yy=y;
 for(const word of words){const test=row?`${row} ${word}`:word;if(ctx.measureText(test).width>max&&row){ctx.fillText(row,x,yy);row=word;yy+=line}else row=test}
 if(row)ctx.fillText(row,x,yy); return yy;
}

function drawCover(ctx:CanvasRenderingContext2D,img:HTMLImageElement,width:number,height:number){
 const scale=Math.max(width/img.naturalWidth,height/img.naturalHeight);
 const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
 ctx.drawImage(img,(width-w)/2,(height-h)/2,w,h);
}

export default function VisionPage(){
 const [lang,setLang]=useState<"bm"|"en">("bm");
 const [name,setName]=useState("Alya"); const [uni,setUni]=useState<UniKey>("UM");
 const [course,setCourse]=useState("Sarjana Muda Undang-undang"); const [career,setCareer]=useState("Peguam");
 const [current,setCurrent]=useState("3.25"); const [target,setTarget]=useState("3.50"); const [muet,setMuet]=useState("Band 4.0");
 const [focus,setFocus]=useState("Capai PNGK 3.50"); const [next,setNext]=useState("Tingkatkan latihan Matematik dan semak kemajuan setiap minggu");
 const u=universities[uni];
 const t=lang==="bm"?{tag:"Lebih daripada sebuah ijazah",subtag:"Satu sumbangan untuk masyarakat",university:"UNIVERSITI PILIHAN",course:"KURSUS PILIHAN",career:"KERJAYA IMPIAN",current:"PNGK SEMASA",target:"SASARAN PNGK",focus:"FOKUS UTAMA SAYA",action:"APA PERLU SAYA BUAT?",download:"Muat turun Vision Board"}:{tag:"More than a degree",subtag:"A contribution to society",university:"UNIVERSITY OF CHOICE",course:"CHOSEN PROGRAMME",career:"DREAM CAREER",current:"CURRENT CGPA",target:"TARGET CGPA",focus:"MY MAIN FOCUS",action:"WHAT SHOULD I DO?",download:"Download Vision Board"};
 const download=()=>{const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=1500;const ctx=canvas.getContext("2d")!;const render=()=>{
  const img=new Image();img.onload=()=>{drawCover(ctx,img,1200,1500);finish()};img.onerror=()=>{ctx.fillStyle=u.deep;ctx.fillRect(0,0,1200,1500);finish()};img.src="/vision-um.png";
  function finish(){ctx.fillStyle=u.deep+"de";ctx.fillRect(0,0,1200,1500);ctx.strokeStyle=u.accent;ctx.lineWidth=3;ctx.strokeRect(54,54,1092,1392);
  ctx.textAlign="center";ctx.fillStyle=u.accent;ctx.font="700 94px Georgia";ctx.fillText("VISION",600,145);ctx.fillStyle="#fff";ctx.font="700 42px Georgia";ctx.fillText(`DASHBOARD ${(name||"SAYA").toUpperCase()}`,600,205);ctx.fillStyle="#fff";ctx.font="700 20px Arial";ctx.fillText(t.tag.toUpperCase(),600,257);ctx.fillStyle=u.accent;ctx.font="700 16px Arial";ctx.fillText(t.subtag.toUpperCase(),600,292);
  ctx.fillStyle="#ffffff18";ctx.fillRect(85,335,1030,280);ctx.fillStyle=u.accent;ctx.font="700 22px Arial";ctx.fillText(t.university,600,395);ctx.fillStyle="#fff";ctx.font="700 56px Georgia";wrap(ctx,u.name.toUpperCase(),600,470,930,62);ctx.fillStyle=u.accent;ctx.font="700 25px Arial";wrap(ctx,course.toUpperCase(),600,565,940,34);
  const cards=[[t.career,career],[t.current,current],[t.target,target],["MUET",muet]];cards.forEach(([a,b],i)=>{const x=85+i*258;ctx.fillStyle="#ffffff12";ctx.fillRect(x,650,235,190);ctx.fillStyle="#dbe5eb";ctx.font="700 17px Arial";ctx.fillText(a,x+117,705);ctx.fillStyle=u.accent;ctx.font="700 35px Georgia";wrap(ctx,b.toUpperCase(),x+117,770,205,38)});
  ctx.fillStyle="#ffffff12";ctx.fillRect(85,875,390,230);ctx.fillRect(505,875,610,230);ctx.fillStyle="#dbe5eb";ctx.font="700 19px Arial";ctx.fillText(t.focus,280,940);ctx.fillStyle=u.accent;ctx.font="700 28px Arial";wrap(ctx,focus.toUpperCase(),280,1010,330,36);ctx.fillStyle="#dbe5eb";ctx.font="700 19px Arial";ctx.fillText(t.action,810,940);ctx.fillStyle="#fff";ctx.font="700 28px Arial";wrap(ctx,next.toUpperCase(),810,1005,530,36);
  ctx.fillStyle=u.accent;ctx.font="italic 42px Georgia";ctx.fillText("Ini haluan saya. Ini sasaran saya.",600,1235);ctx.fillStyle="#fff";ctx.font="700 20px Arial";ctx.fillText("KTESA MENCIPTA KEJAYAAN",600,1375);
  const a=document.createElement("a");a.download=`Vision-Board-${name||"KTESA"}.png`;a.href=canvas.toDataURL("image/png");a.click();}
 };render()};
 return <main className="vision-page"><div className="vision-shell"><Link className="back-link" href="/"><ArrowLeft/> Kembali ke portal</Link>
  <header className="vision-head"><span><Sparkles/></span><div><small>VISION DASHBOARD</small><h1>{t.tag}</h1><p>{lang==="bm"?"Isi sasaran anda dan jana Vision Board peribadi untuk disimpan dalam telefon.":"Set your goals and create a personal Vision Board to save on your phone."}</p></div></header>
  <div className="vision-layout"><section className="vision-form"><h2><Target/> {lang==="bm"?"Bina visi anda":"Create your vision"}</h2>
   <label>Bahasa Vision Board<select value={lang} onChange={e=>setLang(e.target.value as "bm"|"en")}><option value="bm">Bahasa Melayu</option><option value="en">English</option></select></label>
   <label>{lang==="bm"?"Nama untuk dipaparkan":"Display name"} <small>{lang==="bm"?"Boleh guna nama penuh atau nama panggilan":"Use your full name or nickname"}</small><input value={name} onChange={e=>setName(e.target.value)} maxLength={30}/></label>
   <label>{lang==="bm"?"Universiti pilihan":"University of choice"}<select value={uni} onChange={e=>setUni(e.target.value as UniKey)}>{Object.entries(universities).map(([k,v])=><option key={k} value={k}>{v.name} ({k})</option>)}</select></label>
   <label>{lang==="bm"?"Kursus pilihan":"Chosen programme"}<input value={course} onChange={e=>setCourse(e.target.value)}/></label><label>{lang==="bm"?"Kerjaya impian":"Dream career"}<input value={career} onChange={e=>setCareer(e.target.value)}/></label>
   <div className="vision-fields"><label>{lang==="bm"?"PNGK semasa":"Current CGPA"}<input value={current} onChange={e=>setCurrent(e.target.value)}/></label><label>{lang==="bm"?"Sasaran PNGK":"Target CGPA"}<input value={target} onChange={e=>setTarget(e.target.value)}/></label><label>MUET<input value={muet} onChange={e=>setMuet(e.target.value)}/></label></div>
   <label>{t.focus}<input value={focus} onChange={e=>setFocus(e.target.value)}/></label>
   <label>{t.action}<textarea value={next} onChange={e=>setNext(e.target.value)} rows={3}/></label><button onClick={download}><Download/> {t.download}</button>
  </section>
  <section className="vision-preview-wrap"><h2><Eye/> {lang==="bm"?"Vision Board Saya":"My Vision Board"}</h2><div className="vision-poster" style={{"--poster-deep":u.deep,"--poster-accent":u.accent,backgroundImage:`linear-gradient(${u.deep}c7,${u.deep}f5),url(/vision-um.png)`} as React.CSSProperties}>
   <div className="vision-title"><strong>VISION</strong><span>DASHBOARD {(name||"SAYA").toUpperCase()}</span><em>{t.tag}</em><small>{t.subtag}</small></div><div className="vision-uni"><span>{t.university}</span><strong>{u.name}</strong><b>{course}</b></div><div className="vision-mini-grid"><div><span>{t.career}</span><b>{career}</b></div><div><span>{t.current}</span><b>{current}</b></div><div><span>{t.target}</span><b>{target}</b></div><div><span>MUET</span><b>{muet}</b></div></div><div className="vision-status"><div><span>{t.focus}</span><p>{focus}</p></div><div><span>{t.action}</span><p>{next}</p></div></div><blockquote>{lang==="bm"?"Ini haluan saya. Ini sasaran saya.":"My path. My goal. My future."}</blockquote><footer>KTESA MENCIPTA KEJAYAAN</footer>
  </div></section></div></div></main>
}
