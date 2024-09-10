import { Pool } from "pg";

let globalPool: Pool;

export function getDb() {
  if (!globalPool) {
    const connectionString = process.env.POSTGRES_URL;

    // 通过url连接supabase云数据库
    globalPool = new Pool({
      connectionString,
    });

    // 通过账号密码的方式连接pg数据库
    // globalPool = new Pool({
    //   user: 'ian-so',
    //   host: 'localhost',
    //   database: 'postgres',
    //   password: '123456',
    //   port: 9527,
    // });
  }

  return globalPool;
}
