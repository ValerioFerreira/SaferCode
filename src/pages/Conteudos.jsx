import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { mockApi as base44 } from "@/api/mockApi";
import SharedFooter from "@/components/landing/SharedFooter";

const LOGO_WIDE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/5556524c0_logo_safercode_wide.png";

const CATEGORIES = ["Todos", "Engenharia de Software", "Inteligência de Dados", "IA & Automação", "Cases de Sucesso"];

const COVER_MAP = {
  "Engenharia de Software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70",
  "Inteligência de Dados": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70",
  "IA & Automação": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=70",
  "Cases de Sucesso": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
};

export default function Conteudos() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.list("-published_at", 50).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === "Todos"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="/"><img src={LOGO_WIDE} alt="SaferCode" className="h-14" /></a>
          <div className="flex items-center gap-6">
            <a href="/#expertise" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors hidden md:block">Expertise</a>
            <a href="/conteudos" className="text-sm font-body text-primary font-semibold">Conteúdos</a>
            <a href="/agendar" className="bg-primary text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity">
              Agendar Diagnóstico
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 lg:py-28 px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
              Blog de Engenharia
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Insights & Engenharia
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              Perspectivas técnicas, cases e análises de mercado do time SaferCode.
            </p>
          </motion.div>
        </section>

        {/* Filter tabs */}
        <div className="px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-secondary/40" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-secondary/40 rounded w-1/3" />
                    <div className="h-5 bg-secondary/40 rounded w-3/4" />
                    <div className="h-3 bg-secondary/40 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground font-body py-20">Nenhum post encontrado.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/conteudos/${post.id}`}
                    className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.cover_url || COVER_MAP[post.category]}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-heading text-lg text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="text-xs font-body text-muted-foreground/60">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : ""}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}