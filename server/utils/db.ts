import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../database/schema";

export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function useDB() {
  return drizzle(process.env.DB_PATH!, { schema });
}

export type User = typeof tables.users.$inferSelect;
export type Conflict = typeof tables.conflicts.$inferSelect;
export type Participant = typeof tables.participants.$inferSelect;
