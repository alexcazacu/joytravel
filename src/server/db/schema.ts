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
