# Blog Colégio Roberto Simonsen

Site oficial do Colégio Roberto Simonsen com sistema de notícias, galeria de fotos e calendário de eventos.

## Tecnologias

- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Supabase** - Backend as a Service (banco de dados, autenticação, storage)
- **TipTap** - Editor de texto rico
- **React Big Calendar** - Calendário de eventos

## Começando

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd simonsen
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase.

4. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

```
simonsen/
├── app/              # Páginas e rotas (Next.js App Router)
├── components/       # Componentes React reutilizáveis
├── lib/             # Funções utilitárias e configurações
├── types/           # Definições de tipos TypeScript
├── public/          # Arquivos estáticos
└── supabase/        # Migrations e configurações do banco
```

## Funcionalidades

- Sistema de autenticação para professores
- Criação e gerenciamento de notícias
- Galeria de fotos organizadas por álbuns
- Calendário de eventos escolares
- Busca de notícias
- Design responsivo (mobile-first)
- SEO otimizado

## Deploy

O site está configurado para deploy automático na Vercel:

1. Faça push do código para o GitHub
2. Conecte o repositório à Vercel
3. Configure as variáveis de ambiente
4. Deploy automático a cada push na branch main

## Licença

Este projeto foi desenvolvido para o Colégio Roberto Simonsen.
