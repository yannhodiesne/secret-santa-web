import { drizzle } from 'drizzle-orm/libsql';
import type { H3Event } from 'h3';
import * as schema from '../database/schema';

export { sql, eq, and, or, inArray } from 'drizzle-orm';
export { alias } from 'drizzle-orm/sqlite-core';

export const tables = schema;

export function useDB(event: H3Event) {
  const { dbPath } = useRuntimeConfig(event);
  return drizzle(dbPath, { schema });
}

export type User = typeof tables.users.$inferSelect;
export type Conflict = typeof tables.conflicts.$inferSelect;
export type Participant = typeof tables.participants.$inferSelect;
