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
