import { createInsertSchema } from "drizzle-zod";
import { index, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const articlesTable = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    excerpt: varchar("excerpt", { length: 500 }).notNull().default(""),
    body: text("body").notNull().default(""),
    category: varchar("category", { length: 120 }),
    coverImageUrl: text("cover_image_url"),
    status: varchar("status", { length: 16 }).notNull().default("draft"),
    seoTitle: varchar("seo_title", { length: 180 }),
    seoDescription: varchar("seo_description", { length: 320 }),
    createdBy: varchar("created_by", { length: 255 }),
    updatedBy: varchar("updated_by", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => [index("articles_status_published_idx").on(table.status, table.publishedAt)],
);

export const testimonialsTable = pgTable(
  "testimonials",
  {
    id: serial("id").primaryKey(),
    quote: text("quote").notNull(),
    attribution: varchar("attribution", { length: 180 }),
    service: varchar("service", { length: 80 }),
    status: varchar("status", { length: 16 }).notNull().default("draft"),
    permissionConfirmed: timestamp("permission_confirmed", { withTimezone: true }),
    createdBy: varchar("created_by", { length: 255 }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [index("testimonials_status_idx").on(table.status)],
);

export const insertArticleSchema = createInsertSchema(articlesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});
export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({
  id: true,
  updatedAt: true,
});
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Article = typeof articlesTable.$inferSelect;
export type Testimonial = typeof testimonialsTable.$inferSelect;
