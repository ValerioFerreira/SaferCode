import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCMSAuth } from '@/lib/CMSAuthContext';
import { Pencil, Trash2 } from 'lucide-react';

const BADGES = [
  "IA & Automação", "Big Data", "Inteligência de Dados", "Engenharia de Software", 
  "Cloud Computing", "Cybersecurity", "Desenvolvimento Web", "UX/UI Design", 
  "Mobile Apps", "DevOps", "Blockchain", "Machine Learning", 
  "Transformação Digital", "Consultoria Tech", "APIs & Integrações"
];

export default function CMSConteudos() {
  const { token } = useCMSAuth();
  const [conteudos, setConteudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const fetchConteudos = async () => {
    try {
      const res = await fetch('/api/conteudos');
      const data = await res.json();
      setConteudos(Array.isArray(data) ? data : []);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConteudos();
  }, []);

  const openForm = (cont = null) => {
    if (cont) {
      setEditingId(cont.id);
      reset(cont);
    } else {
      setEditingId('new');
      reset({});
    }
  };

  const closeForm = () => {
    setEditingId(null);
    reset({});
  };

  const onSubmit = async (data) => {
    const method = editingId === 'new' ? 'POST' : 'PUT';
    if (method === 'PUT') data.id = editingId;

    try {
      const res = await fetch('/api/conteudos', {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        closeForm();
        fetchConteudos();
      } else {
        alert("Erro ao salvar conteúdo");
      }
    } catch(err) {
      alert("Erro na requisição");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta postagem?")) return;
    try {
      const res = await fetch(`/api/conteudos?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchConteudos();
      else alert("Erro ao excluir");
    } catch(e) {
      alert("Erro na requisição");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-heading text-foreground">Conteúdos</h2>
        <button onClick={() => editingId ? closeForm() : openForm()} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          {editingId ? 'Cancelar' : '+ Novo Conteúdo'}
        </button>
      </div>

      {editingId && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Título</label>
              <input {...register('title', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Imagem URL</label>
              <input {...register('cover_url', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground" placeholder="https://" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Tipo</label>
              <select {...register('type', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground">
                <option value="Notícias">Notícias</option>
                <option value="Conhecimento">Conhecimento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Categoria (Badge)</label>
              <select {...register('category', { required: true })} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground">
                {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Conteúdo (Markdown ou Texto Livre)</label>
            <textarea {...register('content', { required: true })} rows={6} className="w-full bg-background border border-border rounded px-3 py-2 text-foreground resize-y font-mono"></textarea>
          </div>
          <button type="submit" className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg">
            {editingId === 'new' ? 'Salvar Conteúdo' : 'Atualizar Conteúdo'}
          </button>
        </form>
      )}

      {loading ? <p className="text-muted-foreground">Carregando...</p> : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Título</th>
                <th className="px-6 py-3 font-medium">Tipo</th>
                <th className="px-6 py-3 font-medium">Categoria</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {conteudos.map(c => (
                <tr key={c.id} className="text-foreground hover:bg-secondary/20">
                  <td className="px-6 py-4 font-semibold">{c.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.type}</td>
                  <td className="px-6 py-4 text-primary font-medium">{c.category}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3 text-muted-foreground">
                    <button onClick={() => openForm(c)} className="hover:text-primary transition-colors p-1" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="hover:text-destructive transition-colors p-1" title="Excluir">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {conteudos.length === 0 && <p className="p-6 text-center text-muted-foreground">Nenhum conteúdo encontrado.</p>}
        </div>
      )}
    </div>
  );
}
