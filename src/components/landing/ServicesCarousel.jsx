import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";

const SERVICES = [
  {
    title: "Sites Institucionais",
    description: "Desenvolvemos portais de alto padrão que transmitem a autoridade e a solidez da sua marca no ambiente digital.",
    includes: [
      "Design exclusivo e responsivo",
      "SEO técnico para o Google",
      "Performance de carregamento ultra-rápida",
      "Painel administrativo intuitivo",
    ],
  },
  {
    title: "Landing Pages",
    description: "Páginas de alta conversão projetadas para transformar visitantes em clientes através de design persuasivo e técnico.",
    includes: [
      "Copy estratégico e CTAs otimizados",
      "Testes A/B para performance",
      "Integração nativa com CRMs",
      "Rastreamento completo de conversão",
    ],
  },
  {
    title: "E-commerce",
    description: "Lojas virtuais escaláveis focadas na experiência de compra do usuário e na segurança das transações.",
    includes: [
      "Gestão de estoque e pedidos",
      "Checkout otimizado (One-page)",
      "Integração com gateways de pagamento",
      "Segurança SSL e proteção de dados",
    ],
  },
  {
    title: "E-mails Corporativos",
    description: "Infraestrutura de comunicação profissional e segura para garantir a credibilidade da sua operação.",
    includes: [
      "Domínios personalizados (@suaempresa)",
      "Filtros avançados anti-spam/phishing",
      "Integração com Zoho e Google Workspace",
      "Suporte técnico dedicado",
    ],
  },
  {
    title: "Sistemas CRM",
    description: "Implementação e personalização de ferramentas de gestão de relacionamento para otimizar seu funil de vendas.",
    includes: [
      "Automação de réguas de contato",
      "Gestão centralizada de leads",
      "Relatórios de produtividade comercial",
      "Histórico completo de interações",
    ],
  },
  {
    title: "Automações de Processos",
    description: "Eliminamos tarefas repetitivas através de bots de IA e fluxos inteligentes, aumentando a eficiência da sua equipe.",
    includes: [
      "Integrações complexas via API",
      "Bots de atendimento (WhatsApp/Web)",
      "Automação de fluxos internos",
      "Redução de erro humano",
    ],
  },
  {
    title: "Business Intelligence (BI)",
    description: "Transformamos dados brutos em decisões estratégicas através de dashboards interativos e inteligência de dados.",
    includes: [
      "Consolidação de múltiplas bases de dados",
      "Dashboards em PowerBI/Looker",
      "Visualização de KPIs em tempo real",
      "Modelagem de Machine Learning",
    ],
  },
];

const N = SERVICES.length;

export default function ServicesCarousel() {
  // center goes 0..N-1, all cards accessible
  const [center, setCenter] = useState(0);
  const dragStartX = useRef(null);

  const prev = () => setCenter((i) => Math.max(0, i - 1));
  const next = () => setCenter((i) => Math.min(N - 1, i + 1));

  // Build visible triple: handle edges by clamping neighbours
  const leftIdx = Math.max(0, center - 1);
  const rightIdx = Math.min(N - 1, center + 1);

  // We always show 3 slots; hide left/right slot if at boundary
  const showLeft = center > 0;
  const showRight = center < N - 1;

  const handleDragStart = (e) => {
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    dragStartX.current = null;
  };

  const CardSlot = ({ idx, isCenter, onClickSide }) => (
    <motion.div
      key={idx}
      animate={{
        scale: isCenter ? 1.08 : 0.88,
        opacity: isCenter ? 1 : 0.45,
        filter: isCenter ? "blur(0px)" : "blur(3px)",
        zIndex: isCenter ? 10 : 1,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      onClick={!isCenter ? onClickSide : undefined}
      className={`flex flex-col bg-card border rounded-xl p-7 flex-1 ${
        isCenter
          ? "border-primary/40 shadow-lg shadow-primary/10"
          : "border-border cursor-pointer"
      }`}
      style={{ minWidth: 0 }}
    >
      <div
        className="h-0.5 bg-primary mb-6 transition-all duration-500"
        style={{ width: isCenter ? "100%" : "40px" }}
      />
      <h3 className="font-heading text-xl text-foreground mb-3">
        {SERVICES[idx].title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
        {SERVICES[idx].description}
      </p>
      <ul className="space-y-2 mb-8">
        {SERVICES[idx].includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="font-body text-xs text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
      <a
        href="/agendar"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:gap-3 transition-all duration-200 group/btn"
      >
        Agende uma reunião
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );

  return (
    <section id="servicos" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
              Ecossistema de Serviços
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
              O que entregamos
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={center <= 0}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-body text-muted-foreground tabular-nums">
              {center + 1} / {N}
            </span>
            <button
              onClick={next}
              disabled={center >= N - 1}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Spotlight track */}
        <div
          className="relative flex items-center justify-center gap-6 select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {/* Left ghost */}
          {showLeft ? (
            <CardSlot idx={leftIdx} isCenter={false} onClickSide={prev} />
          ) : (
            <div className="flex-1" style={{ minWidth: 0 }} />
          )}

          {/* Center card */}
          <CardSlot idx={center} isCenter={true} />

          {/* Right ghost */}
          {showRight ? (
            <CardSlot idx={rightIdx} isCenter={false} onClickSide={next} />
          ) : (
            <div className="flex-1" style={{ minWidth: 0 }} />
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenter(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === center ? "bg-primary w-6" : "bg-border w-1.5 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}