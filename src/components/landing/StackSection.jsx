import React from "react";
import { motion } from "framer-motion";

const BRIDGE_IMAGE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/7f6e97462_generated_07b7a460.png";

// SVG icons as inline components for each technology
// Filtro que transforma PRETO em #FACC14
const YELLOW_FILTER = "brightness(0) saturate(100%) invert(85%) sepia(9%) saturate(6879%) hue-rotate(349deg) brightness(108%) contrast(96%)";
const ICON_CLASS = "w-8 h-8 object-contain";

const ICONS = {
  "React": () => (
    <img
      src="/images/React.svg"
      alt="React"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Next.js": () => (
    <img
      src="/images/Next.svg"
      alt="Next.js"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "TypeScript": () => (
    <img
      src="/images/TypeScript.svg"
      alt="TypeScript"
      className={ICON_CLASS}

    />
  ),
  "Tailwind": () => (
    <img
      src="/images/Tailwind.svg"
      alt="Tailwind"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Rails": () => (
    <img
      src="/images/Rails.svg"
      alt="Rails"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Node.js": () => (
    <img
      src="/images/Node.svg"
      alt="Node.js"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Nest.js": () => (
    <img
      src="/images/Nest.svg"
      alt="Nest.js"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Python": () => (
    <img
      src="/images/Python.svg"
      alt="Python"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Java": () => (
    <img
      src="/images/Java.svg"
      alt="Java"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Docker": () => (
    <img
      src="/images/Docker.svg"
      alt="Docker"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "CI/CD": () => (
    <img
      src="/images/CICD.svg"
      alt="CI/CD"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "AWS": () => (
    <img
      src="/images/AWS.svg"
      alt="AWS"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Kubernetes": () => (
    <img
      src="/images/Kubernetes.svg"
      alt="Kubernetes"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "PostgreSQL": () => (
    <img
      src="/images/PostgresSQL.png"
      alt="PostgreSQL"
      className={ICON_CLASS}
    />
  ),
  "MongoDB": () => (
    <img
      src="/images/MongoDB.svg"
      alt="MongoDB"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "Machine Learning": () => (
    <img
      src="/images/MachineLearning.svg"
      alt="Machine Learning"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
  "BI": () => (
    <img
      src="/images/BI.svg"
      alt="BI"
      className={ICON_CLASS}
      style={{ filter: YELLOW_FILTER }}
    />
  ),
};

const TECH_GROUPS = [
  {
    label: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    bgImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=60",
    accentColor: "hsl(210 70% 55%)",
  },
  {
    label: "Backend",
    tags: ["Rails", "Node.js", "Nest.js", "Python", "Java"],
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=60",
    accentColor: "hsl(142 60% 45%)",
  },
  {
    label: "Infra / DevOps",
    tags: ["Docker", "CI/CD", "AWS", "Kubernetes"],
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=60",
    accentColor: "hsl(25 90% 55%)",
  },
  {
    label: "Dados",
    tags: ["PostgreSQL", "MongoDB", "Machine Learning", "BI"],
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60",
    accentColor: "hsl(48 96% 53%)",
  },
];

const DefaultIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export default function StackSection({ dataImage }) {
  return (
    <>
      {/* Bridge image */}
      <div className="relative h-64 md:h-80 overflow-hidden pointer-events-none -my-1">
        <img
          src={BRIDGE_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(220 30% 7%) 0%, transparent 40%, transparent 60%, hsl(220 30% 7%) 100%)",
          }}
        />
      </div>

      <section id="stack" className="relative py-24 lg:py-32 overflow-hidden">
        {dataImage && (
          <div className="absolute inset-0 pointer-events-none">
            <img src={dataImage} alt="" className="w-full h-full object-cover opacity-5" />
            <div className="absolute inset-0 bg-background/95" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top row: title+description LEFT, terminal card RIGHT */}
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
            {/* Left: title + description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
                Transparência Técnica
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                Stack Tecnológica
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed max-w-lg">
                Tecnologia a serviço do problema. Escolhemos a stack mais eficiente
                para a escalabilidade do seu projeto — sem amarras a frameworks da moda.
              </p>
            </motion.div>

            {/* Right: compact terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-5 font-mono text-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <span className="text-muted-foreground ml-2">terminal</span>
              </div>
              <pre className="text-muted-foreground leading-6">
                <code>{`$ safercode stack --analyze
→ Avaliando requisitos...
→ Stack recomendada: ✓
→ Segurança: auditada
→ Performance: otimizada
→ Deploy: automatizado (CI/CD)`}</code>
              </pre>
            </motion.div>
          </div>

          {/* Bottom: 4 group cards with background images */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH_GROUPS.map((group, gi) => {
              const IconComp = ICONS[group.tags[0]] || DefaultIcon;
              return (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + gi * 0.1, duration: 0.5 }}
                  className="relative rounded-xl border border-border overflow-hidden"
                >
                  {/* Background image with gradient overlay */}
                  <img
                    src={group.bgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(220 30% 7% / 0.95) 0%, hsl(220 30% 7% / 0.75) 100%)`,
                    }}
                  />
                  {/* Accent top border */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: group.accentColor }} />

                  <div className="relative p-5">
                    <p
                      className="text-xs font-body font-semibold uppercase tracking-widest mb-4"
                      style={{ color: group.accentColor }}
                    >
                      {group.label}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                      {group.tags.map((tag) => {
                        const Icon = ICONS[tag] || DefaultIcon;
                        return (
                          <motion.div
                            key={tag}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex flex-col items-center gap-1.5 px-3 py-2.5 bg-card/60 border border-border rounded-lg cursor-default hover:border-primary hover:bg-primary/5 hover:text-primary transition-colors duration-200 min-w-[60px]"
                          >
                            <span className="text-primary/80" style={{ color: group.accentColor + "cc" }}>
                              <Icon />
                            </span>
                            <span className="font-body font-medium text-xs text-foreground text-center leading-tight">
                              {tag}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}