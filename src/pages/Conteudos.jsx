import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, X, Check } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import SharedFooter from "@/components/landing/SharedFooter";

const COVER_MAP = {
  "Engenharia de Software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70",
  "Inteligência de Dados": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70",
  "IA & Automação": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=70",
  "Cases de Sucesso": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
};

export default function Conteudos() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dynamic categories from DB (derived after fetch)
  const [availableCategories, setAvailableCategories] = useState([]);

  // Multi-select filter
  const [selectedThemes, setSelectedThemes] = useState([]); // empty = show all
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    fetch('/api/conteudos')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPosts(data);
          // Extract unique categories that actually have posts
          const cats = [...new Set(data.map(p => p.category).filter(Boolean))].sort();
          setAvailableCategories(cats);
        }
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    };
    if (filterOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const toggleTheme = (cat) => {
    setSelectedThemes(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => setSelectedThemes([]);

  // OR filtering: show post if any selected theme matches; empty selection = all
  const filtered = selectedThemes.length === 0
    ? posts
    : posts.filter(p => selectedThemes.includes(p.category));

  const activeCount = selectedThemes.length;

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero */}
        <section className="py-16 lg:py-24 px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
              Portal de Autoridade Técnica
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Insights & Engenharia
            </h1>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
              Perspectivas técnicas, cases e análises de mercado do time SaferCode.
            </p>
          </motion.div>
        </section>

        {/* Filter bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left: active pills */}
            <div className="flex items-center flex-wrap gap-2">
              {activeCount === 0 ? (
                <span className="text-sm font-body text-muted-foreground">
                  Todos os conteúdos <span className="text-foreground font-medium">({posts.length})</span>
                </span>
              ) : (
                <>
                  {selectedThemes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => toggleTheme(theme)}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/40 text-xs font-body font-semibold px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {theme} <X className="w-3 h-3" />
                    </button>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors underline-offset-2 underline"
                  >
                    Limpar filtros
                  </button>
                </>
              )}
            </div>

            {/* Right: Filter button */}
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => setFilterOpen(v => !v)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-body text-sm font-semibold transition-all duration-200 ${
                  filterOpen || activeCount > 0
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filtrar por tema
                {activeCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {activeCount}
                  </span>
                )}
              </button>

              {/* Dropdown modal */}
              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded-2xl shadow-2xl shadow-black/20 p-5 min-w-[280px]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading text-sm text-foreground">Filtrar por tema</h3>
                      <button
                        onClick={() => setFilterOpen(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {loading ? (
                      <p className="text-sm font-body text-muted-foreground text-center py-4">Carregando temas...</p>
                    ) : availableCategories.length === 0 ? (
                      <p className="text-sm font-body text-muted-foreground text-center py-4">Nenhum tema disponível.</p>
                    ) : (
                      <div className="space-y-1">
                        {availableCategories.map(cat => {
                          const isSelected = selectedThemes.includes(cat);
                          const count = posts.filter(p => p.category === cat).length;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => toggleTheme(cat)}
                              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-150 ${
                                isSelected
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-foreground hover:bg-secondary/40'
                              }`}
                            >
                              <span>{cat}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{count}</span>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-primary border-primary' : 'border-border'
                                }`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {activeCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 w-full text-xs font-body text-muted-foreground hover:text-foreground transition-colors text-center"
                      >
                        Limpar todos os filtros
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
            <div className="text-center py-24">
              <p className="text-muted-foreground font-body mb-4">Nenhum post encontrado para os temas selecionados.</p>
              <button onClick={clearFilters} className="text-primary font-body text-sm underline">Limpar filtros</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
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
                      <h3 className="font-heading text-lg text-foreground mb-3 leading-snug group-hover:text-primary transition-colors flex-1">
                        {post.title}
                      </h3>
                      <span className="text-xs font-body text-muted-foreground/60">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString("pt-BR", {
                              day: "2-digit", month: "long", year: "numeric"
                            })
                          : ""}
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