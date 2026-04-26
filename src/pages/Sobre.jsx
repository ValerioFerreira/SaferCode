import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Microscope, Eye } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SharedFooter from "@/components/landing/SharedFooter";

const LOGO_SHORT = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/61004af3b_logo_safercode_short.png";

const PILLARS = [
  {
    icon: Shield,
    title: "Experiência que resolve",
    description:
      "Atuação consistente em contextos operacionais complexos, onde falhas não são uma opção. Com o passar dos anos, acumulamos experiência prática em diferentes setores, enfrentando desafios reais. Isso nos permite criar soluções que funcionam bem fora do ambiente controlado.",
  },
  {
    icon: Microscope,
    title: "Rigor técnico aplicado",
    description:
      "Tratamos dados e software como disciplinas de engenharia, não apenas como tarefas rotineiras. Estruturamos soluções com base em métodos sólidos, priorizando a previsibilidade, a escalabilidade e a geração de valor mensurável em cada entrega.",
  },
  {
    icon: Eye,
    title: "Transparência por padrão",
    description:
      "Desenvolvimento sem caixa-preta. Nossas soluções são construídas com rastreabilidade, documentação e clareza técnica desde o início. Isso nos permite ter total visibilidade sobre o que está sendo entregue e como o projeto evolui ao longo do tempo.",
  },
];

export default function Sobre() {
  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(hsl(210 70% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(210 70% 55% / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
                  Nossa Empresa
                </span>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
                  Fusão entre{" "}
                  <span className="text-primary">Rigor Técnico</span>{" "}
                  e Visão Estratégica.
                </h1>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  A SaferCode foi criada com base na prática, não apenas na teoria. Somos uma equipe
                  muito experiente, formada por engenheiros e especialistas que já trabalharam em
                  diversos setores de negócios e tecnologia por mais de dez anos. Essa experiência nos
                  permite ir além do código e identificar os pontos críticos e as oportunidades de melhoria
                  em cada operação. Mais do que simplesmente criar sistemas, nós desenvolvemos soluções
                  completas que ajudam a organizar, automatizar e dar mais visibilidade aos processos.
                </p>
                <div className="flex flex-wrap gap-10">
                  {[
                    { value: "10+", label: "Anos de experiência" },
                    { value: "50+", label: "Projetos desenvolvidos" },
                    { value: "100%", label: "Código auditável" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-3xl text-primary mb-1">{stat.value}</p>
                      <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl scale-150" />
                  <img
                    src={LOGO_SHORT}
                    alt="SaferCode"
                    className="relative w-48 lg:w-64 opacity-90"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 lg:py-28 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
                Pilares de Atuação
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
                O que nos diferencia
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group relative bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <pillar.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-4">{pillar.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-px h-16 bg-primary mx-auto mb-10" />
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Será que a sua operação pode ser mais eficiente?
              </h2>
              <a
                href="/agendar"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-10 py-4 rounded-md hover:opacity-90 transition-opacity group"
              >
                Agendar Diagnóstico Presencial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}