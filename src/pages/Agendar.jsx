import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, User, FileText, Mail } from "lucide-react";
import SharedFooter from "@/components/landing/SharedFooter";

const LOGO_WIDE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/5556524c0_logo_safercode_wide.png";

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return value;
}

const INPUT_CLASS =
  "w-full bg-card border border-border rounded-lg pl-11 pr-4 py-3.5 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors";
const LABEL_CLASS =
  "block text-xs font-body font-semibold text-muted-foreground uppercase tracking-widest mb-2";

export default function Agendar() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", descricao: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handlePhone = (e) => setForm((f) => ({ ...f, telefone: formatPhone(e.target.value) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send-diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro desconhecido");
      setSent(true);
    } catch (err) {
      setError(err.message || "Falha ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="/"><img src={LOGO_WIDE} alt="SaferCode" className="h-14" /></a>
          <a href="/" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-2xl">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-heading text-3xl text-foreground mb-4">Solicitação Recebida!</h2>
              <p className="font-body text-muted-foreground mb-8">
                Nossa equipe entrará em contato em breve pelo e-mail ou telefone informado para confirmar o horário do diagnóstico presencial.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Voltar ao site
              </a>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-10">
                <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
                  Diagnóstico Gratuito
                </span>
                <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
                  Agende seu Diagnóstico Presencial
                </h1>
                <p className="font-body text-muted-foreground leading-relaxed max-w-lg">
                  Reunião conduzida por nossos engenheiros e gestores. Sem custo, sem compromisso.
                  Presencial em Recife/PE ou remoto.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome / Empresa */}
                <div>
                  <label className={LABEL_CLASS}>Nome Completo ou Nome da Empresa</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      required
                      type="text"
                      placeholder="João Silva ou SaferCode Ltda."
                      value={form.nome}
                      onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <label className={LABEL_CLASS}>E-mail de Contato</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      required
                      type="email"
                      placeholder="joao@empresa.com.br"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label className={LABEL_CLASS}>Telefone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      required
                      type="tel"
                      placeholder="(81) 99999-9999"
                      value={form.telefone}
                      onChange={handlePhone}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label className={LABEL_CLASS}>Descrição das Necessidades</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                    <textarea
                      required
                      rows={5}
                      placeholder="Descreva brevemente o desafio ou projeto que deseja resolver..."
                      value={form.descricao}
                      onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3">
                    <p className="text-destructive text-sm font-body">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60 group"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar Diagnóstico Presencial
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs font-body text-muted-foreground">
                  Gratuito · Sem compromisso · Presencial em Recife/PE ou remoto
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}