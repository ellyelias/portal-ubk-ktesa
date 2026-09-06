CREATE TABLE IF NOT EXISTS counselor_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL DEFAULT 'coretan',
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  image_key TEXT,
  image_name TEXT,
  image_type TEXT,
  author_email TEXT NOT NULL,
  author_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT
);
CREATE INDEX IF NOT EXISTS counselor_posts_status_idx ON counselor_posts(status);
CREATE INDEX IF NOT EXISTS counselor_posts_author_email_idx ON counselor_posts(author_email);
CREATE INDEX IF NOT EXISTS counselor_posts_published_at_idx ON counselor_posts(published_at);
