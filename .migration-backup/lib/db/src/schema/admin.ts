import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp, varchar, jsonb, serial, index } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const adminProfilesTable = pgTable("admin_profiles", {
  clerkUserId: varchar("clerk_user_id", { length: 255 }).primaryKey(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  role: varchar("role", { length: 32 }).notNull().default("admin"),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const auditLogsTable = pgTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    actorUserId: varchar("actor_user_id", { length: 255 }).notNull(),
    action: varchar("action", { length: 100 }).notNull(),
    entity: varchar("entity", { length: 100 }).notNull(),
    entityId: varchar("entity_id", { length: 255 }),
    details: jsonb("details").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("audit_logs_actor_idx").on(table.actorUserId), index("audit_logs_created_idx").on(table.createdAt)],
);

export const insertAdminProfileSchema = createInsertSchema(adminProfilesTable).omit({
  createdAt: true,
  updatedAt: true,
});
export type InsertAdminProfile = z.infer<typeof insertAdminProfileSchema>;
export type AdminProfile = typeof adminProfilesTable.$inferSelect;
export type AuditLog = typeof auditLogsTable.$inferSelect;
