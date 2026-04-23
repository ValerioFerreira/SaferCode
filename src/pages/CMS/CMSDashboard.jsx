import React from 'react';

export default function CMSDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-heading text-foreground mb-4">Bem-vindo ao CMS da SaferCode</h2>
      <p className="text-muted-foreground font-body leading-relaxed mb-8">
        Aqui você gerencia os portfólios de clientes em Projetos e os informativos técnicos do Blog em Conteúdos. 
        Tudo está diretamente sincronizado com seu banco de dados Postgres Neon de alta disponibilidade.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl">
          <h3 className="text-lg font-heading text-foreground mb-2">Dica Operacional</h3>
          <p className="text-sm text-muted-foreground">Utilize imagens em alta resolução provindas de serviços Cloud Front ou Unsplash para manter a fidelidade visual da landing page.</p>
        </div>
      </div>
    </div>
  );
}
