import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCMSAuth } from '@/lib/CMSAuthContext';

export default function CMSProjetos() {
  const { token } = useCMSAuth();
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const fetchProjetos = async () => {
    try {
      const res = await fetch('/api/projetos');
      const data = await res.json();
      setProjetos(Array.isArray(data) ? data : []);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjetos();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Tags -> Array
      const formatted = { ...data, tags: data.tags.split(',').map(s => s.trim()) };
      const res = await fetch('/api/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formatted)
      });
      if (res.ok) {
        setIsAdding(false);
        reset();
        fetchProjetos();
      } else {
        alert("Erro ao adicionar");
      }
    } catch(err) {
      alert("Erro na requisição");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading text-foreground">Projetos</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          {isAdding ? 'Cancelar' : '+ Novo Projeto'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Título do Projeto</label>
              <input {...register('title', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">URL da Capa</label>
              <input {...register('cover', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" placeholder="https://" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Setor</label>
              <input {...register('sector', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" placeholder="Ex: Gestão Pública" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Cliente</label>
              <input {...register('client', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" placeholder="Ex: CBMPE" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Problema (Bullet Vermelho)</label>
            <textarea {...register('problem', { required: true })} rows={2} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground"></textarea>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Solução (Bullet Amarelo)</label>
            <textarea {...register('solution', { required: true })} rows={2} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground"></textarea>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Tags (separadas por vírgula)</label>
            <input {...register('tags', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" placeholder="React, Node.js, AWS" />
          </div>
          <button type="submit" className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg">Salvar Projeto</button>
        </form>
      )}

      {loading ? <p className="text-muted-foreground">Carregando...</p> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Projeto</th>
                <th className="px-6 py-3 font-medium">Setor</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projetos.map(proj => (
                <tr key={proj.id} className="text-foreground hover:bg-secondary/20">
                  <td className="px-6 py-4 font-semibold">{proj.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{proj.sector}</td>
                  <td className="px-6 py-4 text-muted-foreground">{proj.client}</td>
                  <td className="px-6 py-4"><span className="truncate block max-w-xs">{proj.tags?.join(', ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {projetos.length === 0 && <p className="p-6 text-center text-muted-foreground">Nenhum projeto encontrado.</p>}
        </div>
      )}
    </div>
  );
}
