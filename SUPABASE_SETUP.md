# Configuração do Supabase

Este guia explica como configurar o Supabase para o projeto do Blog do Colégio Roberto Simonsen.

## Passo 1: Criar Conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou email

## Passo 2: Criar Novo Projeto

1. No dashboard, clique em "New Project"
2. Preencha as informações:
   - **Name**: `colegio-simonsen-blog`
   - **Database Password**: Crie uma senha forte (guarde-a em local seguro)
   - **Region**: Escolha `South America (São Paulo)` para melhor performance no Brasil
   - **Pricing Plan**: Free (suficiente para o projeto)
3. Clique em "Create new project"
4. Aguarde 2-3 minutos enquanto o projeto é criado

## Passo 3: Obter Credenciais

Após o projeto ser criado:

1. No menu lateral, clique em "Project Settings" (ícone de engrenagem)
2. Clique em "API" no submenu
3. Você verá duas informações importantes:
   - **Project URL**: Algo como `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: Uma chave longa começando com `eyJ...`
4. **Copie essas informações** - você precisará delas no próximo passo

## Passo 4: Configurar Variáveis de Ambiente

1. Na pasta do projeto, copie o arquivo de exemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Abra o arquivo `.env.local` e preencha com suas credenciais:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...sua_chave_aqui
   ```

3. **IMPORTANTE**: Nunca compartilhe ou comite o arquivo `.env.local` no Git!

## Passo 5: Executar Migrations

Agora vamos criar as tabelas no banco de dados:

1. No Supabase Dashboard, vá em "SQL Editor" no menu lateral
2. Clique em "New query"
3. Copie o conteúdo do arquivo `supabase/migrations/001_initial_schema.sql`
4. Cole no editor e clique em "Run" (ou pressione Ctrl+Enter)
5. Repita o processo para os arquivos:
   - `002_rls_policies.sql`
   - `003_storage_buckets.sql`
   - `seed.sql` (dados iniciais)

## Passo 6: Configurar Autenticação

1. No menu lateral, clique em "Authentication"
2. Clique em "Providers"
3. Configure o provider de Email:
   - **Email Auth**: Habilite
   - **Confirm email**: Desabilite (para facilitar testes iniciais)
   - **Secure email change**: Habilitado
   - **Secure password change**: Habilitado

## Passo 7: Criar Primeiro Usuário Admin

1. No menu lateral, vá em "Authentication" → "Users"
2. Clique em "Add user" → "Create new user"
3. Preencha:
   - **Email**: Seu email (ex: admin@simonsen.edu.br)
   - **Password**: Crie uma senha forte
   - **Auto Confirm User**: Marque esta opção
4. Clique em "Create user"
5. Copie o **User UID** (você verá na lista de usuários)

## Passo 8: Adicionar Perfil do Admin

1. Volte ao "SQL Editor"
2. Execute este comando (substitua `USER_UID_AQUI` pelo UID copiado e o email):

```sql
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'USER_UID_AQUI',
  'admin@simonsen.edu.br',
  'Administrador',
  'admin'
);
```

## Passo 9: Verificar Storage Buckets

1. No menu lateral, clique em "Storage"
2. Você deve ver 3 buckets criados:
   - `posts-images` - Para imagens de posts
   - `gallery-images` - Para fotos da galeria
   - `avatars` - Para fotos de perfil

Se não aparecerem, execute novamente o arquivo `003_storage_buckets.sql`.

## Passo 10: Testar a Conexão

Agora você pode rodar o projeto localmente:

```bash
npm run dev
```

Acesse `http://localhost:3000` e tente fazer login com o usuário admin criado.

## Solução de Problemas

### Erro de conexão
- Verifique se as variáveis de ambiente no `.env.local` estão corretas
- Certifique-se de que o projeto Supabase está ativo (não suspenso)

### Não consigo fazer login
- Verifique se o usuário foi criado no Supabase Auth
- Verifique se o perfil foi adicionado à tabela `profiles`
- Certifique-se de que o campo `role` está como 'admin'

### Erro ao fazer upload de imagens
- Verifique se os storage buckets foram criados
- Verifique se as policies de storage foram aplicadas

## Próximos Passos

Após configurar o Supabase:

1. Teste o login no sistema
2. Crie um post de teste
3. Faça upload de uma imagem
4. Crie um evento
5. Adicione fotos à galeria

## Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
