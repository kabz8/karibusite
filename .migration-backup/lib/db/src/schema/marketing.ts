import { createInsertSchema } from "drizzle-zod";
import { index, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const newsletterSubscribersTable = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 254 }).notNull().unique(),
    status: varchar("status", { length: 32 }).notNull().default("pending_configuration"),
    unsubscribeTokenHash: varchar("unsubscribe_token_hash", { length: 64 }).notNull().unique(),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [index("newsletter_status_idx").on(table.status)],
);

export const consentRecordsTable = pgTable("consent_records", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 254 }).notNull(),
  consentType: varchar("consent_type", { length: 40 }).notNull(),
  granted: varchar("granted", { length: 8 }).notNull(),
  source: varchar("source", { length: 80 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribersTable.$inferSelect;
