import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Node 18+ resolve "localhost" preferindo IPv6 (::1) por padrão. Em hospedagens
// compartilhadas (ex: Hostinger), o usuário do MySQL costuma estar liberado só
// para '127.0.0.1', então a conexão via ::1 cai em "Access denied" mesmo com
// credenciais corretas. Normaliza aqui para não depender de qual valor exato
// foi configurado em DB_HOST no painel de variáveis de ambiente.
const rawHost = process.env.DB_HOST || 'localhost';
const dbHost = rawHost === 'localhost' ? '127.0.0.1' : rawHost;

const pool = mysql.createPool({
  host:     dbHost,
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'emais_cms',
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 60000,
});

export { dbHost };
export default pool;
