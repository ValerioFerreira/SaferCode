import React from "react";
import { motion } from "framer-motion";

const BRIDGE_IMAGE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/7f6e97462_generated_07b7a460.png";

// SVG icons as inline components for each technology
const ICONS = {
  // Frontend
  "React": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <circle cx="12" cy="12" r="2.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "Next.js": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l7 9H11z"/>
    </svg>
  ),
  "TypeScript": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <path fill="hsl(220 30% 7%)" d="M14 10h-2.5v7H10v-7H7.5V8.5H14V10zm2.5 7c-.4 0-.8-.1-1.1-.3l.4-1.1c.2.1.4.2.7.2.5 0 .8-.3.8-.9V10H19v5c0 1.3-.7 2-2 2l-.5-.0z"/>
    </svg>
  ),
  "Tailwind": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15C19.67 12 21.33 10.67 22 8c-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z"/>
    </svg>
  ),
  // Backend
  "Rails": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-10-5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
    </svg>
  ),
  "Node.js": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8v8l-8 4-8-4V8l8-3.82z"/>
    </svg>
  ),
  "Nest.js": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M14.13 2.67c-.28-.47-.96-.47-1.24 0L2.38 20.33c-.28.47.07 1.05.62 1.05h18.99c.55 0 .9-.58.62-1.05L14.13 2.67zm-1.06 1.76l8.53 14.74H4.4l8.67-14.74z"/>
    </svg>
  ),
  "Python": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C9.5 2 8 3.2 8 5v2h4v1H5.5C3.6 8 2 9.6 2 11.5v3C2 16.4 3.6 18 5.5 18H7v-2.5C7 13.6 8.6 12 10.5 12H14c1.4 0 2.5-1.1 2.5-2.5V5C16.5 3.1 14.8 2 12 2zm-1 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm2 16c2.5 0 4-1.2 4-3v-2h-4v-1h6.5c1.9 0 3.5-1.6 3.5-3.5v-3C22 7.6 20.4 6 18.5 6H17v2.5C17 10.4 15.4 12 13.5 12H10c-1.4 0-2.5 1.1-2.5 2.5V19c0 1.9 1.7 3 4.5 3zm1-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
    </svg>
  ),
  "Java": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M8.85 16.83c-.02 0-1.18.34-1.18.34s.44.74 2.38.74c1.35 0 3.15-.55 3.15-2.33 0-1.6-1.75-2.1-1.75-3.07 0 0 .95.48.95 1.6 0 1.04-1.1 1.43-1.1 1.43s.65-.4.65-1.2c0-.9-1.1-1.35-1.1-2.47s.85-1.8.85-1.8-1.5.5-1.5 2.08c0 1.3 1.1 1.7 1.1 2.6s-.7 1.2-1.45 1.2c-.52 0-1-.12-1-.12zm8.2-5.6s.53 1.35.53 2.43c0 2.2-2.25 3.4-4.75 3.4-2 0-2.9-.8-2.9-.8s2.48-.75 3.55-2.73c.7-1.3.57-2.3.57-2.3z"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  ),
  // Infra
  "Docker": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M13 3h-2v2h2V3zm-4 0H7v2h2V3zm-4 0H3v2h2V3zm8 4h-2v2h2V7zm-4 0H7v2h2V7zm-4 0H3v2h2V7zm8 4h-2v2h2v-2zm-4 0H7v2h2v-2zM3 11h2v2H3v-2zm17.5 1c-.3-.9-1.2-1-1.2-1H17c0-2.8-2.2-5-5-5v2c1.65 0 3 1.35 3 3H9v2h11.5s.3-.1 0-1z"/>
    </svg>
  ),
  "CI/CD": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  ),
  "AWS": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M6.76 16.46L4 15.5l1-3 2 .8L6.76 16.46zM8 8l-.5 3 2.5.8L11 8H8zm5 0l1 3.8 2.5-.8L16 8h-3zm2.24 8.46L17 13.3l-2 .8 1 3 2.24-.64zM12 17l-2-4h4l-2 4z"/>
      <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
    </svg>
  ),
  "Kubernetes": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2l-1.5 3.5-3.7.5 2.7 2.6-.6 3.7L12 10.5l3.1 1.8-.6-3.7 2.7-2.6-3.7-.5L12 2zm0 9.5L9 19h6l-3-7.5zm-7 4l-1 2.5H6l-1-2.5zm14 0l-1 2.5H20l-1-2.5z"/>
    </svg>
  ),
  // Data
  "PostgreSQL": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 3C8.13 3 5 5.25 5 8v8c0 2.75 3.13 5 7 5s7-2.25 7-5V8c0-2.75-3.13-5-7-5zm0 2c3.31 0 5 1.57 5 3s-1.69 3-5 3-5-1.57-5-3 1.69-3 5-3zm5 11c0 1.43-1.69 3-5 3s-5-1.57-5-3v-1.35C8.31 14.53 10.09 15 12 15s3.69-.47 5-1.35V16zm0-4c0 1.43-1.69 3-5 3s-5-1.57-5-3v-1.35C8.31 10.53 10.09 11 12 11s3.69-.47 5-1.35V12z"/>
    </svg>
  ),
  "MongoDB": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C9 2 7 5 7 8c0 2 .7 3.5 1.8 4.7L12 22l3.2-9.3C16.3 11.5 17 10 17 8c0-3-2-6-5-6zm0 7.5c-.8 0-1.5-.7-1.5-1.5S11.2 6.5 12 6.5s1.5.7 1.5 1.5S12.8 9.5 12 9.5z"/>
    </svg>
  ),
  "Machine Learning": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 2a8 8 0 110 16A8 8 0 0112 4zm0 2a6 6 0 100 12A6 6 0 0012 6zm0 2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/>
    </svg>
  ),
  "BI": () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M5 20h14v-2H5v2zm0-4h4v-6H5v6zm6 0h4V6h-4v10zm6 0h4v-4h-4v4z"/>
    </svg>
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
    <circle cx="12" cy="12" r="4"/>
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