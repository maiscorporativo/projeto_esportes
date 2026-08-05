/**
 * migrate-add-esportes-portal.js
 *
 * Migração ÚNICA para adicionar o 4º portal ("esportes" / Rede Ronaldo) à
 * tabela shared_packages já existente em produção (criada originalmente
 * pelos portais gp/emais/torcida). CREATE TABLE IF NOT EXISTS em
 * shared-db.js não altera uma tabela já existente — por isso este script.
 *
 * Roda contra o banco COMPARTILHADO (SHARED_DB_*), não o banco próprio do
 * portal. Seguro rodar mais de uma vez: cada ALTER checa se a coluna já
 * existe antes de tentar criar.
 *
 * Rodar: node server/migrate-add-esportes-portal.js
 */
import { sharedPool, sharedDbEnabled } from './shared-db.js';

async function columnExists(table, column) {
  const [rows] = await sharedPool.query(
    `SELECT COUNT(*) AS c FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column]
  );
  return rows[0].c > 0;
}

async function migrate() {
  if (!sharedDbEnabled()) {
    console.error('❌ SHARED_DB_NAME não definido — configure as variáveis SHARED_DB_* antes de rodar esta migração.');
    process.exit(1);
  }

  console.log('🔧 Adicionando o portal "esportes" à tabela shared_packages...');

  const [tables] = await sharedPool.query(
    `SELECT COUNT(*) AS c FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'shared_packages'`
  );
  if (tables[0].c === 0) {
    console.error('❌ Tabela shared_packages não existe neste banco ainda. Rode primeiro algum dos outros 3 portais (eles criam a tabela automaticamente na subida do servidor).');
    process.exit(1);
  }

  const newColumns = [
    { name: 'visivel_esportes', ddl: 'ADD COLUMN visivel_esportes TINYINT(1) NOT NULL DEFAULT 1' },
    { name: 'em_alta_esportes', ddl: 'ADD COLUMN em_alta_esportes TINYINT(1) NOT NULL DEFAULT 0' },
    { name: 'ordem_esportes',   ddl: 'ADD COLUMN ordem_esportes INT NOT NULL DEFAULT 0' },
  ];

  for (const col of newColumns) {
    const exists = await columnExists('shared_packages', col.name);
    if (exists) {
      console.log(`  ⏭️  ${col.name} já existe, pulando.`);
      continue;
    }
    await sharedPool.query(`ALTER TABLE shared_packages ${col.ddl}`);
    console.log(`  ✅ ${col.name} adicionada.`);
  }

  // Amplia o ENUM de origem para aceitar 'esportes'
  const [enumRows] = await sharedPool.query(
    `SELECT COLUMN_TYPE FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'shared_packages' AND COLUMN_NAME = 'origem'`
  );
  const currentType = enumRows[0]?.COLUMN_TYPE || '';
  if (currentType.includes("'esportes'")) {
    console.log('  ⏭️  ENUM origem já inclui "esportes", pulando.');
  } else {
    await sharedPool.query(`ALTER TABLE shared_packages MODIFY origem ENUM('gp','emais','torcida','esportes') NOT NULL`);
    console.log('  ✅ ENUM origem ampliado para incluir "esportes".');
  }

  const [check] = await sharedPool.query(`DESCRIBE shared_packages`);
  console.log('\n📋 Schema atual de shared_packages:');
  for (const row of check) console.log(`   ${row.Field} — ${row.Type}`);

  console.log('\n✅ Migração concluída! O portal "esportes" já pode ler/gravar na tabela compartilhada.');
  process.exit(0);
}

migrate().catch(e => { console.error('❌ Erro na migração:', e.message); process.exit(1); });
