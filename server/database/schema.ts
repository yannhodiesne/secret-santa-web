import { sqliteTable, primaryKey, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer().primaryKey(),
  discordId: text().notNull().unique(),
  username: text().notNull(),
  nick: text(),
  avatar: text()
});

export const conflicts = sqliteTable('conflicts', {
  firstId: integer().notNull().references(() => users.id),
  secondId: integer().notNull().references(() => users.id)
}, table => [
  primaryKey({ columns: [table.firstId, table.secondId] })
]);

export const participants = sqliteTable('participants', {
  userId: integer().notNull().references(() => users.id),
  year: integer().notNull(),
  recipientId: integer().references(() => users.id)
}, table => [
  primaryKey({ columns: [table.userId, table.year] })
]);
