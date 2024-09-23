import { QueryResult, QueryResultRow } from "pg";

import { News } from "@/types/news";
import { getDb } from "./db";

// 插入一天上传记录
export async function insertNews(news: News) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO news 
        (title, content, created_at, new_uuid) 
        VALUES 
        ($1, $2, $3, $4)
    `,
    [news.title, news.content, news.created_at, news.new_uuid]
  );

  return res;
}

// 查询所有新闻by title
export async function getNewsCountByTitle(title: string) {
  const db = getDb();
  const res = await db.query(
    `SELECT count(1) as count FROM news WHERE title = $1`,
    [title]
  );

  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;

  const row = rows[0];

  return row.count;
}

// 获取所有新闻
export async function getNews(page: number, limit: number): Promise<News[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.title as title, w.content as content, w.id as id, w.new_uuid as uuid, to_char(w.created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at from news as w order by created_at ASC limit $1 offset $2`,
    [limit, offset]
  );

  if (res.rowCount === 0) {
    return [];
  }
  return res.rows;
}

// 转换时间
export function getNewsTransforDate(res: QueryResultRow): News[] {
  if (!res.rowCount || res.rowCount === 0) {
    return [];
  }

  const news: News[] = [];
  let newItem: News = {
    id: 0,
    title: '',
    content: '',
    created_at: '',
    new_uuid: '',
  };
  const { rows } = res;

  rows.forEach((row: News) => {
    newItem = { ...row };
    news.push(newItem);
  });

  return news;
}