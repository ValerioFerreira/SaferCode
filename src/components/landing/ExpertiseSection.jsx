import React from "react";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, Palette } from "lucide-react";

const CARDS = [
  {
    icon: Code2,
    title: "Software Sob Demanda",
    description:
      "Sistemas de gestão (ERP/CRM), automação de frotas e fluxos operacionais complexos com níveis de acesso granulares.",
    tags: ["ERP", "CRM", "Automação", "APIs"],
  },
  {
    icon: BrainCircuit,
    title: "Inteligência e Ciência de Dados",
    description:
      "Construção de Dashboards (PowerBI/Looker), integração de Machine Learning e automações via bots de IA.",
    tags: ["Machine Learning", "BI", "Automação IA", "ETL"],
  },
  {
    icon: Palette,
    title: "Experiência Digital de Alto Padrão",
    description:
      "Web Design institucional e E-commerce com foco em performance, segurança e estética premium.",
    tags: ["Web Design", "E-commerce", "Performance", "UX"],
  },
];

export default function ExpertiseSection({ techImage }) {
  return (
    <section id="expertise" className="relative py-24 lg:py-32">
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
            Verticais de Expertise
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
            Nossas Verticais de Atuação
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-heading text-xl text-foreground mb-3">
                  {card.title}
                </h3>

                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  {card.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-body font-medium text-accent bg-accent/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background image accent */}
        {techImage && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-16 lg:mt-20 rounded-xl overflow-hidden border border-border"
          >
            <img
              src={techImage}
              alt="Ambiente tecnológico"
              className="w-full h-48 md:h-64 object-cover opacity-60"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}