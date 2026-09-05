"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {ArrowLeft,Download,Eye,GraduationCap,Sparkles,Target} from "lucide-react";

type University={name:string;accent:string;deep:string;mark:string;bg:string;yOff:number};
const universities:Record<string,University>={
 UM:{name:"Universiti Malaya",accent:"#e7bd62",deep:"#071d33",mark:"UM",bg:"/vision-bg-um.jpg",yOff:40},
 UKM:{name:"Universiti Kebangsaan Malaysia",accent:"#f0cf55",deep:"#5c1721",mark:"UKM",bg:"/vision-bg-ukm.jpg",yOff:5},
 UPM:{name:"Universiti Putra Malaysia",accent:"#f2d36c",deep:"#55212d",mark:"UPM",bg:"/vision-bg-upm.jpg",yOff:15},
 UTM:{name:"Universiti Teknologi Malaysia",accent:"#f4c353",deep:"#7a1327",mark:"UTM",bg:"/vision-bg-utm.jpg",yOff:-7},
 USM:{name:"Universiti Sains Malaysia",accent:"#f0c859",deep:"#41235f",mark:"USM",bg:"/vision-bg-usm.jpg",yOff:10},
 UiTM:{name:"Universiti Teknologi MARA",accent:"#d8b6ed",deep:"#3c175c",mark:"UiTM",bg:"/vision-bg-uitm.jpg",yOff:2},
 UTeM:{name:"Universiti Teknikal Malaysia Melaka",accent:"#f3c35d",deep:"#123c55",mark:"UTeM",bg:"/vision-bg-utem.jpg",yOff:-3},
 UUM:{name:"Universiti Utara Malaysia",accent:"#edc65a",deep:"#173a28",mark:"UUM",bg:"/vision-bg-uum.jpg",yOff:1},
 UIAM:{name:"Universiti Islam Antarabangsa Malaysia",accent:"#d8b763",deep:"#173c35",mark:"UIAM",bg:"/vision-bg-uiam.jpg",yOff:6},
 UPSI:{name:"Universiti Pendidikan Sultan Idris",accent:"#f4cf45",deep:"#172b58",mark:"UPSI",bg:"/vision-bg-upsi.jpg",yOff:1},
 UniMAP:{name:"Universiti Malaysia Perlis",accent:"#f2d542",deep:"#163b73",mark:"UniMAP",bg:"/vision-bg-unimap.jpg",yOff:0},
 UNIMAS:{name:"Universiti Malaysia Sarawak",accent:"#efc744",deep:"#243c7a",mark:"UNIMAS",bg:"/vision-bg-unimas.jpg",yOff:0},
 UMS:{name:"Universiti Malaysia Sabah",accent:"#f0ca3e",deep:"#153967",mark:"UMS",bg:"/vision-bg-ums.jpg",yOff:-4},
 UMT:{name:"Universiti Malaysia Terengganu",accent:"#f09b37",deep:"#472b66",mark:"UMT",bg:"/vision-bg-umt.jpg",yOff:-3},
 UMK:{name:"Universiti Malaysia Kelantan",accent:"#e3b83f",deep:"#51204f",mark:"UMK",bg:"/vision-bg-umk.jpg",yOff:-4},
 UniSZA:{name:"Universiti Sultan Zainal Abidin",accent:"#d5b35c",deep:"#252525",mark:"UniSZA",bg:"/vision-bg-unisza.jpg",yOff:-4},
 USIM:{name:"Universiti Sains Islam Malaysia",accent:"#d9b759",deep:"#123d70",mark:"USIM",bg:"/vision-bg-usim.jpg",yOff:11},
 UTHM:{name:"Universiti Tun Hussein Onn Malaysia",accent:"#f2b941",deep:"#40205f",mark:"UTHM",bg:"/vision-bg-uthm.jpg",yOff:0},
 UPNM:{name:"Universiti Pertahanan Nasional Malaysia",accent:"#d7bd62",deep:"#26392c",mark:"UPNM",bg:"/vision-bg-upnm.jpg",yOff:19},
 UMPSA:{name:"Universiti Malaysia Pahang Al-Sultan Abdullah",accent:"#68c3ce",deep:"#173b59",mark:"UMPSA",bg:"/vision-bg-umpsa.jpg",yOff:0}
} as const;
type UniKey=keyof typeof universities;

type PosterValues={name:string;career:string;current:string;target:string;muet:string};

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

function pillBg(ctx:CanvasRenderingContext2D,cx:number,cy:number,w:number,h:number,r=16,alpha=0.55){
 const x=cx-w/2,y=cy-h/2;
 ctx.fillStyle=`rgba(3,10,18,${alpha})`;
 ctx.beginPath();
 ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);
 ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
 ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);
 ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);
 ctx.closePath();ctx.fill();
}

// Lukis nilai-nilai dinamik atas kotak kosong sedia ada dalam gambar poster.
// Digunakan sama ada untuk pratonton skrin (canvas kecil) mahupun fail muat turun (canvas penuh 1200x1500).
function paintPoster(ctx:CanvasRenderingContext2D,u:University,v:PosterValues){
 ctx.textAlign="center";
 const R1=1033+u.yOff, R2=1166+u.yOff;
 // Kotak "Nama Saya"
 pillBg(ctx,222,R1,300,58);
 ctx.fillStyle="#fff";ctx.font="700 29px Georgia";wrap(ctx,(v.name||"SAYA").toUpperCase(),222,R1+10,270,32);
 // Kotak "Kerjaya Impian"
 pillBg(ctx,594,R1,300,58);
 ctx.fillStyle="#fff";ctx.font="700 25px Arial";wrap(ctx,v.career.toUpperCase(),594,R1+10,270,28);
 // Kotak "PNGK Semasa"
 pillBg(ctx,972,R1,270,58);
 ctx.fillStyle=u.accent;ctx.font="700 34px Georgia";ctx.fillText(v.current.toUpperCase(),972,R1+12);
 // Kotak "Sasaran PNGK"
 pillBg(ctx,222,R2,270,58);
 ctx.fillStyle=u.accent;ctx.font="700 34px Georgia";ctx.fillText(v.target.toUpperCase(),222,R2+12);
 // Kotak "MUET"
 pillBg(ctx,594,R2,300,58);
 ctx.fillStyle="#fff";ctx.font="700 27px Arial";ctx.fillText(v.muet.toUpperCase(),594,R2+10);
}

export default function VisionPage(){
 const [lang,setLang]=useState<"bm"|"en">("bm");
 const [name,setName]=useState("Alya"); const [uni,setUni]=useState<UniKey>("UM");
 const [course,setCourse]=useState("Sarjana Muda Undang-undang"); const [career,setCareer]=useState("Peguam");
 const [current,setCurrent]=useState("3.25"); const [target,setTarget]=useState("3.50"); const [muet,setMuet]=useState("Band 4.0");
 const [downloadCount,setDownloadCount]=useState(0);
 const u=universities[uni];
 const previewRef=useRef<HTMLCanvasElement>(null);
 const imgCache=useRef<Record<string,HTMLImageElement>>({});
 useEffect(()=>{
  (async()=>{
   try{
    const r=await fetch("/api/stats");
    if(r.ok){const d=await r.json();setDownloadCount(d.vision_downloads||0)}
   }catch{}
  })();
 },[]);
 // Pratonton skrin: lukis atas canvas kecil supaya SAMA PERSIS dengan fail yang dimuat turun.
 useEffect(()=>{
  const canvas=previewRef.current; if(!canvas) return;
  const ctx=canvas.getContext("2d"); if(!ctx) return;
  const vals:PosterValues={name,career,current,target,muet};
  const cached=imgCache.current[u.bg];
  if(cached){
   ctx.clearRect(0,0,1200,1500); drawCover(ctx,cached,1200,1500); paintPoster(ctx,u,vals);
  }else{
   const img=new Image(); img.crossOrigin="anonymous";
   img.onload=()=>{imgCache.current[u.bg]=img; ctx.clearRect(0,0,1200,1500); drawCover(ctx,img,1200,1500); paintPoster(ctx,u,vals)};
   img.onerror=()=>{ctx.fillStyle=u.deep; ctx.fillRect(0,0,1200,1500); paintPoster(ctx,u,vals)};
   img.src=u.bg;
  }
 },[uni,name,career,current,target,muet,u]);
 const t=lang==="bm"?{tag:"Lebih daripada sebuah ijazah",subtag:"Satu sumbangan untuk masyarakat",university:"UNIVERSITI PILIHAN",course:"KURSUS PILIHAN",career:"KERJAYA IMPIAN",current:"PNGK SEMASA",target:"SASARAN PNGK",download:"Muat turun Vision Board"}:{tag:"More than a degree",subtag:"A contribution to society",university:"UNIVERSITY OF CHOICE",course:"CHOSEN PROGRAMME",career:"DREAM CAREER",current:"CURRENT CGPA",target:"TARGET CGPA",download:"Download Vision Board"};
 const trackDownload=()=>{
  fetch("/api/stats",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({key:"vision_downloads"})}).then(r=>r.ok?r.json():null).then(d=>{if(d)setDownloadCount(d.vision_downloads||0)}).catch(()=>{});
 };
 const download=()=>{
  const canvas=document.createElement("canvas");canvas.width=1200;canvas.height=1500;const ctx=canvas.getContext("2d")!;
  const vals:PosterValues={name,career,current,target,muet};
  const finish=()=>{
   paintPoster(ctx,u,vals);
   const a=document.createElement("a");a.download=`Vision-Board-${name||"KTESA"}.png`;a.href=canvas.toDataURL("image/png");a.click();trackDownload();
  };
  const cached=imgCache.current[u.bg];
  if(cached){drawCover(ctx,cached,1200,1500);finish();return}
  const img=new Image();img.crossOrigin="anonymous";
  img.onload=()=>{imgCache.current[u.bg]=img;drawCover(ctx,img,1200,1500);finish()};
  img.onerror=()=>{ctx.fillStyle=u.deep;ctx.fillRect(0,0,1200,1500);finish()};
  img.src=u.bg;
 };
 return <main className="vision-page"><div className="vision-shell"><Link className="back-link" href="/"><ArrowLeft/> Kembali ke portal</Link>
  <header className="vision-head"><span><Sparkles/></span><div><small>VISION DASHBOARD</small><h1>{t.tag}</h1><p>{lang==="bm"?"Isi sasaran anda dan jana Vision Board peribadi untuk disimpan dalam telefon.":"Set your goals and create a personal Vision Board to save on your phone."}</p></div></header>
  <div className="vision-layout"><section className="vision-form"><h2><Target/> {lang==="bm"?"Bina visi anda":"Create your vision"}</h2>
   <label>Bahasa Vision Board<select value={lang} onChange={e=>setLang(e.target.value as "bm"|"en")}><option value="bm">Bahasa Melayu</option><option value="en">English</option></select></label>
   <label>{lang==="bm"?"Nama untuk dipaparkan":"Display name"} <small>{lang==="bm"?"Boleh guna nama penuh atau nama panggilan":"Use your full name or nickname"}</small><input value={name} onChange={e=>setName(e.target.value)} maxLength={30}/></label>
   <label>{lang==="bm"?"Universiti pilihan":"University of choice"}<select value={uni} onChange={e=>setUni(e.target.value as UniKey)}>{Object.entries(universities).map(([k,v])=><option key={k} value={k}>{v.name} ({k})</option>)}</select></label>
   <label>{lang==="bm"?"Kursus pilihan":"Chosen programme"}<input value={course} onChange={e=>setCourse(e.target.value)}/></label><label>{lang==="bm"?"Kerjaya impian":"Dream career"}<input value={career} onChange={e=>setCareer(e.target.value)}/></label>
   <div className="vision-fields"><label>{lang==="bm"?"PNGK semasa":"Current CGPA"}<input value={current} onChange={e=>setCurrent(e.target.value)}/></label><label>{lang==="bm"?"Sasaran PNGK":"Target CGPA"}<input value={target} onChange={e=>setTarget(e.target.value)}/></label><label>MUET<input value={muet} onChange={e=>setMuet(e.target.value)}/></label></div>
   <button onClick={download}><Download/> {t.download}</button>
   <p style={{fontSize:12,opacity:.7,marginTop:8}}>{lang==="bm"?`${downloadCount.toLocaleString("ms-MY")} Vision Board telah dimuat turun setakat ini.`:`${downloadCount.toLocaleString("ms-MY")} Vision Boards downloaded so far.`}</p>
  </section>
  <section className="vision-preview-wrap"><h2><Eye/> {lang==="bm"?"Vision Board Saya":"My Vision Board"}</h2>
   <canvas ref={previewRef} width={1200} height={1500} className="vision-poster" style={{"--poster-deep":u.deep,"--poster-accent":u.accent,padding:0,width:"100%",display:"block"} as React.CSSProperties}/>
   <p style={{fontSize:12,opacity:.65,marginTop:10,textAlign:"center"}}>{lang==="bm"?"Pratonton ini sama seperti fail yang akan dimuat turun.":"This preview matches the file you'll download."}</p>
  </section></div></div></main>
}
