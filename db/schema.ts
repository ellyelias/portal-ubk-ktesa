import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const conversations = sqliteTable("conversations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  referenceCode: text("reference_code").notNull().unique(),
  pinHash: text("pin_hash").notNull(),
  topic: text("topic").notNull(),
  displayName: text("display_name"),
  contactNumber: text("contact_number"),
  assignedTo: text("assigned_to"),
  status: text("status").notNull().default("baharu"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id),
  sender: text("sender").notNull(),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const siteStats = sqliteTable("site_stats", {
  key: text("key").primaryKey(),
  count: integer("count").notNull().default(0),
});

export const counselorPosts = sqliteTable("counselor_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull().default("coretan"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  imageKey: text("image_key"),
  imageName: text("image_name"),
  imageType: text("image_type"),
  authorEmail: text("author_email").notNull(),
  authorName: text("author_name").notNull(),
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  publishedAt: text("published_at"),
});
