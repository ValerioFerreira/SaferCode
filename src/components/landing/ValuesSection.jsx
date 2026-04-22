import React from "react";
import { motion } from "framer-motion";
import { Eye, Lock, Users } from "lucide-react";

const VALUES = [
  {
    icon: Eye,
    title: "Transparência no Código",
    description:
      "Todo código produzido é 100% auditável pelo cliente. Sem caixas-pretas, sem dependências ocultas. Você é dono do seu sistema.",
  },
  {
    icon: Lock,
    title: "Segurança por Padrão",
    description:
      "Segurança não é um extra — é premissa. Desde a arquitetura até o deploy, cada decisão técnica considera vetores de risco.",
  },
  {
    icon: Users,
    title: "Suporte Humanizado",
    description:
      "Atendimento direto com engenheiros e gestores. Sem filas de suporte genérico. Seu projeto tem um time dedicado.",
  },
];

export default function ValuesSection() {
  return (
    <section id="valores" className="relative py-24 lg:py-32 bg-secondary/20">
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
            Manifesto
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
            Nossos Pilares
          </h2>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="font-heading text-xl text-foreground mb-3">
                {value.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}