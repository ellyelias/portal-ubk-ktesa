"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, HandHeart, LockKeyhole, MessageCircle, Send } from "lucide-react";

type Thread = { conversation: { referenceCode: string; topic: string; status: string }; messages: Array<{ id: number; sender: string; body: string; createdAt: string }> };

export default function SafeSpacePage() {
  const [mode, setMode] = useState<"send" | "check">("send");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{ reference: string; pin: string } | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [credentials, setCredentials] = useState({ reference: "", pin: "" });

  async function submitNew(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const form = new FormData(e.currentTarget);
    const response = await fetch("/api/ruang-selamat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setError(data.error || "Mesej tidak dapat dihantar.");
    setReceipt(data);
  }
  async function checkMessages(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const response = await fetch(`/api/ruang-selamat?reference=${encodeURIComponent(credentials.reference)}&pin=${encodeURIComponent(credentials.pin)}`);
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setError(data.error || "Mesej tidak dapat dibuka.");
    setThread(data);
  }
  async function reply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const form = new FormData(e.currentTarget); const message = String(form.get("message") || "");
    const response = await fetch("/api/ruang-selamat", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...credentials, message }) });
    setBusy(false); if (!response.ok) return setError((await response.json()).error || "Balasan tidak dapat dihantar.");
    e.currentTarget.reset(); await checkMessages({ preventDefault(){} } as FormEvent<HTMLFormElement>);
  }

  return <main className="safe-page"><div className="safe-shell">
    <Link className="back-link" href="/"><ArrowLeft size={18}/> Kembali ke portal</Link>
    <div className="safe-title"><span><HandHeart/></span><div><small>RUANG SELAMAT</small><h1>Tulis kepada kaunselor</h1><p>Nama tidak diperlukan. Simpan kod rujukan dan PIN untuk membaca jawapan kaunselor.</p></div></div>
    <div className="safe-tabs"><button className={mode==="send"?"active":""} onClick={()=>{setMode("send");setError("")}}><Send/> Hantar mesej</button><button className={mode==="check"?"active":""} onClick={()=>{setMode("check");setError("")}}><MessageCircle/> Semak jawapan</button></div>
    {error && <p className="form-error">{error}</p>}
    {mode === "send" && !receipt && <form className="safe-form" onSubmit={submitNew}>
      <label>Perkara<select name="topic" required defaultValue=""><option value="" disabled>Pilih perkara</option><option>Akademik</option><option>Keluarga</option><option>Rakan dan hubungan sosial</option><option>Emosi dan kesejahteraan</option><option>Kewangan</option><option>Lain-lain</option></select></label>
      <label>Mesej<textarea name="message" rows={7} required minLength={5} placeholder="Ceritakan perkara yang anda perlukan bantuan..."/></label>
      <div className="optional-grid"><label>Nama <small>(pilihan)</small><input name="displayName" placeholder="Boleh dibiarkan kosong"/></label><label>Nombor telefon <small>(pilihan)</small><input name="contactNumber" inputMode="tel" placeholder="Jika mahu dihubungi"/></label></div>
      <p className="privacy-note"><LockKeyhole/> Maklumat hanya boleh dilihat oleh kaunselor yang dibenarkan.</p>
      <button className="safe-submit" disabled={busy}>{busy?"Sedang menghantar...":"Hantar kepada kaunselor"}</button>
    </form>}
    {receipt && <section className="receipt-card"><CheckCircle2/><h2>Mesej telah dihantar</h2><p>Ambil tangkap layar atau catat kedua-dua maklumat ini.</p><div><span>Kod rujukan<strong>{receipt.reference}</strong></span><span>PIN<strong>{receipt.pin}</strong></span></div><button onClick={()=>{setCredentials(receipt);setMode("check");setReceipt(null)}}>Semak ruang mesej</button></section>}
    {mode === "check" && !thread && <form className="safe-form compact" onSubmit={checkMessages}><label>Kod rujukan<input required value={credentials.reference} onChange={e=>setCredentials({...credentials,reference:e.target.value.toUpperCase()})} placeholder="RS-XXXXXXXX"/></label><label>PIN<input required inputMode="numeric" maxLength={6} value={credentials.pin} onChange={e=>setCredentials({...credentials,pin:e.target.value})} placeholder="6 digit"/></label><button className="safe-submit" disabled={busy}>{busy?"Membuka...":"Buka mesej"}</button></form>}
    {thread && <section className="thread-card"><header><div><small>{thread.conversation.referenceCode}</small><h2>{thread.conversation.topic}</h2></div><span>{thread.conversation.status}</span></header><div className="message-list">{thread.messages.map(m=><div key={m.id} className={`message-bubble ${m.sender}`}><small>{m.sender==="kaunselor"?"Kaunselor":"Anda"}</small><p>{m.body}</p></div>)}</div><form onSubmit={reply}><textarea name="message" required rows={3} placeholder="Tulis balasan..."/><button disabled={busy}><Send/> Hantar</button></form></section>}
    <p className="safety-copy">Jika anda berada dalam keadaan yang memerlukan bantuan segera, hubungi kaunselor secara terus atau maklumkan kepada guru yang berdekatan.</p>
  </div></main>
}
