-- Seed data for testing

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Notícias Gerais', 'noticias-gerais', 'Notícias e informações gerais do colégio'),
  ('Eventos', 'eventos', 'Eventos escolares e celebrações'),
  ('Atividades Pedagógicas', 'atividades-pedagogicas', 'Atividades educacionais e projetos'),
  ('Esportes', 'esportes', 'Competições esportivas e atividades físicas'),
  ('Cultural', 'cultural', 'Atividades culturais e artísticas'),
  ('Avisos', 'avisos', 'Avisos importantes aos alunos e pais');

-- Insert sample tags
INSERT INTO tags (name, slug) VALUES
  ('Importante', 'importante'),
  ('Urgente', 'urgente'),
  ('Festa Junina', 'festa-junina'),
  ('Formatura', 'formatura'),
  ('Olimpíadas', 'olimpiadas'),
  ('Teatro', 'teatro'),
  ('Música', 'musica'),
  ('Ciências', 'ciencias'),
  ('Matemática', 'matematica'),
  ('Português', 'portugues');

-- Note: Admin user should be created manually via Supabase Dashboard
-- or through the application's user management interface after deployment
