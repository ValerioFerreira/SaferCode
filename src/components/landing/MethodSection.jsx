import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Zap, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Diagnóstico",
    description: "Imersão no negócio para entender a dor real. Mapeamos processos, identificamos gargalos e definimos o escopo com precisão.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Arquitetura & UX",
    description: "Desenho técnico da solução antes de escrever a primeira linha de código. Prototipação e validação com stakeholders.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Desenvolvimento Ágil",
    description: "Ciclos de entrega (Sprints) com visibilidade total do progresso pelo cliente. Código limpo e revisado.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Auditoria & Suporte",
    description: "Entrega de código limpo, auditável e documentado. Suporte técnico contínuo e monitoramento de performance.",
  },
];

export default function MethodSection() {
  return (
    <section id="metodo" className="relative py-24 lg:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
            Processo
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            O Método SaferCode
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Cada projeto segue um fluxo estruturado para garantir previsibilidade, qualidade e controle em todas as etapas.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Continuous horizontal connector — desktop only */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-border z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col"
              >
                {/* Icon circle — sits on the line */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center mb-5 shrink-0">
                  <step.icon className="w-6 h-6 text-primary" />
                  {/* Yellow dot center marker */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                </div>

                <span className="font-heading text-4xl leading-none mb-2" style={{ color: "#FFD700" }}>
                  {step.number}
                </span>

                <h3 className="font-heading text-lg text-foreground mb-2">
                  {step.title}
                </h3>

                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}