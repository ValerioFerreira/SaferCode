import React, { useEffect, useState, useCallback, useRef } from "react";
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

// ─── Like Button ──────────────────────────────────────────────────────────────
// Receives initial state from parent (single get-stats fetch) to avoid duplicate calls
function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked ?? false);
  const [count, setCount] = useState(initialCount ?? 0);
  const [loading, setLoading] = useState(false);

  // Keep in sync if parent fetches update
  useEffect(() => { setLiked(initialLiked ?? false); }, [initialLiked]);
  useEffect(() => { setCount(initialCount ?? 0); }, [initialCount]);

  const toggle = async () => {
    if (loading) return;
    const wasLiked = liked;
    // Optimistic update
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
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-body text-sm font-medium whitespace-nowrap ${
        liked
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      <Heart className={`w-4 h-4 flex-shrink-0 transition-transform ${liked ? "fill-primary scale-110" : ""}`} />
      {count > 0 && <span>{count}</span>}
      <span>{liked ? "Curtido" : "Curtir"}</span>
    </button>
  );
}

// ─── Share Bar ────────────────────────────────────────────────────────────────
function ShareBar({ title }) {
  const [showIntents, setShowIntents] = useState(false);
  const [copied, setCopied] = useState(false);
  // Capture URL once on mount (avoid null/incomplete URL)
  const urlRef = useRef(null);
  if (urlRef.current === null) urlRef.current = window.location.href;
  const url = urlRef.current;

  // Close intent dropdown when clicking outside
  const containerRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowIntents(false);
      }
    };
    if (showIntents) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showIntents]);

  const handleShare = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const result = await sharePost(url, title);
    if (result.method === 'intents') {
      setShowIntents(v => !v);
    }
    // 'native' and 'cancelled' → do nothing extra
  };

  const handleCopy = async (e) => {
    e?.stopPropagation();
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const intents = buildIntents(url, title);

  const SOCIALS = [
    { key: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
    { key: 'telegram', label: 'Telegram', color: '#2AABEE' },
    { key: 'twitter', label: 'X / Twitter', color: '#000' },
    { key: 'facebook', label: 'Facebook', color: '#1877F2' },
    { key: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Button row */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-body text-sm font-medium whitespace-nowrap ${
            showIntents
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          <Share2 className="w-4 h-4 flex-shrink-0" />
          <span>Compartilhar</span>
        </button>

        {/* Copy link */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 font-body text-sm font-medium whitespace-nowrap ${
            copied
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {copied
            ? <Check className="w-4 h-4 flex-shrink-0" />
            : <Copy className="w-4 h-4 flex-shrink-0" />
          }
          <span>{copied ? "Copiado!" : "Copiar link"}</span>
        </button>
      </div>

      {/* Intent dropdown */}
      <AnimatePresence>
        {showIntents && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {SOCIALS.map(s => (
              <a
                key={s.key}
                href={intents[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowIntents(false)}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-white text-xs font-body font-semibold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: s.color }}
              >
                {s.label}
              </a>
            ))}
            <button
              type="button"
              onClick={(e) => { handleCopy(e); setShowIntents(false); }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-white text-xs font-body font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-80 transition-opacity"
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
  const [liked, setLiked] = useState(initialLiked ?? false);
  const [count, setCount] = useState(initialCount ?? 0);
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
      className={`inline-flex items-center gap-1 text-xs transition-colors ${
        liked ? "text-primary" : "text-muted-foreground/60 hover:text-muted-foreground"
      }`}
    >
      <Heart className={`w-3 h-3 flex-shrink-0 ${liked ? "fill-primary" : ""}`} />
      {count > 0 && <span>{count}</span>}
    </button>
  );
}

// ─── Single Comment (recursive) ───────────────────────────────────────────────
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
      onReplyAdded(comment.id, { ...newReply, replies: [], likes_count: 0, user_liked: false });
      setName(""); setText(""); setReplying(false);
    } catch {
      alert("Erro ao enviar resposta");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4 mt-2" : "mt-2"}>
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {depth > 0 && <CornerDownRight className="w-3 h-3 text-primary/60 flex-shrink-0" />}
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
              {replying ? "Cancelar" : "Responder"}
            </button>
          )}
        </div>
      </div>

      {replying && (
        <form onSubmit={submitReply} className="ml-4 mt-2 mb-3 space-y-2">
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
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-3 h-3" /> {submitting ? "Enviando..." : "Enviar"}
          </button>
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

  // Sync when parent delivers data from API
  useEffect(() => { setComments(initialComments || []); }, [initialComments]);

  const totalCount = useCallback(() => {
    const count = (list) => list.reduce((acc, c) => acc + 1 + count(c.replies || []), 0);
    return count(comments);
  }, [comments]);

  const handleAddReply = (parentId, newReply) => {
    setComments(prev => {
      const addReply = (list) => list.map(c => {
        if (c.id === parentId) return { ...c, replies: [...(c.replies || []), newReply] };
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
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-xl text-foreground">Comentários ({totalCount()})</h3>
      </div>

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

      <div className="space-y-1">
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

  // Single unified state from get-stats – source of truth for likes AND comments
  const [stats, setStats] = useState({ total_likes: 0, user_liked: false, comments: [] });

  useEffect(() => {
    if (!id) return;
    // Fetch post content
    fetch(`/api/conteudos?id=${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setPost(data || null); setLoading(false); })
      .catch(() => setLoading(false));

    // Fetch interaction stats (likes + comments) – single call, single source of truth
    const fp = getFingerprint();
    fetch(`/api/interact/get-stats?post_id=${id}&fingerprint=${fp}`)
      .then(r => r.json())
      .then(data => {
        setStats({
          total_likes: data.total_likes ?? 0,
          user_liked: data.user_liked ?? false,
          comments: Array.isArray(data.comments) ? data.comments : [],
        });
      })
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

  // ─── Action Bar (shared between top and bottom) ───
  const ActionBar = () => (
    <div className="flex items-center gap-4 py-4 flex-wrap">
      <LikeButton postId={id} initialLiked={stats.user_liked} initialCount={stats.total_likes} />
      <ShareBar title={post.title} />
    </div>
  );

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
            <p className="text-sm font-body text-muted-foreground mb-2">
              {new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          )}

          {/* TOP Action Bar */}
          <ActionBar />

          {/* Article body */}
          <div className="mt-4 prose prose-invert prose-sm max-w-none font-body text-muted-foreground leading-relaxed
            prose-headings:font-heading prose-headings:text-foreground
            prose-h2:text-2xl prose-h3:text-xl
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-5 prose-blockquote:text-foreground
            prose-a:text-primary prose-strong:text-foreground">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* BOTTOM Action Bar */}
          <div className="mt-10 pt-6 border-t border-border">
            <ActionBar />
          </div>

          {/* Comments (fed from the single get-stats call) */}
          <CommentsSection postId={id} initialComments={stats.comments} />
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