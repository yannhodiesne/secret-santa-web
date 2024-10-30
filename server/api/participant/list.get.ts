export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const db = useDB(event);

  const year = new Date().getFullYear();

  const result = await db.select({
      id: tables.users.discordId,
      username: tables.users.username,
      avatar: tables.users.avatar
    })
    .from(tables.participants)
    .innerJoin(tables.users, eq(tables.users.id, tables.participants.userId))
    .where(eq(tables.participants.year, year));

  return result;
});
