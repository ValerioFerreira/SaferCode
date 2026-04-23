import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Send } from "lucide-react";
import { mockApi as base44 } from "@/api/mockApi";
import Navbar from "@/components/landing/Navbar";
import SharedFooter from "@/components/landing/SharedFooter";
import ReactMarkdown from "react-markdown";

const COVER_MAP = {
  "Engenharia de Software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  "Inteligência de Dados": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "IA & Automação": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  "Cases de Sucesso": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
};

function LikeButton({ postId }) {
  const storageKey = `liked_${postId}`;
  const [liked, setLiked] = useState(() => localStorage.getItem(storageKey) === "1");
  const [count, setCount] = useState(() => parseInt(localStorage.getItem(`likes_${postId}`) || "0"));

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    const nextCount = next ? count + 1 : Math.max(0, count - 1);
    setCount(nextCount);
    localStorage.setItem(storageKey, next ? "1" : "0");
    localStorage.setItem(`likes_${postId}`, String(nextCount));
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-body text-sm font-medium ${
        liked
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} />
      {count > 0 ? count : ""} {liked ? "Curtido" : "Curtir"}
    </button>
  );
}

function CommentsSection({ postId }) {
  const storageKey = `comments_${postId}`;
  const [comments, setComments] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
  });
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newComment = { name: name.trim(), text: text.trim(), date: new Date().toLocaleDateString("pt-BR") };
    const next = [newComment, ...comments];
    setComments(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setName("");
    setText("");
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-xl text-foreground">Comentários ({comments.length})</h3>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Deixe seu comentário ou dúvida..."
          rows={3}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4" /> Enviar comentário
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm font-body text-muted-foreground text-center py-6">Seja o primeiro a comentar.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body font-semibold text-sm text-foreground">{c.name}</span>
                <span className="font-body text-xs text-muted-foreground">{c.date}</span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

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
      <Navbar />

      {/* Cover */}
      <div className="relative h-64 md:h-96 overflow-hidden mt-20 lg:mt-24">
        <img
          src={post.cover_url || COVER_MAP[post.category]}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <Link to="/conteudos" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar para Conteúdos
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
            {post.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="text-sm font-body text-muted-foreground mb-4">
              {new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          )}

          {/* Like button */}
          <div className="mb-10">
            <LikeButton postId={id} />
          </div>

          {/* Article body */}
          <div className="prose prose-invert prose-sm max-w-none font-body text-muted-foreground leading-relaxed
            prose-headings:font-heading prose-headings:text-foreground
            prose-h2:text-2xl prose-h3:text-xl
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-5 prose-blockquote:text-foreground
            prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Like again at bottom */}
          <div className="mt-10 pt-8 border-t border-border">
            <LikeButton postId={id} />
          </div>

          {/* Comments */}
          <CommentsSection postId={id} />
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