import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Heart, MessageCircle, Send,
  Share2, Copy, Check, CornerDownRight
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/landing/Navbar";
import SharedFooter from "@/components/landing/SharedFooter";
import { getFingerprint } from "@/lib/fingerprint";
import { sharePost, buildIntents, copyToClipboard } from "@/lib/shareUtils";

const COVER_MAP = {
  "Engenharia de Software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  "Inteligência de Dados": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "IA & Automação": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  "Cases de Sucesso": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
};

// ─── Like Button ─────────────────────────────────────────────────────────────
function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Stats are loaded by parent; we receive them via props via context pattern
  // but we handle our own API call for simplicity
  useEffect(() => {
    const fp = getFingerprint();
    fetch(`/api/interact/get-stats?post_id=${postId}&fingerprint=${fp}`)
      .then(r => r.json())
      .then(d => {
        setCount(d.total_likes ?? 0);
        setLiked(d.user_liked ?? false);
      })
      .catch(() => {});
  }, [postId]);

  const toggle = async () => {
    if (loading) return;
    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setCount(c => wasLiked ? Math.max(0, c - 1) : c + 1);
    setLoading(true);
    try {
      const fp = getFingerprint();
      const res = await fetch('/api/interact/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, fingerprint: fp })
      });
      const data = await res.json();
      setLiked(data.liked);
      setCount(data.total_likes);
    } catch {
      // Revert on error
      setLiked(wasLiked);
      setCount(c => wasLiked ? c + 1 : Math.max(0, c - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-body text-sm font-medium ${
        liked
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      <Heart className={`w-4 h-4 transition-transform ${liked ? "fill-primary scale-110" : ""}`} />
      {count > 0 && <span>{count}</span>} {liked ? "Curtido" : "Curtir"}
    </button>
  );
}

// ─── Share Bar ────────────────────────────────────────────────────────────────
function ShareBar({ title }) {
  const [showIntents, setShowIntents] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const handleShare = async () => {
    const result = await sharePost(url, title);
    if (result.method === 'intents') setShowIntents(v => !v);
  };

  const handleCopy = async () => {
    await copyToClipboard(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const intents = buildIntents(url, title);

  const SOCIALS = [
    { key: 'whatsapp', label: 'WhatsApp', color: '#25D366', icon: 'W' },
    { key: 'telegram', label: 'Telegram', color: '#2AABEE', icon: 'T' },
    { key: 'twitter', label: 'X', color: '#000', icon: 'X' },
    { key: 'facebook', label: 'Facebook', color: '#1877F2', icon: 'F' },
    { key: 'linkedin', label: 'LinkedIn', color: '#0A66C2', icon: 'in' },
  ];

  return (
    <div className="mt-6 mb-2">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all text-sm font-body font-medium"
        >
          <Share2 className="w-4 h-4" /> Compartilhar
        </button>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-body font-medium ${
            copied
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Link copiado!" : "Copiar link"}
        </button>
      </div>

      <AnimatePresence>
        {showIntents && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap gap-2 mt-3"
          >
            {SOCIALS.map(s => (
              <a
                key={s.key}
                href={intents[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full text-white text-xs font-body font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: s.color }}
              >
                {s.label}
              </a>
            ))}
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 rounded-full text-white text-xs font-body font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 transition-opacity"
            >
              📸 Instagram / Copiar link
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Comment Like Button ──────────────────────────────────────────────────────
function CommentLike({ comentarioId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (loading) return;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setCount(c => wasLiked ? Math.max(0, c - 1) : c + 1);
    setLoading(true);
    try {
      const fp = getFingerprint();
      const res = await fetch('/api/interact/comment-like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comentario_id: comentarioId, fingerprint: fp })
      });
      const data = await res.json();
      setLiked(data.liked);
      setCount(data.total);
    } catch {
      setLiked(wasLiked);
      setCount(c => wasLiked ? c + 1 : Math.max(0, c - 1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1 text-xs transition-colors ${
        liked ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground"
      }`}
    >
      <Heart className={`w-3 h-3 ${liked ? "fill-primary" : ""}`} />
      {count > 0 && count}
    </button>
  );
}

// ─── Single Comment (recursive for nesting) ───────────────────────────────────
function Comment({ comment, postId, onReplyAdded, depth = 0 }) {
  const [replying, setReplying] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReply = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/interact/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, parent_id: comment.id, autor_nome: name, texto: text })
      });
      const newReply = await res.json();
      onReplyAdded(comment.id, newReply);
      setName(""); setText(""); setReplying(false);
    } catch {
      alert("Erro ao enviar resposta");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}`}>
      <div className="bg-card border border-border rounded-xl p-4 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {depth > 0 && <CornerDownRight className="w-3 h-3 text-primary/60" />}
            <span className="font-body font-semibold text-sm text-foreground">{comment.autor_nome}</span>
          </div>
          <span className="font-body text-xs text-muted-foreground">
            {new Date(comment.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{comment.texto}</p>
        <div className="flex items-center gap-4">
          <CommentLike
            comentarioId={comment.id}
            initialLiked={comment.user_liked}
            initialCount={comment.likes_count}
          />
          {depth < 2 && (
            <button
              onClick={() => setReplying(v => !v)}
              className="text-xs text-muted-foreground/60 hover:text-primary transition-colors font-body"
            >
              Responder
            </button>
          )}
        </div>
      </div>

      {replying && (
        <form onSubmit={submitReply} className="ml-6 mb-3 space-y-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
          />
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Sua resposta..."
            rows={2}
            className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <Send className="w-3 h-3" /> Enviar
            </button>
            <button
              type="button"
              onClick={() => setReplying(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {comment.replies?.map(reply => (
        <Comment
          key={reply.id}
          comment={reply}
          postId={postId}
          onReplyAdded={onReplyAdded}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

// ─── Comments Section ─────────────────────────────────────────────────────────
function CommentsSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const totalCount = useCallback(() => {
    const count = (list) => list.reduce((acc, c) => acc + 1 + count(c.replies || []), 0);
    return count(comments);
  }, [comments]);

  const handleAddReply = (parentId, newReply) => {
    setComments(prev => {
      const addReply = (list) => list.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...(c.replies || []), { ...newReply, replies: [], likes_count: 0, user_liked: false }] };
        }
        if (c.replies?.length) return { ...c, replies: addReply(c.replies) };
        return c;
      });
      return addReply(prev);
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/interact/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, autor_nome: name, texto: text })
      });
      const newComment = await res.json();
      setComments(prev => [...prev, { ...newComment, replies: [], likes_count: 0, user_liked: false }]);
      setName(""); setText("");
    } catch {
      alert("Erro ao enviar comentário");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-xl text-foreground">Comentários ({totalCount()})</h3>
      </div>

      {/* New comment form */}
      <form onSubmit={submit} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Deixe seu comentário ou dúvida..."
          rows={3}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4" /> {submitting ? "Enviando..." : "Enviar comentário"}
        </button>
      </form>

      {/* Comment tree */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm font-body text-muted-foreground text-center py-6">Seja o primeiro a comentar.</p>
        ) : (
          comments.map(c => (
            <Comment
              key={c.id}
              comment={c}
              postId={postId}
              onReplyAdded={handleAddReply}
              depth={0}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── PostSingle Main ──────────────────────────────────────────────────────────
export default function PostSingle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/conteudos?id=${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setPost(data || null); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fp = getFingerprint();
    fetch(`/api/interact/get-stats?post_id=${id}&fingerprint=${fp}`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data.comments)) setComments(data.comments); })
      .catch(() => {});
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

          {/* Like + Share row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <LikeButton postId={id} />
          </div>
          <ShareBar title={post.title} />

          {/* Article body */}
          <div className="mt-10 prose prose-invert prose-sm max-w-none font-body text-muted-foreground leading-relaxed
            prose-headings:font-heading prose-headings:text-foreground
            prose-h2:text-2xl prose-h3:text-xl
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-5 prose-blockquote:text-foreground
            prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Like again at bottom */}
          <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center gap-3">
            <LikeButton postId={id} />
            <ShareBar title={post.title} />
          </div>

          {/* Comments */}
          <CommentsSection postId={id} initialComments={comments} />
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-primary/30 rounded-xl p-8 text-center"
        >
          <div className="w-1 h-12 bg-primary mx-auto mb-6 rounded-full" />
          <h3 className="font-heading text-2xl text-foreground mb-3">Precisa de uma solução como esta?</h3>
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