import Database from "better-sqlite3";
import express from "express";
import { put } from "@vercel/blob";
import helmet from "helmet";
import multer from "multer";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin";
const DB_PATH =
  process.env.DATABASE_PATH || (process.env.VERCEL ? "/tmp/data.sqlite" : path.join(__dirname, "data.sqlite"));
const UPLOADS_DIR =
  process.env.UPLOADS_DIR || (process.env.VERCEL ? "/tmp/uploads" : path.join(__dirname, "uploads"));

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
];

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT '',
    category_color TEXT NOT NULL DEFAULT 'sand',
    image TEXT NOT NULL DEFAULT '',
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL DEFAULT '',
    published_at TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'Draft',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Unread',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertSeedPost = db.prepare(`
  INSERT OR IGNORE INTO posts (
    title, category, location, category_color, image, slug, excerpt, published_at, status
  ) VALUES (
    @title, @category, @location, @categoryColor, @image, @slug, @excerpt, @publishedAt, @status
  )
`);
const seedMissingPosts = db.transaction((posts) =>
  posts.forEach((post) => insertSeedPost.run(post)),
);
seedMissingPosts(seedPosts);

function toPost(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    location: row.location,
    categoryColor: row.category_color,
    image: row.image,
    slug: row.slug,
    excerpt: row.excerpt,
    date: row.published_at,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
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

function postPayload(body) {
  const title = String(body.title || "").trim();
  const category = String(body.category || "").trim();
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
    slug: String(body.slug || slugify(title)).trim(),
    excerpt: String(body.excerpt || "").trim(),
    publishedAt: String(body.date || body.publishedAt || "Just Now").trim(),
    status: String(body.status || "Draft").trim(),
  };
}

const app = express();
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
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

const pageRoutes = {
  "/": "index.html",
  "/home": "index.html",
  "/admin": "admin.html",
  "/blog": "blog.html",
  "/about": "about.html",
  "/consulting": "consulting.html",
  "/contact": "contact.html",
};

Object.entries(pageRoutes).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, database: "sqlite", timestamp: new Date().toISOString() });
});

app.post("/api/admin/login", (req, res) => {
  const token = String(req.body.token || "").trim();
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Invalid admin token" });
  }
  res.json({ ok: true });
});

app.get("/api/posts", (req, res) => {
  const status = String(req.query.status || "").trim();
  const category = String(req.query.category || "").trim().toLowerCase();
  const search = String(req.query.search || "").trim().toLowerCase();
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

  const sql = `
    SELECT * FROM posts
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY id DESC
  `;
  res.json({ posts: db.prepare(sql).all(params).map(toPost) });
});

app.post("/api/posts", requireAdmin, (req, res, next) => {
  try {
    const payload = postPayload(req.body);
    const result = db
      .prepare(
        `INSERT INTO posts (
          title, category, location, category_color, image, slug, excerpt, published_at, status
        ) VALUES (
          @title, @category, @location, @categoryColor, @image, @slug, @excerpt, @publishedAt, @status
        )`,
      )
      .run(payload);
    const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ post: toPost(row) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/posts/:id", requireAdmin, (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const existing = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    if (!existing) return res.status(404).json({ error: "Post not found" });

    const payload = postPayload({
      ...toPost(existing),
      ...req.body,
      slug: req.body.slug || existing.slug,
    });
    db.prepare(
      `UPDATE posts
       SET title = @title,
           category = @category,
           location = @location,
           category_color = @categoryColor,
           image = @image,
           slug = @slug,
           excerpt = @excerpt,
           published_at = @publishedAt,
           status = @status,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = @id`,
    ).run({ ...payload, id });
    const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
    res.json({ post: toPost(row) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/posts/:id", requireAdmin, (req, res) => {
  const result = db.prepare("DELETE FROM posts WHERE id = ?").run(Number(req.params.id));
  if (result.changes === 0) return res.status(404).json({ error: "Post not found" });
  res.status(204).end();
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

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`blog/${filename}`, req.file.buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: req.file.mimetype,
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

app.post("/api/contacts", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const message = String(req.body.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }

  const result = db
    .prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)")
    .run(name, email, message);
  res.status(201).json({ id: result.lastInsertRowid, ok: true });
});

app.get("/api/admin/messages", requireAdmin, (req, res) => {
  const messages = db
    .prepare("SELECT * FROM contacts ORDER BY id DESC")
    .all()
    .map((row) => ({
      id: row.id,
      sender: row.name,
      email: row.email,
      subject: "Contact Form Submission",
      date: row.created_at,
      text: row.message,
      unread: row.status === "Unread",
    }));
  res.json({ messages });
});

app.use(express.static(__dirname));

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
