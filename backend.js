import Database from "better-sqlite3";
import compression from "compression";
import express from "express";
import { get, put } from "@vercel/blob";
import helmet from "helmet";
import multer from "multer";
import postgres from "postgres";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin";
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
const DB_PATH =
  process.env.DATABASE_PATH || (process.env.VERCEL ? "/tmp/data.sqlite" : path.join(__dirname, "data.sqlite"));
const UPLOADS_DIR =
  process.env.UPLOADS_DIR || (process.env.VERCEL ? "/tmp/uploads" : path.join(__dirname, "uploads"));
const IS_VERCEL = Boolean(process.env.VERCEL);
const PUBLIC_BLOB_TOKEN = process.env.PUBLIC_BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN || "";
const DATABASE_BLOB_TOKEN =
  process.env.DATABASE_BLOB_READ_WRITE_TOKEN || process.env.SQLITE_BLOB_READ_WRITE_TOKEN || "";
const SQLITE_BLOB_PATH = process.env.SQLITE_BLOB_PATH || "database/kimias-kravings.sqlite";
const LOCAL_BLOB_SYNC = ["1", "true", "yes", "on"].includes(
  String(process.env.SQLITE_BLOB_SYNC || "").trim().toLowerCase(),
);
const RUN_POSTGRES_SETUP = ["1", "true", "yes", "on"].includes(
  String(process.env.POSTGRES_AUTO_SETUP || "").trim().toLowerCase(),
);
const USE_POSTGRES_DATABASE = Boolean(DATABASE_URL);
const USE_BLOB_DATABASE = Boolean(DATABASE_BLOB_TOKEN) && (IS_VERCEL || LOCAL_BLOB_SYNC);
const HAS_DURABLE_DATABASE = USE_POSTGRES_DATABASE || !IS_VERCEL || USE_BLOB_DATABASE;

async function restoreDatabaseFromBlob() {
  if (USE_POSTGRES_DATABASE) return;

  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });

  if (!USE_BLOB_DATABASE) {
    if (IS_VERCEL) {
      console.error(
        "Production database persistence is not configured. Add DATABASE_URL or DATABASE_BLOB_READ_WRITE_TOKEN before enabling live writes.",
      );
    }
    return;
  }

  try {
    const snapshot = await get(SQLITE_BLOB_PATH, {
      access: "private",
      token: DATABASE_BLOB_TOKEN,
      useCache: false,
    });
    if (!snapshot?.stream) {
      console.log(`No SQLite Blob snapshot found at ${SQLITE_BLOB_PATH}; bootstrapping a fresh database.`);
      return;
    }

    const snapshotBuffer = Buffer.from(await new Response(snapshot.stream).arrayBuffer());
    await fs.writeFile(DB_PATH, snapshotBuffer);
    console.log(`Restored SQLite database from Vercel Blob: ${SQLITE_BLOB_PATH}`);
  } catch (error) {
    console.error("Unable to restore the SQLite database from Vercel Blob.", error);
    throw error;
  }
}

const seedPosts = [
  {
    title: "The Absolute Best Late-Night Ramen Spots in SF You Need to Try Right Now",
    category: "Food",
    location: "San Francisco",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "best-late-night-ramen-sf",
    excerpt:
      "After 40+ bowls across the city, Kimia narrows it down to the six spots that actually earn a second visit.",
    publishedAt: "May 2026",
    status: "Published",
  },
  {
    title: "7 Days in Kyoto: An Off-The-Beaten Path Itinerary",
    category: "Travel",
    location: "Japan Diaries",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "kyoto-off-the-beaten-path-itinerary",
    excerpt: "Skip the tourist traps. This is the Kyoto only locals know.",
    publishedAt: "Apr 2026",
    status: "Published",
  },
  {
    title: "Curating a Mindful & Minimal Living Space",
    category: "Lifestyle",
    location: "Design Systems",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "mindful-minimal-living-space",
    excerpt: "How to build a home that feels as good as it looks.",
    publishedAt: "Mar 2026",
    status: "Published",
  },
  {
    title: "Behind Closed Doors: SF's Underground Speakeasies",
    category: "Drinks",
    location: "Hidden Bars",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "sf-underground-speakeasies",
    excerpt: "The bars that don't have signs. Only regulars know.",
    publishedAt: "Feb 2026",
    status: "Published",
  },
  {
    title: "The Rise of High-Design Minimalist Espresso Bars",
    category: "Culture",
    location: "Morning Rituals",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "minimalist-espresso-bars",
    excerpt: "When coffee becomes architecture. A tour of SF's best third-wave cafes.",
    publishedAt: "Jan 2026",
    status: "Published",
  },
  {
    title: "Architectural Masterpieces You Can Stay In This Year",
    category: "Travel",
    location: "Boutique Stay",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "architectural-hotels-to-book",
    excerpt: "Hotels that feel more like galleries. The most stunning stays of 2026.",
    publishedAt: "Dec 2025",
    status: "Published",
  },
  {
    title: "The Mission District Taco Crawl: Every Stop Ranked",
    category: "Food",
    location: "Taqueria Trail",
    categoryColor: "sand",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "mission-district-taco-crawl",
    excerpt: "Eight taquerias, one afternoon, zero regrets. The definitive ranking.",
    publishedAt: "Nov 2025",
    status: "Published",
  },
  {
    title: "Morning Hikes That Will Completely Reset Your Week",
    category: "Lifestyle",
    location: "Outdoors",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "bay-area-morning-hikes",
    excerpt: "Five trails within an hour of SF that offer real solitude and real views.",
    publishedAt: "Oct 2025",
    status: "Published",
  },
  {
    title: "Natural Wine Bars in SF That Are Actually Worth The Hype",
    category: "Drinks",
    location: "Natural Wine",
    categoryColor: "pink",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "sf-natural-wine-bars",
    excerpt: "Cloudy, funky, alive. The natural wine scene in SF is finally growing up.",
    publishedAt: "Sep 2025",
    status: "Published",
  },
  {
    title: "A Tiny Guide to Eating Solo Without Feeling Weird",
    category: "Lifestyle",
    location: "Solo Dining",
    categoryColor: "olive",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    slug: "solo-dining-guide",
    excerpt: "Counter seats, quiet confidence, and places where dining alone feels luxurious.",
    publishedAt: "Aug 2025",
    status: "Published",
  },
];

let db = null;
let sql = null;

let databasePersistQueue = Promise.resolve();

async function persistDatabaseToBlob() {
  if (!db || !USE_BLOB_DATABASE) return;

  databasePersistQueue = databasePersistQueue.catch(() => {}).then(async () => {
    db.pragma("wal_checkpoint(TRUNCATE)");
    const databaseBuffer = await fs.readFile(DB_PATH);
    await put(SQLITE_BLOB_PATH, databaseBuffer, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: "application/vnd.sqlite3",
      token: DATABASE_BLOB_TOKEN,
    });
  });

  await databasePersistQueue;
}

function initializeSqliteDatabase() {
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT '',
      category_color TEXT NOT NULL DEFAULT 'sand',
      image TEXT NOT NULL DEFAULT '',
      supporting_images TEXT NOT NULL DEFAULT '[]',
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      published_at TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Draft',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      author TEXT NOT NULL,
      email TEXT NOT NULL,
      text TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      reply TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
    CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Unread',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      source TEXT NOT NULL DEFAULT 'blog',
      status TEXT NOT NULL DEFAULT 'Subscribed',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const postColumns = db.prepare("PRAGMA table_info(posts)").all();
  if (!postColumns.some((column) => column.name === "content")) {
    db.exec("ALTER TABLE posts ADD COLUMN content TEXT NOT NULL DEFAULT ''");
  }
  if (!postColumns.some((column) => column.name === "supporting_images")) {
    db.exec("ALTER TABLE posts ADD COLUMN supporting_images TEXT NOT NULL DEFAULT '[]'");
  }
  db.exec("UPDATE posts SET content = excerpt WHERE content = ''");

  const insertSeedPost = db.prepare(`
    INSERT OR IGNORE INTO posts (
      title, category, location, category_color, image, slug, content, excerpt, published_at, status
    ) VALUES (
      @title, @category, @location, @categoryColor, @image, @slug, @content, @excerpt, @publishedAt, @status
    )
  `);
  const seedMissingPosts = db.transaction((posts) =>
    posts.forEach((post) => insertSeedPost.run({ ...post, content: post.content || post.excerpt })),
  );
  seedMissingPosts(seedPosts);
}

function postgresSslOption() {
  const override = String(process.env.POSTGRES_SSL || "").trim().toLowerCase();
  if (["0", "false", "off", "disable", "disabled"].includes(override)) return false;
  if (override) return "require";
  return /(?:localhost|127\.0\.0\.1)/i.test(DATABASE_URL) ? false : "require";
}

async function initializePostgresDatabase() {
  sql = postgres(DATABASE_URL, {
    connect_timeout: 10,
    idle_timeout: 20,
    max: Number(process.env.POSTGRES_MAX_CONNECTIONS || 5),
    prepare: false,
    ssl: postgresSslOption(),
  });

  if (!RUN_POSTGRES_SETUP) return;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT '',
      category_color TEXT NOT NULL DEFAULT 'sand',
      image TEXT NOT NULL DEFAULT '',
      supporting_images TEXT NOT NULL DEFAULT '[]',
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      published_at TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'Draft',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      author TEXT NOT NULL,
      email TEXT NOT NULL,
      text TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      reply TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status)`;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Unread',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      source TEXT NOT NULL DEFAULT 'blog',
      status TEXT NOT NULL DEFAULT 'Subscribed',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  for (const post of seedPosts) {
    await sql`
      INSERT INTO posts (
        title, category, location, category_color, image, slug, content, excerpt, published_at, status
      ) VALUES (
        ${post.title},
        ${post.category},
        ${post.location},
        ${post.categoryColor},
        ${post.image},
        ${post.slug},
        ${post.content || post.excerpt},
        ${post.excerpt},
        ${post.publishedAt},
        ${post.status}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
  }
}

async function initializeDatabase() {
  if (USE_POSTGRES_DATABASE) {
    await initializePostgresDatabase();
    return;
  }

  await restoreDatabaseFromBlob();
  initializeSqliteDatabase();
  await persistDatabaseToBlob();
}

await initializeDatabase();

function normalizeImageList(value) {
  let images = value;

  if (typeof images === "string") {
    const trimmed = images.trim();
    if (!trimmed) images = [];
    else {
      try {
        images = JSON.parse(trimmed);
      } catch {
        images = trimmed.split(/\r?\n|,/);
      }
    }
  }

  if (!Array.isArray(images)) return [];

  return [...new Set(images.map((image) => String(image || "").trim()).filter(Boolean))];
}

function parseImageList(value) {
  return normalizeImageList(value);
}

function toApiTimestamp(value) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  return value;
}

function toPost(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    location: row.location,
    categoryColor: row.category_color,
    image: row.image,
    supportingImages: parseImageList(row.supporting_images),
    slug: row.slug,
    content: row.content || row.excerpt,
    excerpt: row.excerpt,
    date: row.published_at,
    status: row.status,
    createdAt: toApiTimestamp(row.created_at),
    updatedAt: toApiTimestamp(row.updated_at),
  };
}

function toComment(row) {
  return {
    id: row.id,
    postId: row.post_id,
    postTitle: row.post_title || "",
    postSlug: row.post_slug || "",
    author: row.author,
    email: row.email,
    text: row.text,
    pending: row.status !== "Approved",
    status: row.status,
    date: toApiTimestamp(row.created_at),
    replies: row.reply ? [{ author: "Kimia", text: row.reply }] : [],
  };
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function requireAdmin(req, res, next) {
  const token = req.get("x-admin-token") || "";
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireDurableStorage(req, res, next) {
  if (!HAS_DURABLE_DATABASE) {
    return res.status(503).json({
      error:
        "Production database storage is not configured. Add DATABASE_URL for Supabase Postgres or DATABASE_BLOB_READ_WRITE_TOKEN for SQLite Blob snapshots, then redeploy before saving live content.",
    });
  }
  next();
}

function postPayload(body) {
  const title = String(body.title || "").trim();
  const category = String(body.category || "").trim();
  const content = String(body.content || body.excerpt || "").trim();
  const publishedAtInput = String(body.date || body.publishedAt || "").trim();
  const createdAtInput = String(body.createdAt || body.created_at || "").trim();
  if (!title || !category) {
    const error = new Error("title and category are required");
    error.status = 400;
    throw error;
  }

  return {
    title,
    category,
    location: String(body.location || category).trim(),
    categoryColor: String(body.categoryColor || "sand").trim(),
    image: String(body.image || seedPosts[0].image).trim(),
    supportingImages: normalizeImageList(
      body.supportingImages ?? body.supporting_images ?? body.galleryImages ?? body.gallery_images,
    ),
    slug: String(body.slug || slugify(title)).trim(),
    content,
    excerpt: String(body.excerpt || content).trim(),
    publishedAt:
      !publishedAtInput || publishedAtInput.toLowerCase() === "just now"
        ? createdAtInput || new Date().toISOString()
        : publishedAtInput,
    status: String(body.status || "Draft").trim(),
  };
}

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

async function persistAfterMutation() {
  if (!USE_POSTGRES_DATABASE) {
    await persistDatabaseToBlob();
  }
}

async function listPosts(filters = {}) {
  const status = String(filters.status || "").trim();
  const category = String(filters.category || "").trim().toLowerCase();
  const search = String(filters.search || "").trim().toLowerCase();
  const summary = Boolean(filters.summary);
  const columns = summary
    ? "id, title, category, location, category_color, image, slug, excerpt, published_at, status, created_at, updated_at"
    : "*";

  if (USE_POSTGRES_DATABASE) {
    const params = [];
    const where = [];

    if (status) {
      params.push(status);
      where.push(`LOWER(status) = LOWER($${params.length})`);
    }
    if (category && category !== "all") {
      params.push(category);
      where.push(`LOWER(category) = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      const index = params.length;
      where.push(
        `(LOWER(title) LIKE $${index} OR LOWER(category) LIKE $${index} OR LOWER(location) LIKE $${index} OR LOWER(excerpt) LIKE $${index})`,
      );
    }

    const query = `
      SELECT ${columns}
      FROM posts
      ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
      ORDER BY id DESC
    `;
    return (await sql.unsafe(query, params)).map(toPost);
  }

  const params = {};
  const where = [];

  if (status) {
    where.push("LOWER(status) = LOWER(@status)");
    params.status = status;
  }
  if (category && category !== "all") {
    where.push("LOWER(category) = @category");
    params.category = category;
  }
  if (search) {
    where.push(
      "(LOWER(title) LIKE @search OR LOWER(category) LIKE @search OR LOWER(location) LIKE @search OR LOWER(excerpt) LIKE @search)",
    );
    params.search = `%${search}%`;
  }

  const query = `
    SELECT ${columns}
    FROM posts
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY id DESC
  `;
  return db.prepare(query).all(params).map(toPost);
}

async function getPostById(id) {
  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`SELECT * FROM posts WHERE id = ${id}`;
    return rows[0] || null;
  }

  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) || null;
}

async function getPublishedPostBySlug(slug) {
  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`SELECT * FROM posts WHERE slug = ${slug} AND status = 'Published'`;
    return rows[0] || null;
  }

  return db.prepare("SELECT * FROM posts WHERE slug = ? AND status = 'Published'").get(slug) || null;
}

async function listPublishedPosts() {
  if (USE_POSTGRES_DATABASE) {
    return (await sql`SELECT * FROM posts WHERE status = 'Published' ORDER BY id DESC`).map(toPost);
  }

  return db.prepare("SELECT * FROM posts WHERE status = 'Published' ORDER BY id DESC").all().map(toPost);
}

async function listApprovedCommentsForPost(postId) {
  const query = `
    SELECT comments.*, posts.title AS post_title, posts.slug AS post_slug
    FROM comments
    JOIN posts ON posts.id = comments.post_id
    WHERE comments.post_id = $1 AND comments.status = 'Approved'
    ORDER BY comments.id ASC
  `;

  if (USE_POSTGRES_DATABASE) {
    return (await sql.unsafe(query, [postId])).map(toComment);
  }

  return db
    .prepare(query.replaceAll("$1", "?"))
    .all(postId)
    .map(toComment);
}

async function getAdminCommentById(id) {
  const query = `
    SELECT comments.*, posts.title AS post_title, posts.slug AS post_slug
    FROM comments
    JOIN posts ON posts.id = comments.post_id
    WHERE comments.id = $1
  `;

  if (USE_POSTGRES_DATABASE) {
    const rows = await sql.unsafe(query, [id]);
    return rows[0] || null;
  }

  return db.prepare(query.replaceAll("$1", "?")).get(id) || null;
}

async function createPost(payload) {
  const supportingImagesJson = JSON.stringify(payload.supportingImages);

  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`
      INSERT INTO posts (
        title, category, location, category_color, image, supporting_images, slug, content, excerpt, published_at, status
      ) VALUES (
        ${payload.title},
        ${payload.category},
        ${payload.location},
        ${payload.categoryColor},
        ${payload.image},
        ${supportingImagesJson},
        ${payload.slug},
        ${payload.content},
        ${payload.excerpt},
        ${payload.publishedAt},
        ${payload.status}
      )
      RETURNING *
    `;
    return toPost(rows[0]);
  }

  const result = db
    .prepare(
      `INSERT INTO posts (
        title, category, location, category_color, image, supporting_images, slug, content, excerpt, published_at, status
      ) VALUES (
        @title, @category, @location, @categoryColor, @image, @supportingImagesJson, @slug, @content, @excerpt, @publishedAt, @status
      )`,
    )
    .run({ ...payload, supportingImagesJson });
  await persistAfterMutation();
  return toPost(db.prepare("SELECT * FROM posts WHERE id = ?").get(result.lastInsertRowid));
}

async function updatePost(id, payload) {
  const supportingImagesJson = JSON.stringify(payload.supportingImages);

  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`
      UPDATE posts
      SET title = ${payload.title},
          category = ${payload.category},
          location = ${payload.location},
          category_color = ${payload.categoryColor},
          image = ${payload.image},
          supporting_images = ${supportingImagesJson},
          slug = ${payload.slug},
          content = ${payload.content},
          excerpt = ${payload.excerpt},
          published_at = ${payload.publishedAt},
          status = ${payload.status},
          updated_at = now()
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0] ? toPost(rows[0]) : null;
  }

  db.prepare(
    `UPDATE posts
     SET title = @title,
         category = @category,
         location = @location,
         category_color = @categoryColor,
         image = @image,
         supporting_images = @supportingImagesJson,
         slug = @slug,
         content = @content,
         excerpt = @excerpt,
         published_at = @publishedAt,
         status = @status,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = @id`,
  ).run({ ...payload, supportingImagesJson, id });
  await persistAfterMutation();
  return toPost(db.prepare("SELECT * FROM posts WHERE id = ?").get(id));
}

async function deletePostById(id) {
  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`DELETE FROM posts WHERE id = ${id} RETURNING id`;
    return rows.length > 0;
  }

  db.prepare("DELETE FROM comments WHERE post_id = ?").run(id);
  const result = db.prepare("DELETE FROM posts WHERE id = ?").run(id);
  if (result.changes > 0) await persistAfterMutation();
  return result.changes > 0;
}

async function createComment(postId, author, email, text) {
  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`
      INSERT INTO comments (post_id, author, email, text)
      VALUES (${postId}, ${author}, ${email}, ${text})
      RETURNING id
    `;
    return rows[0].id;
  }

  const result = db
    .prepare("INSERT INTO comments (post_id, author, email, text) VALUES (?, ?, ?, ?)")
    .run(postId, author, email, text);
  await persistAfterMutation();
  return result.lastInsertRowid;
}

async function listAdminComments() {
  const query = `
    SELECT comments.*, posts.title AS post_title, posts.slug AS post_slug
    FROM comments
    JOIN posts ON posts.id = comments.post_id
    ORDER BY comments.id DESC
  `;

  if (USE_POSTGRES_DATABASE) {
    return (await sql.unsafe(query)).map(toComment);
  }

  return db.prepare(query).all().map(toComment);
}

async function approveCommentById(id) {
  if (USE_POSTGRES_DATABASE) {
    const updated = await sql`
      UPDATE comments
      SET status = 'Approved', updated_at = now()
      WHERE id = ${id}
      RETURNING id
    `;
    return updated.length ? toComment(await getAdminCommentById(id)) : null;
  }

  const result = db
    .prepare("UPDATE comments SET status = 'Approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(id);
  if (result.changes === 0) return null;
  await persistAfterMutation();
  return toComment(await getAdminCommentById(id));
}

async function replyToCommentById(id, reply) {
  if (USE_POSTGRES_DATABASE) {
    const updated = await sql`
      UPDATE comments
      SET reply = ${reply}, status = 'Approved', updated_at = now()
      WHERE id = ${id}
      RETURNING id
    `;
    return updated.length ? toComment(await getAdminCommentById(id)) : null;
  }

  const result = db
    .prepare(
      `UPDATE comments
       SET reply = ?, status = 'Approved', updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
    )
    .run(reply, id);
  if (result.changes === 0) return null;
  await persistAfterMutation();
  return toComment(await getAdminCommentById(id));
}

async function deleteCommentById(id) {
  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`DELETE FROM comments WHERE id = ${id} RETURNING id`;
    return rows.length > 0;
  }

  const result = db.prepare("DELETE FROM comments WHERE id = ?").run(id);
  if (result.changes > 0) await persistAfterMutation();
  return result.changes > 0;
}

async function createContactMessage(name, email, message) {
  if (USE_POSTGRES_DATABASE) {
    const rows = await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id
    `;
    return rows[0].id;
  }

  const result = db.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)").run(name, email, message);
  await persistAfterMutation();
  return result.lastInsertRowid;
}

async function subscribeNewsletter(email, source) {
  if (USE_POSTGRES_DATABASE) {
    await sql`
      INSERT INTO newsletter_subscribers (email, source, status)
      VALUES (${email}, ${source}, 'Subscribed')
      ON CONFLICT(email) DO UPDATE SET
        source = excluded.source,
        status = 'Subscribed',
        updated_at = now()
    `;
    return;
  }

  db.prepare(
    `INSERT INTO newsletter_subscribers (email, source, status)
     VALUES (@email, @source, 'Subscribed')
     ON CONFLICT(email) DO UPDATE SET
       source = excluded.source,
       status = 'Subscribed',
       updated_at = CURRENT_TIMESTAMP`,
  ).run({ email, source });
  await persistAfterMutation();
}

async function listContactMessages() {
  const rows = USE_POSTGRES_DATABASE
    ? await sql`SELECT * FROM contacts ORDER BY id DESC`
    : db.prepare("SELECT * FROM contacts ORDER BY id DESC").all();

  return rows.map((row) => ({
    id: row.id,
    sender: row.name,
    email: row.email,
    subject: "Contact Form Submission",
    date: toApiTimestamp(row.created_at),
    text: row.message,
    unread: row.status === "Unread",
  }));
}

async function listNewsletterSubscribers() {
  const rows = USE_POSTGRES_DATABASE
    ? await sql`SELECT * FROM newsletter_subscribers ORDER BY id DESC`
    : db.prepare("SELECT * FROM newsletter_subscribers ORDER BY id DESC").all();

  return rows.map((row) => ({
    id: row.id,
    email: row.email,
    source: row.source,
    status: row.status,
    date: toApiTimestamp(row.created_at),
    updatedAt: toApiTimestamp(row.updated_at),
  }));
}

const app = express();
const STATIC_ASSET_PATTERN = /\.(?:css|js|png|jpe?g|jpeg|gif|webp|svg|ico|woff2?)$/i;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed"));
      return;
    }
    cb(null, true);
  },
});

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(
  "/uploads",
  express.static(UPLOADS_DIR, {
    immutable: true,
    maxAge: "30d",
  }),
);

const cleanRouteRedirects = {
  "/index.html": "/",
  "/home.html": "/",
  "/admin.html": "/admin",
  "/blog.html": "/blog",
  "/about.html": "/about",
  "/consulting.html": "/consulting",
  "/partnerships.html": "/partnerships",
  "/contact.html": "/contact",
};

Object.entries(cleanRouteRedirects).forEach(([route, destination]) => {
  app.get(route, (req, res) => {
    res.redirect(301, destination);
  });
});

const pageRoutes = {
  "/": "index.html",
  "/home": "index.html",
  "/admin": "admin.html",
  "/blog": "blog.html",
  "/about": "about.html",
  "/consulting": "consulting.html",
  "/partnerships": "partnerships.html",
  "/contact": "contact.html",
};

Object.entries(pageRoutes).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

app.get("/blog/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "blog-post.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database: USE_POSTGRES_DATABASE ? "postgres" : "sqlite",
    storage: {
      durable: HAS_DURABLE_DATABASE,
      mode: USE_POSTGRES_DATABASE
        ? "supabase-postgres"
        : USE_BLOB_DATABASE
          ? "vercel-blob-snapshot"
          : IS_VERCEL
            ? "missing"
            : "local-file",
      blobPath: !USE_POSTGRES_DATABASE && USE_BLOB_DATABASE ? SQLITE_BLOB_PATH : null,
    },
    uploads: {
      durable: !IS_VERCEL || Boolean(PUBLIC_BLOB_TOKEN),
      mode: PUBLIC_BLOB_TOKEN ? "vercel-blob-public" : IS_VERCEL ? "missing" : "local-file",
    },
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/admin/login", (req, res) => {
  const token = String(req.body.token || "").trim();
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Invalid admin token" });
  }
  res.json({ ok: true });
});

app.get("/api/posts", async (req, res, next) => {
  const status = String(req.query.status || "").trim();
  const category = String(req.query.category || "").trim().toLowerCase();
  const search = String(req.query.search || "").trim().toLowerCase();
  const summary = ["1", "true", "yes"].includes(
    String(req.query.summary || "").trim().toLowerCase(),
  );

  try {
    if (summary) {
      res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    } else {
      res.setHeader("Cache-Control", "no-store");
    }

    const posts = (await listPosts({ status, category, search, summary })).map((post) => {
      if (!summary) return post;
      const summaryPost = { ...post };
      delete summaryPost.content;
      delete summaryPost.supportingImages;
      return summaryPost;
    });
    res.json({ posts });
  } catch (error) {
    next(error);
  }
});

app.get("/api/posts/:slug", async (req, res, next) => {
  const slug = String(req.params.slug || "").trim();
  try {
    const row = await getPublishedPostBySlug(slug);
    if (!row) return res.status(404).json({ error: "Post not found" });

    const post = toPost(row);
    const publishedPosts = await listPublishedPosts();
    const currentIndex = publishedPosts.findIndex((item) => item.slug === slug);
    const previous = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;
    const nextPost =
      currentIndex > -1 && currentIndex < publishedPosts.length - 1
        ? publishedPosts[currentIndex + 1]
        : null;
    const comments = await listApprovedCommentsForPost(row.id);

    res.json({
      post,
      previous,
      next: nextPost,
      comments,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/posts/:slug/comments", requireDurableStorage, async (req, res, next) => {
  try {
    const slug = String(req.params.slug || "").trim();
    const post = await getPublishedPostBySlug(slug);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const author = String(req.body.author || req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const text = String(req.body.text || req.body.comment || "").trim();

    if (!author || !email || !text) {
      return res.status(400).json({ error: "name, email, and comment are required" });
    }

    const id = await createComment(post.id, author, email, text);

    res.status(201).json({
      ok: true,
      id,
      message: "Comment submitted for moderation.",
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/posts", requireAdmin, requireDurableStorage, async (req, res, next) => {
  try {
    const payload = postPayload(req.body);
    const post = await createPost(payload);
    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
});

app.put("/api/posts/:id", requireAdmin, requireDurableStorage, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const existing = await getPostById(id);
    if (!existing) return res.status(404).json({ error: "Post not found" });

    const payload = postPayload({
      ...toPost(existing),
      ...req.body,
      slug: req.body.slug || existing.slug,
    });
    const post = await updatePost(id, payload);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json({ post });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/posts/:id", requireAdmin, requireDurableStorage, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deletePostById(id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/comments", requireAdmin, async (req, res, next) => {
  try {
    const comments = await listAdminComments();
    res.json({ comments });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/comments/:id/approve", requireAdmin, requireDurableStorage, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const comment = await approveCommentById(id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json({ comment });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/comments/:id/reply", requireAdmin, requireDurableStorage, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const reply = String(req.body.text || req.body.reply || "").trim();

    if (!reply) return res.status(400).json({ error: "reply text is required" });

    const comment = await replyToCommentById(id, reply);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json({ comment });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/comments/:id", requireAdmin, requireDurableStorage, async (req, res, next) => {
  try {
    const deleted = await deleteCommentById(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Comment not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/uploads", requireAdmin, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const safeName = req.file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const filename = `${Date.now()}-${safeName || "blog-image.jpg"}`;

    if (PUBLIC_BLOB_TOKEN) {
      const blob = await put(`blog/${filename}`, req.file.buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: req.file.mimetype,
        token: PUBLIC_BLOB_TOKEN,
      });
      return res.status(201).json({ url: blob.url, storage: "vercel-blob" });
    }

    if (process.env.VERCEL) {
      return res.status(503).json({
        error:
          "Image uploads need Vercel Blob. Add BLOB_READ_WRITE_TOKEN in Vercel Storage, then redeploy.",
      });
    }

    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const localPath = path.join(UPLOADS_DIR, filename);
    await fs.writeFile(localPath, req.file.buffer);
    res.status(201).json({ url: `/uploads/${filename}`, storage: "local" });
  } catch (error) {
    next(error);
  }
});

app.post("/api/contacts", requireDurableStorage, async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }

    const id = await createContactMessage(name, email, message);
    res.status(201).json({ id, ok: true });
  } catch (error) {
    next(error);
  }
});

app.post("/api/newsletter", requireDurableStorage, async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const source = String(req.body.source || "blog").trim() || "blog";

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    await subscribeNewsletter(email, source);

    res.status(201).json({
      ok: true,
      message: "You are on the list.",
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/messages", requireAdmin, async (req, res, next) => {
  try {
    const messages = await listContactMessages();
    res.json({ messages });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/newsletter", requireAdmin, async (req, res, next) => {
  try {
    const subscribers = await listNewsletterSubscribers();
    res.json({ subscribers });
  } catch (error) {
    next(error);
  }
});

app.use(
  express.static(__dirname, {
    maxAge: "1h",
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
        return;
      }

      if (STATIC_ASSET_PATTERN.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=3600");
      }
    },
  }),
);

app.use((error, req, res, next) => {
  if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res.status(409).json({ error: "A post with this slug already exists" });
  }
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.message });
  }
  res.status(error.status || 500).json({ error: error.message || "Server error" });
});

if (path.resolve(process.argv[1] || "") === __filename) {
  app.listen(PORT, () => {
    console.log(`Kimia's Kravings running at http://localhost:${PORT}`);
  });
}

export { app };
export default app;
