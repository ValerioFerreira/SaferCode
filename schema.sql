-- Schema para CMS SaferCode (PostgreSQL via Neon)

CREATE TABLE IF NOT EXISTS projetos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cover VARCHAR(2048) NOT NULL,
  sector VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  title VARCHAR(512),
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  accent_color VARCHAR(10) DEFAULT '#4A90D9',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conteudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(100) NOT NULL, -- 'Notícias' ou 'Conhecimento'
  category VARCHAR(255) NOT NULL, -- As 15 badges
  title VARCHAR(512) NOT NULL,
  content TEXT NOT NULL,
  cover_url VARCHAR(2048) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- Tabelas de Interação Social
-- ===============================

CREATE TABLE IF NOT EXISTS likes_publicacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES conteudos(id) ON DELETE CASCADE,
  ip_fingerprint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, ip_fingerprint)
);

CREATE TABLE IF NOT EXISTS comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES conteudos(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comentarios(id) ON DELETE CASCADE,
  autor_nome VARCHAR(255) NOT NULL,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes_comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comentario_id UUID NOT NULL REFERENCES comentarios(id) ON DELETE CASCADE,
  ip_fingerprint TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(comentario_id, ip_fingerprint)
);
