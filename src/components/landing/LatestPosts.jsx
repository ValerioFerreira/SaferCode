import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockApi as base44 } from "@/api/mockApi";

const COVER_MAP = {
  "Engenharia de Software": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70",
  "Inteligência de Dados": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70",
  "IA & Automação": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=70",
  "Cases de Sucesso": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=70",
};

export default function LatestPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    base44.entities.BlogPost.list("-published_at", 3).then(setPosts);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-4 block">
              Blog de Engenharia
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
              Últimas Notícias
            </h2>
          </div>
          <Link
            to="/conteudos"
            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:gap-3 transition-all duration-200 group"
          >
            Ver todos os conteúdos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/conteudos/${post.id}`}
                className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.cover_url || COVER_MAP[post.category]}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-heading text-base text-foreground mb-2 leading-snug group-hover:text-primary transition-colors flex-1">
                    {post.title}
                  </h3>
                  <span className="text-xs font-body text-muted-foreground/60">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}