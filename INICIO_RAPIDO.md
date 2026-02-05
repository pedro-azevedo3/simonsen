# 🚀 Guia de Início Rápido

## Configuração em 5 Minutos

### 1. Criar Projeto no Supabase (2 min)
1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Preencha:
   - Nome: `colegio-simonsen-blog`
   - Senha do banco: escolha uma senha forte
   - Região: `South America (São Paulo)`
4. Clique em "Create" e aguarde

### 2. Obter Credenciais (30 seg)
1. No projeto criado, vá em **Settings** → **API**
2. Copie:
   - **Project URL**
   - **anon public key**

### 3. Configurar Variáveis de Ambiente (30 seg)
1. Na pasta do projeto, copie o arquivo de exemplo:
   ```bash
   copy .env.local.example .env.local
   ```
2. Abra `.env.local` e cole suas credenciais:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
   ```

### 4. Executar Migrations (1 min)
1. No Supabase, vá em **SQL Editor**
2. Clique em **New query**
3. Copie o conteúdo de cada arquivo abaixo e execute (Run):
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_buckets.sql`
   - `supabase/seed.sql`

### 5. Criar Usuário Admin (1 min)
1. No Supabase, vá em **Authentication** → **Users**
2. Clique em "Add user" → "Create new user"
3. Preencha seu email e senha
4. Marque "Auto Confirm User"
5. Clique em "Create"
6. **COPIE o User UID** que aparece na lista

### 6. Adicionar Perfil Admin (30 seg)
1. Volte ao **SQL Editor**
2. Execute este comando (substitua os valores):
   ```sql
   INSERT INTO profiles (id, email, full_name, role)
   VALUES (
     'COLE_O_USER_UID_AQUI',
     'seu@email.com',
     'Seu Nome',
     'admin'
   );
   ```

### 7. Testar o Projeto
```bash
npm run dev
```

Acesse:
- **Site público**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Admin**: http://localhost:3000/admin (após login)

## ✅ Checklist Rápido

- [ ] Projeto Supabase criado
- [ ] Credenciais copiadas
- [ ] `.env.local` configurado
- [ ] 4 migrations executadas
- [ ] Usuário admin criado
- [ ] Perfil admin adicionado
- [ ] `npm run dev` rodando
- [ ] Login funcionando

## 🎯 Primeiro Teste

1. Acesse http://localhost:3000/login
2. Faça login com seu email e senha
3. Você será redirecionado para http://localhost:3000/admin
4. Explore o dashboard!

## 🐛 Problemas Comuns

### Erro: "Invalid JWT"
- Verifique se as credenciais no `.env.local` estão corretas
- Reinicie o servidor (`npm run dev`)

### Erro: "User not authorized"
- Verifique se você criou o perfil na tabela `profiles`
- Certifique-se de que o `role` está como 'admin'

### Página em branco após login
- Verifique se as migrations foram executadas
- Verifique o console do navegador para erros

### "Cannot read properties of null"
- Certifique-se de que o User UID na tabela profiles corresponde ao UID do usuário no Auth

## 📚 Próximos Passos

Depois de ter o projeto rodando:

1. **Familiarize-se com a estrutura**
   - Explore as pastas `app/`, `components/`, `lib/`
   - Veja como os componentes estão organizados

2. **Entenda o fluxo de autenticação**
   - Veja como `useAuth` funciona em `hooks/useAuth.ts`
   - Entenda o middleware em `middleware.ts`

3. **Comece a implementar funcionalidades**
   - Leia o arquivo `PROGRESSO.md` para ver o que falta
   - Recomendo começar pelo editor de posts

4. **Consulte a documentação**
   - `README.md` - Visão geral do projeto
   - `SUPABASE_SETUP.md` - Guia detalhado do Supabase
   - `PROGRESSO.md` - Status e próximos passos

## 💡 Dicas Úteis

- Use `Ctrl + C` no terminal para parar o servidor
- Sempre reinicie o servidor após mudar `.env.local`
- Use o SQL Editor do Supabase para consultas no banco
- Ative o modo desenvolvedor no navegador (F12) para ver erros

## 🎨 Personalização Rápida

### Mudar Cores
Edite `tailwind.config.ts`:
```typescript
primary: {
  500: '#22c55e', // Verde principal
  // ... outros tons
}
```

### Mudar Nome do Colégio
Edite `.env.local`:
```
NEXT_PUBLIC_SITE_NAME=Nome do Seu Colégio
```

### Adicionar Logo
Adicione sua logo em `public/images/logo.png` e atualize:
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `app/page.tsx`

## 🚢 Deploy (Quando estiver pronto)

1. Faça push do código para GitHub
2. Conecte o repositório na [Vercel](https://vercel.com)
3. Configure as mesmas variáveis de ambiente
4. Deploy automático!

## 📞 Ajuda

Se algo não funcionar:
1. Verifique os logs no terminal
2. Verifique o console do navegador (F12)
3. Releia este guia com atenção
4. Consulte `SUPABASE_SETUP.md` para mais detalhes
