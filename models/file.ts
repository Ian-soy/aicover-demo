import { QueryResult, QueryResultRow } from "pg";

import { Files } from "@/types/file";
import { getDb } from "./db";

// 插入一天上传记录
export async function insertFile(file: Files) {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO files 
        (img_description, img_size, img_url, created_at) 
        VALUES 
        ($1, $2, $3, $4)
    `,
    [file.img_description, file.img_size, file.img_url, file.created_at]
  );

  return res;
}

// 查询files条数
export async function getFilesCount(): Promise<number> {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM files`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export async function findCoverById(id: number): Promise<Files | undefined> {
  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from files as w left join users as u on w.user_email = u.email where w.id = $1`,
    [id]
  );
  if (res.rowCount === 0) {
    return;
  }

  const cover = formatCover(res.rows[0]);

  return cover;
}

// 查询所有files
export async function getFiles(page: number, limit: number): Promise<Files[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from files as w left join users as u on w.user_email = u.email where w.status = 1 order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getUserCovers(
  user_email: string,
  page: number,
  limit: number
): Promise<Files[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from files as w left join users as u on w.user_email = u.email where w.user_email = $1 order by w.created_at desc limit $2 offset $3`,
    [user_email, limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getRecommendedCovers(
  page: number,
  limit: number
): Promise<Files[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from files as w left join users as u on w.user_email = u.email where w.is_recommended = true and w.status = 1 order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getAwesomeCovers(
  page: number,
  limit: number
): Promise<Files[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from files as w left join users as u on w.user_email = u.email where w.is_awesome = true and w.status = 1 order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export async function getBrandCovers(
  page: number,
  limit: number
): Promise<Files[]> {
  if (page < 1) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 50;
  }
  const offset = (page - 1) * limit;

  const db = getDb();
  const res = await db.query(
    `select w.*, u.uuid as user_uuid, u.email as user_email, u.nickname as user_name, u.avatar_url as user_avatar from files as w left join users as u on w.user_email = u.email where w.is_brand = true and w.status = 1 order by w.created_at desc limit $1 offset $2`,
    [limit, offset]
  );
  if (res.rowCount === 0) {
    return [];
  }

  const covers = getCoversFromSqlResult(res);

  return covers;
}

export function getCoversFromSqlResult(
  res: QueryResult<QueryResultRow>
): Files[] {
  if (!res.rowCount || res.rowCount === 0) {
    return [];
  }

  const covers: Files[] = [];
  const { rows } = res;

  rows.forEach((row) => {
    const cover = formatCover(row);
    if (cover) {
      covers.push(cover);
    }
  });

  return covers;
}

export function formatCover(row: QueryResultRow): Files | undefined {
  let cover: Files = {
    id: row.id,
    img_description: row.img_description,
    img_size: row.img_size,
    img_url: row.img_url,
    created_at: row.created_at,
    user_uuid: row.user_uuid,
  };

  return cover;
}
