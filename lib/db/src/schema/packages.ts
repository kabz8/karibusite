import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const packageCategoriesTable = pgTable("package_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const packagesTable = pgTable(
  "packages",
  {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").notNull().references(() => packageCategoriesTable.id),
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    name: varchar("name", { length: 160 }).notNull(),
    shortDescription: varchar("short_description", { length: 320 }).notNull().default(""),
    description: text("description").notNull().default(""),
    destination: varchar("destination", { length: 160 }),
    duration: varchar("duration", { length: 100 }),
    pricingModel: varchar("pricing_model", { length: 32 }).notNull().default("custom_quote"),
    priceAmount: numeric("price_amount", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }),
    pricingUnit: varchar("pricing_unit", { length: 80 }),
    imageUrl: text("image_url"),
    requirements: text("requirements"),
    importantNotes: text("important_notes"),
    availability: text("availability"),
    cancellationTerms: text("cancellation_terms"),
    featured: boolean("featured").notNull().default(false),
    status: varchar("status", { length: 16 }).notNull().default("draft"),
    seoTitle: varchar("seo_title", { length: 180 }),
    seoDescription: varchar("seo_description", { length: 320 }),
    createdBy: varchar("created_by", { length: 255 }),
    updatedBy: varchar("updated_by", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => [
    index("packages_status_idx").on(table.status),
    index("packages_category_idx").on(table.categoryId),
    index("packages_featured_idx").on(table.featured),
  ],
);

export const packageImagesTable = pgTable(
  "package_images",
  {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull().references(() => packagesTable.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: varchar("alt", { length: 240 }).notNull().default(""),
    position: integer("position").notNull().default(0),
  },
  (table) => [index("package_images_package_idx").on(table.packageId)],
);

export const packageItineraryTable = pgTable(
  "package_itinerary",
  {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull().references(() => packagesTable.id, { onDelete: "cascade" }),
    day: integer("day").notNull(),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description").notNull(),
    position: integer("position").notNull().default(0),
  },
  (table) => [
    index("package_itinerary_package_idx").on(table.packageId),
    uniqueIndex("package_itinerary_day_position_idx").on(table.packageId, table.day, table.position),
  ],
);

export const packageDetailsTable = pgTable(
  "package_details",
  {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull().references(() => packagesTable.id, { onDelete: "cascade" }),
    kind: varchar("kind", { length: 24 }).notNull(),
    label: text("label").notNull(),
    position: integer("position").notNull().default(0),
  },
  (table) => [index("package_details_package_idx").on(table.packageId, table.kind)],
);

export const packageFaqsTable = pgTable(
  "package_faqs",
  {
    id: serial("id").primaryKey(),
    packageId: integer("package_id").notNull().references(() => packagesTable.id, { onDelete: "cascade" }),
    question: varchar("question", { length: 500 }).notNull(),
    answer: text("answer").notNull(),
    position: integer("position").notNull().default(0),
  },
  (table) => [index("package_faqs_package_idx").on(table.packageId)],
);

export const insertPackageSchema = createInsertSchema(packagesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packagesTable.$inferSelect;
export type PackageCategory = typeof packageCategoriesTable.$inferSelect;
export type PackageImage = typeof packageImagesTable.$inferSelect;
export type PackageItineraryItem = typeof packageItineraryTable.$inferSelect;
export type PackageDetail = typeof packageDetailsTable.$inferSelect;
export type PackageFaq = typeof packageFaqsTable.$inferSelect;
