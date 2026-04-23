import React from "react";
import { MapPin, Mail, Instagram, Twitter, Linkedin } from "lucide-react";

const LOGO_WIDE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/5556524c0_logo_safercode_wide.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Método", href: "/#metodo" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Projetos", href: "/projetos" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Agendar Diagnóstico", href: "/agendar" },
];

export default function SharedFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img src={LOGO_WIDE} alt="SaferCode" className="h-14 mb-4" />
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              Engenharia de Software e Consultoria Técnica. Segurança, transparência e código auditável.
            </p>
          </div>
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
          <div>
            <h4 className="font-body font-semibold text-sm text-foreground mb-4">Navegação</h4>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-8 flex items-center gap-4">
          <a href="https://instagram.com/safercode" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://x.com/SaferCode" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/company/safercode" target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} SaferCode. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-muted-foreground">Engenharia de Software · Recife/PE</p>
        </div>
      </div>
    </footer>
  );
}