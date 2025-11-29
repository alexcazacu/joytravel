import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const trips = sqliteTable('trips', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  // Optional short summary for listings
  summary: text('summary'),
  // SEO fields
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  metaOgImage: text('meta_og_image'),
  // Full trip JSON, stringified
  data: text('data', { mode: 'json' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const blogPosts = sqliteTable('blog_posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(), // Markdown content
  coverImage: text('cover_image'),
  author: text('author'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  // SEO fields
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  metaOgImage: text('meta_og_image'),
  // Tags/categories as JSON array
  tags: text('tags', { mode: 'json' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
});
