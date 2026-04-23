import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Truck, BarChart3, Globe } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SharedFooter from "@/components/landing/SharedFooter";

const CASES = [
  {
    icon: Building2,
    sector: "Setor Público e Institucional",
    client: "CBMPE · IACB",
    cover: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=70",
    problem: "Processos burocráticos físicos gerando filas, retrabalho e lentidão no atendimento ao cidadão. Emissão de certificados dependente de fluxos manuais e sujeita a erros.",
    solution: "Digitalização completa dos processos críticos com plataforma web segura, emissão automatizada de certificados com QR Code de validação e painel administrativo com visão em tempo real das demandas.",
    tags: ["Sistemas Web", "Certificados Digitais", "Gestão Pública", "UX Cidadão"],
    accentColor: "#FFD700",
  },
  {
    icon: Truck,
    sector: "Logística e Gestão de Frotas",
    client: "Setor de Transportes",
    cover: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=70",
    problem: "Falhas operacionais no controle de abastecimento, documentação descentralizada e impossibilidade de rastrear consumo e custos por veículo ou motorista.",
    solution: "Sistema inteligente de gestão de frotas com controle de abastecimento em tempo real, gestão documental centralizada, alertas automatizados e relatórios de economia para tomada de decisão.",
    tags: ["ERP Logístico", "Controle de Frotas", "Automação", "Dashboards"],
    accentColor: "#4A90D9",
  },
  {
    icon: BarChart3,
    sector: "Business Intelligence Estratégico",
    client: "RH & Logística",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=70",
    problem: "Dados dispersos em múltiplas fontes (ERP, planilhas, sistemas legados) sem integração, impedindo análises consolidadas e causando decisões baseadas em informações defasadas.",
    solution: "Arquitetura de Data Warehouse com ETL robusto, dashboards de alta complexidade em PowerBI e Looker para departamentos de RH e Logística, com KPIs em tempo real e visões históricas.",
    tags: ["PowerBI", "Looker", "Data Warehouse", "ETL", "Machine Learning"],
    accentColor: "#50C878",
  },
  {
    icon: Globe,
    sector: "Experiência Digital Premium",
    client: "Hotelaria & E-commerce",
    cover: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=70",
    problem: "Presença digital abaixo do padrão da marca, afastando clientes de alto valor e comprometendo a percepção de exclusividade e confiança do negócio.",
    solution: "Engenharia de front-end e web design de alto padrão unindo estética de luxo a uma infraestrutura técnica impecável — performance superior, SEO técnico e experiência de compra otimizada para conversão.",
    tags: ["Web Design", "E-commerce", "Performance", "SEO Técnico", "UX Premium"],
    accentColor: "#C084FC",
  },
];

export default function Projetos() {
  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero */}
        <section className="py-16 lg:py-24 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
              Expertise em Prática
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Problemas Reais,{" "}
              <span className="text-primary">Soluções Comprovadas.</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada projeto representa um desafio real enfrentado por uma organização — e a engenharia de alto nível que aplicamos para resolvê-lo.
            </p>
          </motion.div>
        </section>

        {/* Cases grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {CASES.map((c, i) => (
              <motion.div
                key={c.sector}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Cover image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={c.cover}
                    alt={c.sector}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.accentColor + "22" }}>
                      <c.icon className="w-4 h-4" style={{ color: c.accentColor }} />
                    </div>
                    <span className="text-xs font-body font-semibold uppercase tracking-widest" style={{ color: c.accentColor }}>
                      {c.sector}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-xs font-body text-muted-foreground/60 uppercase tracking-widest mb-4">{c.client}</p>
                  <div className="space-y-5 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-destructive/60" />
                        <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest">Problema</span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border">
                        {c.problem}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest">Solução</span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed pl-4 border-l border-primary/30">
                        {c.solution}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-xs font-body font-medium px-3 py-1 rounded-full border border-border text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-px h-16 bg-primary mx-auto mb-10" />
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Sua próxima solução precisa de engenharia de verdade.
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