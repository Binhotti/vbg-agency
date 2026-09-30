"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, LockKeyhole, Mail, MapPin, MessageCircle, PackageOpen, Send, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactShowcase() {
  const [message, setMessage] = useState("");

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "Novo projeto");
    const body = `Nome: ${data.get("name")}\nE-mail: ${data.get("email")}\nAssunto: ${subject}\n\n${data.get("message")}`;
    window.location.href = `mailto:agencyvbg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return <section id="contato" className="contactShowcase">
    <Image className="contactArtwork" src="/contact-showcase.png" alt="Mensagem digital para a VBG Agency" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw"/>
    <div className="contactIntro">
      <div className="contactKicker"><i/> PRONTO PARA COMEÇAR?</div>
      <h2>Vamos transformar<br/>sua próxima ideia em<br/><em>resultado.</em></h2>
      <p>Estamos prontos para entender seu desafio e criar soluções digitais sob medida para o seu negócio.<br/>Fale com a nossa equipe!</p>
      <div className="contactLinks">
        <a href="mailto:agencyvbg@gmail.com"><span><Mail/></span><b>E-mail<small>agencyvbg@gmail.com</small></b><ArrowUpRight/></a>
        <a href="#contato"><span><MessageCircle/></span><b>WhatsApp<small>Conversar agora</small></b><ArrowUpRight/></a>
        <a href="https://maps.google.com/?q=Joinville,+Santa+Catarina" target="_blank" rel="noreferrer"><span><MapPin/></span><b>Localização<small>Joinville, Santa Catarina</small></b><ArrowUpRight/></a>
      </div>
    </div>
    <form className="contactForm" onSubmit={submitContact}>
      <h3>Envie uma mensagem</h3>
      <p>Preencha os campos abaixo e entraremos em contato o mais breve possível.</p>
      <div className="contactFields">
        <label>Nome completo<div><UserRound/><input name="name" required placeholder="Seu nome"/></div></label>
        <label>E-mail<div><Mail/><input name="email" required type="email" placeholder="seu@email.com"/></div></label>
        <label className="wide">Assunto<div><PackageOpen/><select name="subject" required defaultValue=""><option value="" disabled>Selecione um assunto</option><option>Criação de site</option><option>Sistema sob medida</option><option>Marketing digital</option><option>Outro projeto</option></select><ChevronDown/></div></label>
        <label className="wide">Mensagem<div className="messageField"><MessageCircle/><textarea name="message" required maxLength={500} value={message} onChange={event => setMessage(event.target.value)} placeholder="Conte um pouco sobre o seu projeto..."/></div><small className="counter">{message.length}/500</small></label>
      </div>
      <div className="formBottom"><button type="submit">Enviar mensagem <Send/></button><span><LockKeyhole/> Seus dados estão seguros conosco.</span></div>
    </form>
    <footer className="contactFooter"><Image src="/vbg-logo.png" alt="VBG Agency" width={88} height={50}/><p>© {new Date().getFullYear()} VBG Agency. Todos os direitos reservados.</p></footer>
  </section>;
}
