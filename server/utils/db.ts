import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import type { H3Event } from 'h3';
import * as schema from '../database/schema';

export { sql, eq, ne, lt, lte, gt, gte, and, or, inArray, desc } from 'drizzle-orm';
export { alias } from 'drizzle-orm/sqlite-core';

export const tables = schema;

export function useDB(event: H3Event) {
  const { dbPath } = useRuntimeConfig(event);
  return drizzle(dbPath, { schema });
}

export function migrateDB() {
  console.log('Migrating database...');
  const migrationsFolder = import.meta.dev ? './server/database/migrations' : './.output/server/database/migrations';
  const { dbPath } = useRuntimeConfig();
  migrate(drizzle(dbPath, { schema }), { migrationsFolder });
  console.log('Database migrated');
}

export type User = typeof tables.users.$inferSelect;
export type Conflict = typeof tables.conflicts.$inferSelect;
export type Participant = typeof tables.participants.$inferSelect;
