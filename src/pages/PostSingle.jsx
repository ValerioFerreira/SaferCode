import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mockApi as base44 } from "@/api/mockApi";
import SharedFooter from "@/components/landing/SharedFooter";
import ReactMarkdown from "react-markdown";

const LOGO_WIDE = "https://media.base44.com/images/public/69dd69e08275bba8ff88aaa6/5556524c0_logo_safercode_wide.png";
const COVER_MAP = {
  "Engenharia de Software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  "Inteligência de Dados": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "IA & Automação": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  "Cases de Sucesso": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
};

export default function PostSingle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ id }).then((data) => {
      setPost(data[0] || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-body">
        Post não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="/"><img src={LOGO_WIDE} alt="SaferCode" className="h-14" /></a>
          <div className="flex items-center gap-6">
            <Link to="/conteudos" className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Conteúdos
            </Link>
            <a href="/agendar" className="bg-primary text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity">
              Agendar Diagnóstico
            </a>
          </div>
        </div>
      </nav>

      {/* Cover */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={post.cover_url || COVER_MAP[post.category]}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="text-sm font-body text-muted-foreground mb-10">
              {new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          )}

          {/* Article body */}
          <div className="prose prose-invert prose-sm max-w-none font-body text-muted-foreground leading-relaxed
            prose-headings:font-heading prose-headings:text-foreground
            prose-h2:text-2xl prose-h3:text-xl
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-5 prose-blockquote:text-foreground prose-blockquote:italic prose-blockquote:not-italic
            prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-primary/30 rounded-xl p-8 text-center"
        >
          <div className="w-1 h-12 bg-primary mx-auto mb-6 rounded-full" />
          <h3 className="font-heading text-2xl text-foreground mb-3">
            Precisa de uma solução como esta?
          </h3>
          <p className="font-body text-muted-foreground mb-6 max-w-md mx-auto">
            Nossa equipe de engenheiros pode levar esse tipo de solução até a sua empresa — sem custo de diagnóstico.
          </p>
          <a
            href="/agendar"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity group"
          >
            Agendar Diagnóstico Presencial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </main>

      <SharedFooter />
    </div>
  );
}