"use client";

import { FormEvent, useState } from "react";
import { Activity, Bot, BrainCircuit, Code2, Compass, ImagePlus, Menu, MessageCircle, Plus, Search, Send, Settings2, Sparkles, Video, X, KeyRound, ShieldCheck } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
const modules = [
  { name: "Galaxy Chat", icon: MessageCircle, note: "Conversación inteligente" },
  { name: "Brain", icon: BrainCircuit, note: "Centro de conocimiento" },
  { name: "Agents", icon: Bot, note: "Agentes especializados" },
  { name: "Creative", icon: ImagePlus, note: "Herramientas creativas" },
  { name: "Video Studio", icon: Video, note: "Espacio de vídeo" },
  { name: "Developer", icon: Code2, note: "Herramientas de desarrollo" },
  { name: "Research", icon: Compass, note: "Investigación" },
  { name: "Analytics", icon: Activity, note: "Actividad y métricas" }
];

export default function Home() {
  const [active, setActive] = useState("Galaxy Chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState<boolean | null>(null);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const clean = message.trim();
    if (!clean || busy) return;
    setError("");
    setMessages((items) => [...items, { role: "user", content: clean }]);
    setMessage("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-galaxy-access-code": accessCode },
        body: JSON.stringify({ message: clean })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo completar la solicitud.");
      setMessages((items) => [...items, { role: "assistant", content: data.reply }]);
      setConnected(true);
    } catch (err) {
      setMessages((items) => items.filter((item, index) => !(item.role === "user" && index === items.length - 1)));
      setMessage(clean);
      setError(err instanceof Error ? err.message : "Error de conexión.");
      setConnected(false);
    } finally {
      setBusy(false);
    }
  }

  function newChat() {
    setMessages([]);
    setError("");
    setActive("Galaxy Chat");
  }

  return (
    <main className="shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Sparkles size={21}/></div><div><strong>GALAXY AI</strong><span>ULTIMATE</span></div><button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={18}/></button></div>
        <button className="new-chat" onClick={newChat}><Plus size={17}/> Nuevo chat</button>
        <div className="nav-label">PLATAFORMA</div>
        <nav className="nav-list">{modules.map(({name,icon:Icon,note})=><button key={name} title={note} className={`nav-item ${active===name?"active":""}`} onClick={()=>{setActive(name);setMenuOpen(false);}}><Icon size={18}/><span>{name}</span>{name==="Galaxy Chat"&&<i className="live-dot"/>}</button>)}</nav>
        <div className="sidebar-bottom">
          <div className="status-card"><div className="status-top"><span className="status-light"/> {connected ? "CONEXIÓN VERIFICADA" : "CONFIGURACIÓN SEGURA"}</div><p>{connected ? "El servicio respondió correctamente." : "La IA se activa cuando se configuran las variables privadas del servidor."}</p></div>
          <button className="nav-item settings" onClick={()=>setShowSettings(true)}><Settings2 size={18}/> Ajustes</button>
          <div className="profile"><div className="avatar">G</div><div><b>Usuario Galaxy</b><small>Espacio personal</small></div></div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar"><button className="icon-button mobile-menu" onClick={()=>setMenuOpen(true)} aria-label="Abrir menú"><Menu size={20}/></button><div className="breadcrumb">Galaxy <span>/</span> <b>{active}</b></div><div className="top-actions"><span className="system-status"><i/> {connected ? "Conectado" : "Modo protegido"}</span><button className="icon-button" onClick={()=>setShowSettings(true)} aria-label="Configuración"><Settings2 size={18}/></button></div></header>
        <div className="content">
          <div className="welcome-kicker"><span className="kicker-line"/> GALAXY AI ULTIMATE <span className="kicker-line"/></div>
          <div className="hero-orb"><div className="orb-core"><Sparkles size={31}/></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/></div>
          <h1>{active==="Galaxy Chat" ? <>Tu universo.<br/><em>Una nueva inteligencia.</em></> : active}</h1>
          <p className="subtitle">{active==="Galaxy Chat" ? "Un espacio para pensar, descubrir y crear sin límites." : "Este módulo está planificado y se habilitará por etapas."}</p>
          {active==="Galaxy Chat" ? <>
            {messages.length===0 && <div className="suggestions">
              <button onClick={()=>setMessage("Ayúdame a organizar una idea nueva.")}><BrainCircuit size={17}/><span><b>Explorar una idea</b><small>Convierte pensamientos en un plan</small></span></button>
              <button onClick={()=>setMessage("Ayúdame a crear un proyecto paso a paso.")}><Sparkles size={17}/><span><b>Crear un proyecto</b><small>Empieza con una hoja en blanco</small></span></button>
              <button onClick={()=>setMessage("Explícame un tema de forma sencilla.")}><Compass size={17}/><span><b>Investigar un tema</b><small>Aprende algo nuevo</small></span></button>
            </div>}
            <div className="thread" aria-live="polite">{messages.map((item,index)=><div key={index} className={`message ${item.role}`}><b>{item.role==="user"?"Tú":"Galaxy AI"}</b><p>{item.content}</p></div>)}{busy&&<div className="message assistant"><b>Galaxy AI</b><p>Preparando respuesta…</p></div>}</div>
            {error&&<div className="error-note" role="alert">{error}</div>}
            <form className="composer" onSubmit={sendMessage}><textarea value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();void sendMessage();}}} placeholder="Escribe tu mensaje…" rows={2} disabled={busy}/><div className="composer-bottom"><span>Shift + Enter para nueva línea</span><button className="send-button" type="submit" disabled={busy||!message.trim()} aria-label="Enviar mensaje"><Send size={17}/></button></div></form>
            <p className="disclaimer">La API se ejecuta en el servidor. No escribas contraseñas ni datos privados en el chat.</p>
          </> : <div className="module-placeholder"><div className="placeholder-icon"><Sparkles size={23}/></div><h2>Módulo en construcción</h2><p>La estructura inicial está lista. Las funciones se añadirán por etapas y con controles de seguridad.</p><button onClick={()=>setActive("Galaxy Chat")}>Volver a Galaxy Chat</button></div>}
          <footer>GALAXY AI ULTIMATE <span>•</span> FUNDACIÓN</footer>
        </div>
      </section>

      {showSettings&&<div className="modal-backdrop" role="presentation" onClick={()=>setShowSettings(false)}><section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowSettings(false)} aria-label="Cerrar"><X size={18}/></button><div className="placeholder-icon"><ShieldCheck size={23}/></div><h2 id="settings-title">Conexión segura</h2><p>Introduce el código de acceso que se haya configurado en el servidor. No uses tu contraseña de GitHub ni tu clave de OpenAI.</p><label htmlFor="access-code">Código de acceso de Galaxy</label><div className="code-input"><KeyRound size={17}/><input id="access-code" type="password" autoComplete="off" value={accessCode} onChange={e=>setAccessCode(e.target.value)} placeholder="Código de acceso"/></div><div className="modal-actions"><button className="secondary-button" onClick={()=>setShowSettings(false)}>Cerrar</button><button className="primary-button" onClick={()=>{setShowSettings(false);setError("");}}>Guardar en esta sesión</button></div><small>El código solo permanece en la memoria de esta pestaña.</small></section></div>}
    </main>
  );
}
