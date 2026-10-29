import { createInsertSchema } from "drizzle-zod";
import { jsonb, pgTable, timestamp, integer, varchar, text } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export interface PublicSocialLink {
  label: string;
  url: string;
}

export const siteSettingsTable = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  companyName: varchar("company_name", { length: 160 }).notNull().default("Karibu and Beyond Ltd."),
  contactEmail: varchar("contact_email", { length: 254 }).notNull().default("info@karibuandbeyondltd.com"),
  primaryPhone: varchar("primary_phone", { length: 40 }).notNull().default("+254 729 861 607"),
  secondaryPhone: varchar("secondary_phone", { length: 40 }).notNull().default("+254 711 556 151"),
  address: varchar("address", { length: 240 }).notNull().default("Embakasi, North Airport Road, Kenya"),
  socialLinks: jsonb("social_links").$type<PublicSocialLink[]>().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettingsTable).omit({ updatedAt: true });
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettingsTable.$inferSelect;
