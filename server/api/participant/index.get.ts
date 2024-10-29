export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const db = useDB();

  const participant = await db.select({ id: tables.participants.userId }).from(tables.participants)
    .innerJoin(tables.users, eq(tables.users.id, tables.participants.userId))
    .where(eq(tables.users.discordId, user.id))
    .get();

  return {
    registered: !!participant
  };
});
