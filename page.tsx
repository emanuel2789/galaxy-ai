 "use client";

import { useState } from "react";
import {
  Activity, Bot, BrainCircuit, Code2, Compass, ImagePlus, Menu,
  MessageCircle, Mic, Plus, Search, Send, Settings2, Sparkles,
  Video, X, Zap
} from "lucide-react";

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
  const [sent, setSent] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  function sendMessage() {
    const clean = message.trim();
    if (!clean) return;
    setSent((items) => [...items, clean]);
    setMessage("");
  }

  return (
    <main className="shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={21} /></div>
          <div><strong>GALAXY AI</strong><span>ULTIMATE</span></div>
          <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={18}/></button>
        </div>

        <button className="new-chat" onClick={() => { setSent([]); setActive("Galaxy Chat"); }}>
          <Plus size={17}/> Nuevo chat
        </button>

        <div className="nav-label">PLATAFORMA</div>
        <nav className="nav-list">
          {modules.map(({ name, icon: Icon, note }) => (
            <button key={name} title={note} className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => { setActive(name); setMenuOpen(false); }}>
              <Icon size={18}/><span>{name}</span>
              {name === "Galaxy Chat" && <i className="live-dot"/>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="status-card">
            <div className="status-top"><span className="status-light"/> MODO DEMOSTRACIÓN</div>
            <p>La conexión con IA se activará cuando se configure un servicio con presupuesto.</p>
          </div>
          <button className="nav-item settings" onClick={() => setActive("Settings")}><Settings2 size={18}/> Ajustes</button>
          <div className="profile"><div className="avatar">G</div><div><b>Usuario Galaxy</b><small>Espacio personal</small></div></div>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={20}/></button>
          <div className="breadcrumb">Galaxy <span>/</span> <b>{active}</b></div>
          <div className="top-actions"><span className="system-status"><i/> Sistema listo</span><button className="icon-button" aria-label="Buscar"><Search size={18}/></button></div>
        </header>

        <div className="content">
          <div className="welcome-kicker"><span className="kicker-line"/> GALAXY AI ULTIMATE <span className="kicker-line"/></div>
          <div className="hero-orb"><div className="orb-core"><Sparkles size={31}/></div><div className="orbit orbit-one"/><div className="orbit orbit-two"/></div>
          <h1>{active === "Galaxy Chat" ? <>Tu universo.<br/><em>Una nueva inteligencia.</em></> : active}</h1>
          <p className="subtitle">{active === "Galaxy Chat" ? "Un espacio para pensar, descubrir y crear sin límites." : "Este módulo ya tiene su espacio en Galaxy AI. Estamos construyendo sus funciones."}</p>

          {active === "Galaxy Chat" ? (
            <>
              <div className="suggestions">
                <button onClick={() => setMessage("Ayúdame a organizar una idea nueva.")}><BrainCircuit size={17}/><span><b>Explorar una idea</b><small>Convierte pensamientos en un plan</small></span></button>
                <button onClick={() => setMessage("Ayúdame a crear un proyecto paso a paso.")}><Zap size={17}/><span><b>Crear un proyecto</b><small>Empieza con una hoja en blanco</small></span></button>
                <button onClick={() => setMessage("Explícame un tema de forma sencilla.")}><Compass size={17}/><span><b>Investigar un tema</b><small>Aprende algo nuevo</small></span></button>
              </div>
              {sent.length > 0 && <div className="demo-thread">{sent.map((item, i) => <div className="user-bubble" key={i}>{item}</div>)}<div className="demo-notice"><Sparkles size={16}/> Mensaje guardado en esta demostración. La IA todavía no está conectada.</div></div>}
              <div className="composer">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Escribe tu mensaje..." rows={2}/>
                <div className="composer-bottom"><span><Mic size={15}/> Shift + Enter para nueva línea</span><button className="send-button" onClick={sendMessage} aria-label="Enviar mensaje"><Send size={17}/></button></div>
              </div>
              <p className="disclaimer">Modo demostración · No se envían mensajes a ningún servicio externo.</p>
            </>
          ) : (
            <div className="module-placeholder"><div className="placeholder-icon"><Sparkles size={23}/></div><h2>Módulo en construcción</h2><p>La estructura inicial está lista. Las funciones se añadirán por etapas para mantener el proyecto gratuito y seguro.</p><button onClick={() => setActive("Galaxy Chat")}>Volver a Galaxy Chat</button></div>
          )}
          <footer>GALAXY AI ULTIMATE <span>•</span> FASE 1 — FUNDACIÓN</footer>
        </div>
      </section>
    </main>
  );
}