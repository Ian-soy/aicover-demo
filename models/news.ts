// import { QueryResult, QueryResultRow } from "pg";

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
