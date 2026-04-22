export const mockPosts = [
  {
    id: "post_1",
    title: "O Padrão Ouro em Arquitetura Limpa para Aplicações Corporativas",
    category: "Engenharia de Software",
    content: "## A Evolução da Arquitetura\n\nA migração de sistemas monolíticos para microserviços não é apenas uma tendência de mercado. Ela representa uma transformação na gestão do ciclo de software. Na Safer Code, implementamos Clean Architecture assegurando escalabilidade desde o dia zero...\n\n### Benefícios Diretos\n- **Independência de Frameworks**: Seu core de negócios protegido.\n- **Testabilidade**: Cada camada testada de forma isolada.\n- **Independência UI/Database**: Flexibilidade de troca futura.",
    published_at: new Date().toISOString(),
    cover_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
  },
  {
    id: "post_2",
    title: "Big Data na Prática: Tomando Decisões que Guiam Startups",
    category: "Inteligência de Dados",
    content: "A captura e análise inteligente de dados virou a espinha dorsal de operações complexas. Implementamos pipelines robustos e dashboards preditivos que ajudam gestores a entenderem para onde o mercado está se movendo, baseados em métricas acionáveis que nossa engenharia de dados processou.",
    published_at: new Date(Date.now() - 86400000).toISOString(),
    cover_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    id: "post_3",
    title: "Integrando Agentes Autônomos em Processos Industriais",
    category: "IA & Automação",
    content: "A inteligência artificial avançou para a tomada de decisões autônoma. No nosso case mais recente, implantamos agentes capazes de otimizar a logística just-in-time, reagindo em tempo real a oscilações térmicas de sensores IoT conectados às estufas industriais.",
    published_at: new Date(Date.now() - 172800000).toISOString(),
    cover_url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  }
];

export const mockApi = {
  entities: {
    BlogPost: {
      list: async (sortBy, limit) => {
        return Promise.resolve(mockPosts.slice(0, limit || undefined));
      },
      filter: async ({ id }) => {
        return Promise.resolve(mockPosts.filter(post => post.id === id));
      }
    },
    DiagnosticoLead: {
      create: async (payload) => {
        console.log("Mocking DiagnosticoLead.create payload:", payload);
        return Promise.resolve({ id: "lead_" + Date.now(), ...payload });
      }
    }
  },
  integrations: {
    Core: {
      SendEmail: async (payload) => {
        console.log("Mocking Core.SendEmail payload:", payload);
        return Promise.resolve({ status: "success" });
      }
    }
  },
  auth: {
    me: async () => null,
    logout: () => {},
    redirectToLogin: () => {}
  }
};
