import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const LOGO_WIDE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/5556524c0_logo_safercode_wide.png";

const HOME_SUB = [
  { label: "Expertise & Stack", href: "/#expertise" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Método & Pilares", href: "/#metodo" },
];

const NAV_LINKS = [
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Conteúdos", href: "/conteudos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [homeDropOpen, setHomeDropOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setHomeDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20 lg:h-24">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={LOGO_WIDE} alt="SaferCode" className="h-14 lg:h-16" />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Home with dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setHomeDropOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${homeDropOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {homeDropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
                >
                  {HOME_SUB.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setHomeDropOpen(false)}
                      className="block px-5 py-3 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors border-b border-border/50 last:border-0"
                    >
                      {sub.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/agendar"
            className="bg-primary text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Agendar Diagnóstico
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {/* Home accordion */}
              <button
                onClick={() => setMobileHomeOpen((v) => !v)}
                className="flex items-center justify-between text-base font-body text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Home
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileHomeOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileHomeOpen && (
                <div className="pl-4 flex flex-col gap-2 border-l border-primary/30 mb-1">
                  {HOME_SUB.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-body text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/agendar"
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-5 py-3 rounded-md text-center hover:opacity-90 transition-opacity"
              >
                Agendar Diagnóstico
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}