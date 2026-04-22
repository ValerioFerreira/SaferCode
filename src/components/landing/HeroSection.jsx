import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection({ heroImage }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover scale-110"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
            opacity: 0.38,
          }}
        />
        {/* Multi-layer gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
      </div>

      {/* Animated gradient orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(48 96% 53% / 0.06) 0%, transparent 70%)",
          animation: "pulse 6s ease-in-out infinite",
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-4" style={{
        backgroundImage: "linear-gradient(hsl(210 70% 55% / 0.2) 1px, transparent 1px), linear-gradient(90deg, hsl(210 70% 55% / 0.2) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl lg:text-7xl text-foreground leading-tight tracking-tight mb-6"
          >
            Engenharia de Software{" "}
            <span className="text-primary">e Inteligência</span>{" "}
            de Dados.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            Soluções robustas, seguras e transparentes. Transformamos desafios operacionais
            em ativos digitais de alta performance.
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a
              href="/agendar"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-md hover:opacity-90 transition-opacity group"
            >
              Agendar Reunião de Diagnóstico Presencial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#expertise"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-body font-medium text-base px-8 py-4 rounded-md hover:bg-secondary transition-colors"
            >
              Conhecer Expertise
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}