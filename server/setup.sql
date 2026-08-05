-- E-Mais CMS - MySQL Schema
-- Rode este arquivo dentro do banco já criado no seu provedor (ex: Hostinger
-- shared hosting, onde o usuário só tem permissão no próprio banco
-- "u<conta>_<nome>" — não é possível criar/usar um banco com outro nome).
-- Selecione o banco correto no phpMyAdmin ANTES de importar este arquivo.

CREATE TABLE IF NOT EXISTS site_content (
  id INT PRIMARY KEY DEFAULT 1,
  events JSON NOT NULL,
  packages JSON NOT NULL,
  testimonials JSON NOT NULL,
  hero_images JSON NOT NULL,
  categories JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default empty row (will be populated on first admin save)
INSERT IGNORE INTO site_content (id, events, packages, testimonials, hero_images, categories)
VALUES (1, '[]', '[]', '[]', '{}', '[]');

-- Admin users table (passwords stored as bcrypt hashes)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'master') NOT NULL DEFAULT 'admin'
);

-- Usuários iniciais: /admin -> admin/emais2025 · /admin-master -> master/zago2026
-- Troque essas senhas pelo próprio painel assim que conseguir entrar.
INSERT INTO admin_users (username, password_hash, role)
VALUES
  ('admin',  '$2b$10$/c3yn8kq5El3w1BlkYT5yuOuqyv1HRyvmW8HC3NDUIShdYDqd.rse', 'admin'),
  ('master', '$2b$10$EHqMhBVKs87EzXxuP8sn8umR1yJPkwI2iKvi8xv1DFIjxTM.F7y4S', 'master')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), role = VALUES(role);
