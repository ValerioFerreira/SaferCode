import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, Instagram, Twitter, Linkedin } from "lucide-react";

export default function FooterContact() {
  return (
    <footer id="contato" className="relative">
      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
              Vamos Conversar
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Leve nossa equipe de especialistas até sua empresa.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              A primeira reunião de diagnóstico é presencial e conduzida por nossos 
              gestores e engenheiros. Sem custo, sem compromisso.
            </p>

            <a
              href="/agendar"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-10 py-4 rounded-md hover:opacity-90 transition-opacity group"
            >
              Agendar Reunião de Diagnóstico Presencial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-4 text-xs font-body text-muted-foreground">
              Gratuito · Presencial em Recife/PE ou remoto
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer bar */}
      <div className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <img
                src="https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/5556524c0_logo_safercode_wide.png"
                alt="SaferCode"
                className="h-8 mb-4"
              />
              <p className="font-body text-sm text-muted-foreground max-w-xs">
                Engenharia de Software e Consultoria Técnica. Segurança, transparência e código auditável.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-body font-semibold text-sm text-foreground mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">Recife, Pernambuco — Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">contato@safercode.com.br</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-body font-semibold text-sm text-foreground mb-4">Navegação</h4>
              <div className="space-y-2">
                {[
                { label: "Expertise", href: "/#expertise" },
                { label: "Método", href: "/#metodo" },
                { label: "Tecnologias", href: "/#stack" },
                { label: "Conteúdos", href: "/conteudos" },
                { label: "Agendar Diagnóstico", href: "/agendar" },
              ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://instagram.com/safercode"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/SaferCode"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/safercode"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Bottom */}
          <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-muted-foreground">
              © {new Date().getFullYear()} SaferCode. Todos os direitos reservados.
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Engenharia de Software · Recife/PE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}