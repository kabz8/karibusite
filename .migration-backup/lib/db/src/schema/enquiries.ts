import { createInsertSchema } from "drizzle-zod";
import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const enquiriesTable = pgTable(
  "enquiries",
  {
    id: serial("id").primaryKey(),
    reference: varchar("reference", { length: 24 }).notNull().unique(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    service: varchar("service", { length: 40 }).notNull(),
    packageSlug: varchar("package_slug", { length: 180 }),
    preferredDates: varchar("preferred_dates", { length: 120 }),
    participants: integer("participants"),
    departureLocation: varchar("departure_location", { length: 160 }),
    destination: varchar("destination", { length: 160 }),
    eventType: varchar("event_type", { length: 120 }),
    budgetRange: varchar("budget_range", { length: 120 }),
    message: text("message").notNull(),
    status: varchar("status", { length: 32 }).notNull().default("new"),
    contactConsentAt: timestamp("contact_consent_at", { withTimezone: true }).notNull(),
    marketingConsentAt: timestamp("marketing_consent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
    anonymizedAt: timestamp("anonymized_at", { withTimezone: true }),
  },
  (table) => [
    index("enquiries_status_created_idx").on(table.status, table.createdAt),
    index("enquiries_service_idx").on(table.service),
    index("enquiries_email_idx").on(table.email),
  ],
);

export const enquiryStatusHistoryTable = pgTable(
  "enquiry_status_history",
  {
    id: serial("id").primaryKey(),
    enquiryId: integer("enquiry_id").notNull().references(() => enquiriesTable.id, { onDelete: "cascade" }),
    fromStatus: varchar("from_status", { length: 32 }),
    toStatus: varchar("to_status", { length: 32 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("enquiry_status_history_enquiry_idx").on(table.enquiryId)],
);

export const enquiryNotesTable = pgTable(
  "enquiry_notes",
  {
    id: serial("id").primaryKey(),
    enquiryId: integer("enquiry_id").notNull().references(() => enquiriesTable.id, { onDelete: "cascade" }),
    note: text("note").notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("enquiry_notes_enquiry_idx").on(table.enquiryId)],
);

export const insertEnquirySchema = createInsertSchema(enquiriesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  anonymizedAt: true,
});
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiriesTable.$inferSelect;
export type EnquiryStatusHistory = typeof enquiryStatusHistoryTable.$inferSelect;
export type EnquiryNote = typeof enquiryNotesTable.$inferSelect;
